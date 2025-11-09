'use server';

import { refresh } from 'next/cache';
import { prisma } from '@/libs/prisma';
import { steam } from '@/libs/steam';
import { getSteamProfile } from '../../../_functions/getSteamProfile';

export async function addFriendToPlaylist(
  key: 'addFriendToPlaylist',
  {
    arg: { playlistId, steamId64 },
  }: { arg: { playlistId: string; steamId64: string } }
): Promise<{ message: string }> {
  const steamProfile = await getSteamProfile();

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

  const playerSummaries = await steam.getPlayerSummaries(steamId64);
  if (playerSummaries.length === 0) {
    throw new Error('User not found on Steam');
  }

  const player = playerSummaries[0];

  const profile = await prisma.steamProfile.upsert({
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

  await prisma.steamPlaylist.update({
    where: { id: playlistId },
    data: {
      participants: {
        connect: { id: profile.id },
      },
    },
  });

  refresh();

  return {
    message: 'Friend added to playlist',
  };
}
