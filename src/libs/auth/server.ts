import 'server-only';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { nextCookies } from 'better-auth/next-js';
import { prisma } from '@/libs/prisma';
import { getServerEnv } from '@/libs/env/server';
import { sharedOptions } from './sharedOptions';
import { steamAuthServer } from './steam-plugin/steamAuthServer';

export const authServer = betterAuth({
  ...sharedOptions,
  secret: getServerEnv('BETTER_AUTH_SECRET'),
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  plugins: [
    steamAuthServer(),
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

export default authServer;
