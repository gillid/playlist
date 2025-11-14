import { prisma } from '@/libs/prisma';
import { getSteamProfile } from '../../../_functions/getSteamProfile';

export const updateUpdates = async (playlistId: string) => {
  const steamProfile = await getSteamProfile();

  const playlist = await prisma.steamPlaylist.findUnique({
    where: {
      id: playlistId,
    },
    include: {
      participants: true,
      owner: true,
    },
  });

  if (!playlist) {
    throw new Error('Playlist not found');
  }

  const profilesToNotify = [playlist.owner, ...playlist.participants].filter(
    (p) => p.id !== steamProfile.id
  );

  if (profilesToNotify.length === 0) {
    return;
  }

  const profileIds = profilesToNotify.map((p) => p.id);

  const updated = await prisma.steamPlaylistUpdate.updateManyAndReturn({
    where: {
      playlistId,
      profileId: {
        in: profileIds,
      },
    },
    data: {
      updatedAt: new Date(),
    },
  });

  const updatedProfileIds = updated.map((u) => u.profileId);
  const leftProfileIds = profileIds.filter(
    (id) => !updatedProfileIds.includes(id)
  );

  if (leftProfileIds.length === 0) {
    return;
  }

  await prisma.steamPlaylistUpdate.createMany({
    data: leftProfileIds.map((id) => ({
      playlistId,
      profileId: id,
    })),
  });
};
