'use server';

import { refresh } from 'next/cache';
import { z } from 'zod';
import { prisma, type RatingValue } from '@/libs/prisma';
import { getSteamProfile } from '../../../_functions/getSteamProfile';
import { updateUpdates } from '../_functions/updateUpdates';

const argSchema = z.object({
  gameId: z.string(),
  rating: z.enum([
    'YES',
    'NO',
    'MAYBE',
  ]),
});

export const rateGame = async (
  key: 'rateGame',
  { arg }: { arg: { gameId: string; rating: RatingValue } }
) => {
  const steamProfile = await getSteamProfile();

  const { gameId, rating } = argSchema.parse(arg);

  const updated = await prisma.steamPlaylistGameRating.upsert({
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
    include: {
      game: {
        include: {
          playlist: true,
        },
      },
    },
  });

  await updateUpdates(updated.game.playlist.id);

  refresh();
};
