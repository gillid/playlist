import 'server-only';
import pino from 'pino';
import { getServerEnv } from '@/libs/env/server';

export const logger = pino({
  level: getServerEnv('NODE_ENV') === 'production' ? 'info' : 'debug',
  transport:
    getServerEnv('NODE_ENV') === 'development'
      ? { target: 'pino-pretty', options: { colorize: true } }
      : undefined,
});
