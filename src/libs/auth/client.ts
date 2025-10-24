import { createAuthClient } from 'better-auth/react';
import { sharedOptions } from './sharedOptions';
import { steamAuthClient } from './steam-plugin/steamAuthClient';

export const authClient = createAuthClient({
  ...sharedOptions,
  plugins: [steamAuthClient()],
});
