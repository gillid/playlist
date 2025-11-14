import { cache } from 'react';
import { prisma, type Prisma } from '@/libs/prisma';
import { getSteamProfile } from './getSteamProfile';

const playlistInclude = {
  participants: true,
  owner: true,
  games: true,
  updates: {
    select: { id: true },
  },
} as const satisfies Prisma.SteamPlaylistInclude;

type PlaylistWithRelations = Prisma.SteamPlaylistGetPayload<{
  include: typeof playlistInclude;
}>;

export const getPlaylists = cache(
  async (): Promise<PlaylistWithRelations[] | null> => {
    const profile = await getSteamProfile();

    const playlists = await prisma.steamPlaylist.findMany({
      where: {
        OR: [
          { ownerId: profile.id },
          { participants: { some: { id: profile.id } } },
        ],
      },
      include: {
        ...playlistInclude,
        updates: {
          where: { profileId: profile.id },
          select: { id: true },
        },
      },
    } satisfies Prisma.SteamPlaylistFindManyArgs);

    if (!playlists.length) {
      return null;
    }

    return playlists;
  }
);
