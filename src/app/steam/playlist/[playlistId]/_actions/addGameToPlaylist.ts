'use server';

import { refresh } from 'next/cache';
import { z } from 'zod';
import { prisma } from '@/libs/prisma';
import { steam } from '@/libs/steam';
import { getSteamProfile } from '../../../_functions/getSteamProfile';
import { updateUpdates } from '../_functions/updateUpdates';

const argSchema = z.object({
  playlistId: z.string(),
  steamAppId: z.string().regex(/^\d+$/),
});

export async function addGameToPlaylist(
  key: 'addGameToPlaylist',
  { arg }: { arg: { playlistId: string; steamAppId: string } }
) {
  const steamProfile = await getSteamProfile();

  const { playlistId, steamAppId } = argSchema.parse(arg);

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

  const gameDetails = await steam.getGameDetails(steamAppId);
  if (!gameDetails) {
    throw new Error('Game not found on Steam');
  }

  await prisma.steamPlaylistGame.create({
    data: {
      playlistId: playlistId,
      steamAppId: steamAppId,
    },
  });

  await updateUpdates(playlistId);

  refresh();
}
