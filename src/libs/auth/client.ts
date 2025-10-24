import { createAuthClient as createBetterAuthClient } from 'better-auth/react';
import { steamAuthClient } from './steam-plugin/steamAuthClient';

export const createAuthClient = (options: {
  baseURL: string;
  basePath: string;
}) => {
  return createBetterAuthClient({
    appName: 'Playlist',
    baseURL: options.baseURL,
    basePath: options.basePath,
    plugins: [steamAuthClient(options.baseURL, options.basePath)],
  });
};
