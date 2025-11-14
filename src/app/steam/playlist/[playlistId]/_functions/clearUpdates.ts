import { prisma } from '@/libs/prisma';
import { getSteamProfile } from '../../../_functions/getSteamProfile';

/**
 * Clears unread updates for the current viewer on a specific playlist.
 * Safe to call multiple times; it will be a no-op if nothing exists.
 */
export async function clearUpdates(playlistId: string) {
  const profile = await getSteamProfile();

  await prisma.steamPlaylistUpdate.deleteMany({
    where: {
      playlistId,
      profileId: profile.id,
    },
  });
}
