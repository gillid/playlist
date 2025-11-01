import { headers } from 'next/headers';
import { authServer } from '@/libs/auth/server';
import { prisma, type SteamProfile } from '@/libs/prisma';

export const getSteamProfile = async (): Promise<SteamProfile | null> => {
  const session = await authServer.api.getSession({ headers: await headers() });
  if (!session) {
    return null;
  }

  return prisma.steamProfile.findUnique({
    where: { userId: session.user.id },
  });
};
