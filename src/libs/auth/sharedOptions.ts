import type { BetterAuthOptions } from 'better-auth';
import { getClientEnv } from '@/libs/env/client';

export const sharedOptions: BetterAuthOptions = {
  appName: 'Playlist',
  baseURL: getClientEnv('NEXT_PUBLIC_APP_URL'),
  basePath: getClientEnv('NEXT_PUBLIC_AUTH_PATH'),
};
