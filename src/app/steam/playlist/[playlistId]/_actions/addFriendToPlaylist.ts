'use server';

import { refresh } from 'next/cache';
import { z } from 'zod';
import { prisma } from '@/libs/prisma';
import { steam } from '@/libs/steam';
import { getSteamProfile } from '../../../_functions/getSteamProfile';
import { updateUpdates } from '../_functions/updateUpdates';

const argSchema = z.object({
  playlistId: z.string(),
  steamId64: z.string().regex(/^\d+$/),
});

export async function addFriendToPlaylist(
  key: 'addFriendToPlaylist',
  { arg }: { arg: { playlistId: string; steamId64: string } }
): Promise<{ message: string }> {
  const steamProfile = await getSteamProfile();

  const { playlistId, steamId64 } = argSchema.parse(arg);

  const playlist = await prisma.steamPlaylist.findFirst({
    where: {
      id: playlistId,
      OR: [
        { ownerId: steamProfile.id },
        { participants: { some: { id: steamProfile.id } } },
      ],
    },
  });

  if (!playlist) {
    throw new Error('Playlist not found or access denied');
  }

  const profile = await (async function () {
    const existingProfile = await prisma.steamProfile.findUnique({
      where: { steamId64 },
    });
    if (existingProfile) {
      return existingProfile;
    }

    const playerSummaries = await steam.getPlayerSummaries(steamId64);
    if (playerSummaries.length === 0) {
      throw new Error('User not found on Steam');
    }

    const player = playerSummaries[0];

    return prisma.steamProfile.upsert({
      where: { steamId64: player.steamid },
      update: {
        name: player.personaname,
        image: player.avatarfull,
      },
      create: {
        steamId64: player.steamid,
        name: player.personaname,
        image: player.avatarfull,
      },
    });
  })();

  await prisma.steamPlaylist.update({
    where: { id: playlistId },
    data: {
      participants: {
        connect: { id: profile.id },
      },
    },
  });

  await updateUpdates(playlistId);

  refresh();

  return {
    message: 'Friend added to playlist',
  };
}
