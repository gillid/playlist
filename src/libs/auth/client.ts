import { createAuthClient } from 'better-auth/react';
import { sharedOptions } from './sharedOptions';

export const authClient = createAuthClient({
  ...sharedOptions,
});
