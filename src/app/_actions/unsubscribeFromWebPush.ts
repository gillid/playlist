'use server';

import { headers } from 'next/headers';
import { z } from 'zod';
import { authServer } from '@/libs/auth/server';
import { prisma } from '@/libs/prisma';

export const unsubscribeFromWebPush = async (arg: string) => {
  const session = await authServer.api.getSession({ headers: await headers() });
  if (!session) {
    throw new Error('Unauthorized');
  }

  const endpoint = z.string().parse(arg);

  await prisma.userWebPushSubscription.delete({
    where: {
      endpoint,
    },
  });

  return {
    message: 'Subscription successfully removed.',
  };
};
