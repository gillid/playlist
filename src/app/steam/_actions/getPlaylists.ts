import { prisma, type Prisma } from '@/libs/prisma';
import { getSteamProfile } from './getSteamProfile';

const playlistInclude = {
  participants: true,
  owner: true,
  games: true,
} as const satisfies Prisma.SteamPlaylistInclude;

type PlaylistWithRelations = Prisma.SteamPlaylistGetPayload<{
  include: typeof playlistInclude;
}>;

export const getPlaylists = async (): Promise<
  PlaylistWithRelations[] | null
> => {
  const profile = await getSteamProfile();

  if (!profile) {
    return null;
  }

  const playlists = await prisma.steamPlaylist.findMany({
    where: {
      OR: [
        { ownerId: profile.id },
        { participants: { some: { id: profile.id } } },
      ],
    },
    include: playlistInclude,
  } satisfies Prisma.SteamPlaylistFindManyArgs);

  if (!playlists.length) {
    return null;
  }

  return playlists;
};
