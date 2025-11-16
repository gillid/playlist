'use client';

import { BellIcon } from 'lucide-react';
import Link from 'next/link';
import { authClient } from '@/libs/auth/client';
import { usePushManager } from '../_service_worker/usePushManager';

export const PushNotifications = () => {
  const { isSupported } = usePushManager();
  const session = authClient.useSession();

  if (!isSupported || !session.data) {
    return null;
  }

  return (
    <div className='flex items-stretch h-full'>
      <Link
        href='/account/notifications'
        aria-label='Notifications'
        title='Notifications'
        className='group h-full inline-flex items-center border-l border-border bg-muted/40 hover:bg-muted/60 active:bg-muted/70 px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 transition-colors'
      >
        <BellIcon className='h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors' />
      </Link>
    </div>
  );
};
