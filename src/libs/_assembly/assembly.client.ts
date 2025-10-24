import { createAuthClient } from '@/libs-origin/auth/client';
import { getClientEnv } from '@/libs-origin/env/client';

export const authClient = createAuthClient({
  baseURL: getClientEnv('NEXT_PUBLIC_APP_URL'),
  basePath: getClientEnv('NEXT_PUBLIC_AUTH_PATH'),
});
