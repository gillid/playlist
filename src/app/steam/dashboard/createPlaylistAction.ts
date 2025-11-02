'use server';

import { refresh } from 'next/cache';
import { z } from 'zod';
import { prisma } from '@/libs/prisma';
import { getSteamProfile } from '../_actions/getSteamProfile';

const FormDataSchema = z.object({
  playlist_name: z.coerce.string().trim().min(3).max(100),
});

export type CreatePlaylistActionResponse = {
  status: 'success' | 'error' | 'idle';
  message: string;
};

export async function createPlaylistAction(
  _prevState: CreatePlaylistActionResponse,
  formData: FormData
): Promise<CreatePlaylistActionResponse> {
  const profile = await getSteamProfile();
  if (!profile) {
    return {
      status: 'error',
      message: 'Access denied. Please sign in with Steam.',
    };
  }

  try {
    const parsedFormData = FormDataSchema.parse(
      Object.fromEntries(formData.entries())
    );

    await prisma.steamPlaylist.create({
      data: {
        name: parsedFormData.playlist_name,
        owner: { connect: { id: profile.id } },
      },
    });

    refresh();

    return {
      status: 'success',
      message: 'Playlist created successfully',
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.issues
        .map((issue) => `${issue.path[0].toString()}: ${issue.message}`)
        .join(', ');

      return {
        status: 'error',
        message: errorMessage,
      };
    }

    return {
      status: 'error',
      message: (error as Error)?.message,
    };
  }
}
