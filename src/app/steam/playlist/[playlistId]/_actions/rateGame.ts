'use server';

import { refresh } from 'next/cache';
import { prisma, type RatingValue } from '@/libs/prisma';
import { getSteamProfile } from '../../../_functions/getSteamProfile';

export const rateGame = async (gameId: string, rating: RatingValue) => {
  const steamProfile = await getSteamProfile();

  await prisma.steamPlaylistGameRating.upsert({
    where: {
      gameId_profileId: {
        gameId,
        profileId: steamProfile.id,
      },
    },
    update: {
      value: rating,
    },
    create: {
      gameId,
      profileId: steamProfile.id,
      value: rating,
    },
  });

  refresh();
};
