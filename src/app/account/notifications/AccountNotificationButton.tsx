'use client';

import React, { useEffect, useState, useTransition } from 'react';
import { Loader2Icon } from 'lucide-react';
import { getClientEnv } from '@/libs/env/client';
import { Button } from '@/ui/button';
import { subscribeToWebPush } from '../../_actions/subscribeToWebPush';
import { unsubscribeFromWebPush } from '../../_actions/unsubscribeFromWebPush';
import { usePushManager } from '../../_service_worker/usePushManager';

export const AccountNotificationButton = () => {
  const { isSupported, pushManager } = usePushManager();
  const [subscription, setSubscription] = useState<
    PushSubscription | null | undefined
  >(undefined);
  const [isPending, startTransition] = useTransition();

  const getSubscription = async () => {
    if (!pushManager) {
      return;
    }

    const subscription = await pushManager.getSubscription();
    setSubscription(subscription);
  };

  useEffect(() => {
    if (!isSupported || !pushManager) {
      return;
    }

    (async function () {
      await getSubscription();
    })();
  }, [pushManager]);

  const handleSubscribe = () => {
    if (!pushManager) {
      return;
    }

    startTransition(async () => {
      const subscription = await pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: getClientEnv('NEXT_PUBLIC_VAPID_KEY'),
      });

      await subscribeToWebPush(JSON.stringify(subscription));
      await getSubscription();
    });
  };

  const handleUnsubscribe = () => {
    if (!subscription) {
      return;
    }

    startTransition(async () => {
      const endpoint = subscription.endpoint;
      await subscription.unsubscribe();
      await unsubscribeFromWebPush(endpoint);
      await getSubscription();
    });
  };

  if (!isSupported) {
    return (
      <div className='text-sm text-muted-foreground'>
        Your browser does not support push notifications.
      </div>
    );
  }

  if (subscription === undefined) {
    return (
      <div className='flex items-center gap-2'>
        <span>Checking current configuration</span>
        <Loader2Icon className='h-4 w-4 animate-spin text-muted-foreground' />
      </div>
    );
  }

  if (subscription) {
    return (
      <div className='space-y-4'>
        <p className='text-sm text-muted-foreground'>
          You are currently subscribed to notifications.
        </p>

        <Button
          variant='outline'
          type='button'
          onClick={handleUnsubscribe}
          disabled={isPending}
        >
          Disable
        </Button>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      <p className='text-sm text-muted-foreground'>
        You are currently not subscribed to notifications.
      </p>

      <Button type='button' onClick={handleSubscribe} disabled={isPending}>
        Enable
      </Button>
    </div>
  );
};
