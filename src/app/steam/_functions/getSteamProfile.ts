import { cache } from 'react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { authServer } from '@/libs/auth/server';
import { prisma, type SteamProfile } from '@/libs/prisma';

export const getSteamProfile = cache(async (): Promise<SteamProfile> => {
  const session = await authServer.api.getSession({ headers: await headers() });
  if (!session) {
    redirect('/');
  }

  const steamProfile = await prisma.steamProfile.findUnique({
    where: { userId: session.user.id },
  });

  if (!steamProfile) {
    redirect('/');
  }

  return steamProfile;
});
