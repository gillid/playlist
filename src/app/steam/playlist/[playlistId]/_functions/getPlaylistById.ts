import { cache } from 'react';
import { prisma, type Prisma } from '@/libs/prisma';

const playlistInclude = {
  participants: true,
  owner: true,
  games: {
    include: {
      ratings: true,
    },
  },
} as const satisfies Prisma.SteamPlaylistInclude;

export type PlaylistWithRelations = Prisma.SteamPlaylistGetPayload<{
  include: typeof playlistInclude;
}>;

export const getPlaylistById = cache(
  async (id: string): Promise<PlaylistWithRelations | null> => {
    const playlist = await prisma.steamPlaylist.findUnique({
      where: {
        id,
      },
      include: playlistInclude,
    } satisfies Prisma.SteamPlaylistFindManyArgs);

    if (!playlist) {
      return null;
    }

    return playlist;
  }
);
