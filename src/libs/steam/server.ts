import 'server-only';
import { getServerEnv } from '@/libs/env/server';
import { SteamAPI } from './SteamAPI';

export const steam = new SteamAPI({
  apiKey: getServerEnv('STEAM_API_KEY'),
});
