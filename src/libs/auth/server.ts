import 'server-only';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { nextCookies } from 'better-auth/next-js';
import { steamAuthServer } from './steam-plugin/steamAuthServer';
import type { Prisma, Steam, Logger } from './steam-plugin/types';

export const createAuthServer = (options: {
  secret: string;
  baseURL: string;
  basePath: string;
  prisma: Prisma;
  steam: Steam;
  logger: Logger;
}) => {
  return betterAuth({
    appName: 'Playlist',
    baseURL: options.baseURL,
    basePath: options.basePath,
    secret: options.secret,
    database: prismaAdapter(options.prisma, {
      provider: 'postgresql',
    }),
    plugins: [
      steamAuthServer(options.prisma, options.steam, options.logger),
      nextCookies(),
    ],
    session: {
      expiresIn: 60 * 60 * 24 * 30, // 30 days
      updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
    },
    advanced: {
      cookiePrefix: 'playlist',
    },
  });
};
