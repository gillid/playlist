'use server';

import { logger } from '@/libs/logger';
import { steam } from '@/libs/steam';
import { getSteamProfile } from '../../../_functions/getSteamProfile';

export type Friend = {
  steamId64: string;
  name: string;
  image: string;
};

async function getFriendsList(): Promise<Friend[]> {
  const steamProfile = await getSteamProfile();

  try {
    const friends = [
      ...(await steam.getFriendList(steamProfile.steamId64)),
    ].sort((a, b) => b.friend_since - a.friend_since);

    const steamIds = friends.map((f) => f.steamid);

    const playersSummaries = await steam.getPlayerSummaries(steamIds.join(','));
    const playersMap = new Map(playersSummaries.map((p) => [p.steamid, p]));

    return friends.map((friend) => {
      const player = playersMap.get(friend.steamid)!;
      return {
        steamId64: player.steamid,
        name: player.personaname,
        image: player.avatarfull,
      };
    });
  } catch (error) {
    logger.error(error);

    throw error;
  }
}

export default getFriendsList;
