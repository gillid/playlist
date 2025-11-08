'use server';

import { refresh } from 'next/cache';
import { z } from 'zod';
import { prisma } from '@/libs/prisma';
import { getSteamProfile } from '../../_functions/getSteamProfile';

const FormDataSchema = z.object({
  playlist_name: z.coerce.string().trim().min(3).max(100),
});

export async function createPlaylist(
  key: 'createPlaylist',
  { arg }: { arg: FormData }
): Promise<{ message: string }> {
  const profile = await getSteamProfile();

  const parseResult = FormDataSchema.safeParse(
    Object.fromEntries(arg.entries())
  );

  if (parseResult.error) {
    const errorMessage = parseResult.error.issues
      .map((issue) => `${issue.path[0].toString()}: ${issue.message}`)
      .join(', ');

    return Promise.reject(new Error(errorMessage));
  }

  await prisma.steamPlaylist.create({
    data: {
      name: parseResult.data.playlist_name,
      owner: { connect: { id: profile.id } },
    },
  });

  refresh();

  return {
    message: 'Playlist created successfully',
  };
}
