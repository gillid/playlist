'use server';

import { headers } from 'next/headers';
import { z } from 'zod';
import { authServer } from '@/libs/auth/server';
import { prisma } from '@/libs/prisma';

const webPushSubscriptionSchema = z.object({
  endpoint: z.httpUrl(),
  keys: z.object({
    p256dh: z.string(),
    auth: z.string(),
  }),
});

export const subscribeToWebPush = async (subscriptionJson: string) => {
  const session = await authServer.api.getSession({ headers: await headers() });
  if (!session) {
    throw new Error('Unauthorized');
  }

  const subscription = webPushSubscriptionSchema.parse(
    JSON.parse(subscriptionJson)
  );

  await prisma.userWebPushSubscription.upsert({
    where: {
      endpoint: subscription.endpoint,
    },
    update: {
      keys: subscription.keys,
    },
    create: {
      userId: session.user.id,
      endpoint: subscription.endpoint,
      keys: subscription.keys,
    },
  });

  return {
    message: 'Subscription saved successfully',
  };
};
