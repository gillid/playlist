import 'server-only';
import pino from 'pino';
import { createAuthServer } from '@/libs-origin/auth/server';
import { getServerEnv } from '@/libs-origin/env/server';
import { getClientEnv } from '@/libs-origin/env/client';
import { prisma } from '@/libs-origin/prisma';
import { SteamAPI } from '@/libs-origin/steam/SteamAPI';

export const logger = pino({
  level: getServerEnv('NODE_ENV') === 'production' ? 'info' : 'debug',
  transport:
    getServerEnv('NODE_ENV') === 'development'
      ? { target: 'pino-pretty', options: { colorize: true } }
      : undefined,
});

export const steam = new SteamAPI({
  apiKey: getServerEnv('STEAM_API_KEY'),
});

export const authServer = createAuthServer({
  secret: getServerEnv('BETTER_AUTH_SECRET'),
  baseURL: getClientEnv('NEXT_PUBLIC_APP_URL'),
  basePath: getClientEnv('NEXT_PUBLIC_AUTH_PATH'),
  prisma,
  steam,
  logger,
});
