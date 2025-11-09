'use server';

import { logger } from '@/libs/logger';
import { prisma } from '@/libs/prisma';
import { steam } from '@/libs/steam';
import { getSteamProfile } from '../../../_functions/getSteamProfile';

export type Friend = {
  steamId64: string;
  name: string;
  image: string;
  isOnApp: boolean;
};

async function getFriendsList(): Promise<Friend[]> {
  const steamProfile = await getSteamProfile();

  try {
    const friends = [
      ...(await steam.getFriendList(steamProfile.steamId64)),
    ].sort((a, b) => b.friend_since - a.friend_since);

    const steamIds = friends.map((f) => f.steamid);

    const friendsProfiles = await prisma.steamProfile.findMany({
      where: {
        steamId64: {
          in: steamIds,
        },
      },
    });
    const profilesMap = new Map(friendsProfiles.map((p) => [p.steamId64, p]));

    const playersSummaries = await steam.getPlayerSummaries(steamIds.join(','));
    const playersMap = new Map(playersSummaries.map((p) => [p.steamid, p]));

    return friends.map((friend) => {
      const player = playersMap.get(friend.steamid)!;
      return {
        steamId64: player.steamid,
        name: player.personaname,
        image: player.avatarfull,
        isOnApp: profilesMap.has(player.steamid),
      };
    });
  } catch (error) {
    logger.error(error);

    throw error;
  }
}

export default getFriendsList;
