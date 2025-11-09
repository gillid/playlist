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

            const claimedId = requestUrl.searchParams.get('openid.claimed_id');
            if (!claimedId) {
              throw new Error('openid.claimed_id is not provided');
            }
            logger.info(`got claimedId: ${claimedId}`);

            const steamId = extractSteamId(claimedId);
            if (!steamId) {
              throw new Error('Failed to extract Steam ID from claimed_id');
            }
            logger.info(`got steamId: ${steamId}`);

            await verifySteamAuth(requestUrl.searchParams, logger);
            logger.info('Steam authentication verified');

            const playersSummaries = await steam.getPlayerSummaries(steamId);
            const userSummary = playersSummaries[0];
            if (!userSummary) {
              throw new Error('Failed to fetch user summary');
            }
            logger.info('Steam user summary fetched:');
            logger.info(userSummary);

            const userEmail = `${steamId}@steam.artificial`;

            const user = await (async function () {
              {
                const result =
                  await ctx.context.internalAdapter.findUserByEmail(userEmail);

                if (result?.user) {
                  logger.info('User is found.');
                  return result.user;
                }
              }

              logger.info('User is new. Creating...');

              const result = await ctx.context.internalAdapter.createUser({
                name: userSummary.personaname,
                image: userSummary.avatarfull,
                email: userEmail,
                emailVerified: true,
              });

              if (result) {
                logger.info('Creating Steam profile...');

                await prisma.steamProfile.upsert({
                  where: { userId: result.id },
                  update: {},
                  create: {
                    userId: result.id,
                    steamId64: steamId,
                    name: userSummary.personaname,
                    image: userSummary.avatarfull,
                  },
                });

                return result;
              }

              throw new Error('Failed to create user');
            })();

            logger.info('Logging in...');

            await ctx.context.internalAdapter.deleteSessions(user.id);
            const session = await ctx.context.internalAdapter.createSession(
              user.id,
              ctx
            );

            await setSessionCookie(ctx, { session, user });

            logger.info('Session created and cookie set.');

            return ctx.redirect('/');
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
