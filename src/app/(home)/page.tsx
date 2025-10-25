import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { authServer } from '@/libs/auth/server';
import { prisma } from '@/libs/prisma';
import { DashboardPrivate } from './private/DashboardPrivate';
import { DashboardPublic } from './public/DashboardPublic';

export default async function Home() {
  const session = await authServer.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return <DashboardPublic />;
  }

  const steamProfile = await prisma.steamProfile.findUnique({
    where: { userId: session.user.id },
  });

  if (steamProfile) {
    redirect('/steam/dashboard');
  }

  return <DashboardPrivate />;
}
