import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { authServer } from '@/libs/auth/server';
import { prisma } from '@/libs/prisma';

export default async function SteamDashboard() {
  const session = await authServer.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/');
  }

  const steamProfile = await prisma.steamProfile.findUnique({
    where: { userId: session.user.id },
    include: {
      ownedPlaylists: true,
      participatingPlaylists: {
        include: {
          participants: true,
        },
      },
    },
  });

  if (!steamProfile) {
    redirect('/');
  }

  return (
    <div className='flex-1 container mx-auto px-4 py-4'>
      <h1 className='text-3xl font-semibold tracking-tight'>Steam Dashboard</h1>
    </div>
  );
}
