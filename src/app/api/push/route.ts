'use server';

import type { NextRequest } from 'next/server';
import webpush from 'web-push';
import { getServerEnv } from '@/libs/env/server';
import { prisma } from '@/libs/prisma';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${getServerEnv('CRON_SECRET')}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  webpush.setVapidDetails(
    'https://playlist.gillid.pro/',
    getServerEnv('NEXT_PUBLIC_VAPID_KEY'),
    getServerEnv('PRIVATE_VAPID_KEY')
  );

  const subscriptions = await prisma.userWebPushSubscription.findMany({
    include: {
      user: {
        include: {
          steamProfile: {
            include: {
              playlistUpdates: {
                where: {
                  isPushed: false,
                },
                include: {
                  playlist: true,
                },
              },
            },
          },
        },
      },
    },
  });

  for (const subscription of subscriptions) {
    const updates = subscription.user?.steamProfile?.playlistUpdates ?? [];
    if (!updates.length) {
      continue;
    }

    const playlistsNames = updates
      .map((update) => update.playlist.name)
      .join(', ');

    try {
      await webpush.sendNotification(
        {
          endpoint: subscription.endpoint,
          keys: subscription.keys as { p256dh: string; auth: string },
        },
        JSON.stringify({
          title: "You've got updates!",
          body: `Playlists: ${playlistsNames}`,
        })
      );

      await prisma.steamPlaylistUpdate.updateMany({
        where: { id: { in: updates.map((update) => update.id) } },
        data: { isPushed: true },
      });
    } catch (error) {
      if (error instanceof webpush.WebPushError) {
        await prisma.userWebPushSubscription.delete({
          where: { endpoint: subscription.endpoint },
        });
      }
    }
  }

  return Response.json(null, { status: 200 });
}
