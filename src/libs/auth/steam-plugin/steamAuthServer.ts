import 'server-only';
import type { BetterAuthPlugin } from 'better-auth';
import { createAuthEndpoint } from 'better-auth/api';
import { setSessionCookie } from 'better-auth/cookies';
import { extractSteamId } from './extractSteamId';
import type { Prisma, Steam, Logger } from './types';
import { verifySteamAuth } from './verifySteamAuth';

/**
 * Steam authentication plugin for better-authServer
 * Uses OpenID 2.0 protocol instead of standard OAuth
 */
export const steamAuthServer = (
  prisma: Prisma,
  steam: Steam,
  logger: Logger
) => {
  return {
    id: 'steam',
    endpoints: {
      steamCallback: createAuthEndpoint(
        '/steam/callback',
        {
          method: 'GET',
        },
        async (ctx) => {
          try {
            if (!ctx.request) {
              throw new Error('Request is not available');
            }

            const requestUrl = new URL(ctx.request.url);
            logger.info(`Request url: ${ctx.request.url}`);

            const claimedId = requestUrl.searchParams.get('openid.claimed_id');
            if (!claimedId) {
              logger.error('openid.claimed_id is not provided');
              throw new Error('openid.claimed_id is not provided');
            }

            const steamId = extractSteamId(claimedId);
            if (!steamId) {
              logger.error('Failed to extract Steam ID from claimed_id');
              throw new Error('Failed to extract Steam ID from claimed_id');
            }

            await verifySteamAuth(requestUrl.searchParams, logger);

            const playersSummaries = await steam.getPlayerSummaries(steamId);
            const userSummary = playersSummaries[0];
            if (!userSummary) {
              logger.error('Failed to fetch user summary');
              throw new Error('Failed to fetch user summary');
            }

            logger.info('Steam user summary:');
            logger.info(userSummary);

            const userEmail = `${steamId}@steam.artificial`;

            const user = await (async function () {
              {
                const result =
                  await ctx.context.internalAdapter.findUserByEmail(userEmail);

                if (result) {
                  logger.info('Found existing user');
                  return result.user;
                }
              }

              const user = await ctx.context.internalAdapter.createUser({
                name: userSummary.personaname,
                image: userSummary.avatarfull,
                email: userEmail,
                emailVerified: true,
              });

              logger.info('Created new user');

              if (user) {
                return user;
              }

              throw new Error('Failed to create user');
            })();

            logger.info('Upserting Steam profile...');

            await prisma.steamProfile.upsert({
              where: { steamId64: steamId },
              update: {
                userId: user.id,
                name: userSummary.personaname,
                image: userSummary.avatarfull,
              },
              create: {
                userId: user.id,
                steamId64: steamId,
                name: userSummary.personaname,
                image: userSummary.avatarfull,
              },
            });

            if (ctx.context.session) {
              logger.info(`Found an existing session. Redirecting...`);
              return ctx.redirect('/');
            }

            const session = await ctx.context.internalAdapter.createSession(
              user.id,
              ctx
            );

            await setSessionCookie(ctx, { session, user });

            logger.info(`Session created and cookie set. Redirecting...`);

            return ctx.redirect('/api/auth-success');
          } catch (e) {
            const error = e as Error;
            logger.error(error.message);

            return ctx.redirect('/api/auth/error?error=' + error.message);
          }
        }
      ),
    },
  } satisfies BetterAuthPlugin;
};
