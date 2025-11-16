import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { authServer } from '@/libs/auth/server';
import { ClientGuard } from '../../_components/ClientGuard';
import { AccountNotificationButton } from './AccountNotificationButton';

export default async function AccountNotification() {
  const session = await authServer.api.getSession({ headers: await headers() });

  if (!session) {
    redirect('/');
  }

  return (
    <main className='gutter py-8 space-y-4'>
      <h1 className='text-3xl font-semibold'>Notifications</h1>

      <section>
        <ClientGuard>
          <AccountNotificationButton />
        </ClientGuard>
      </section>
    </main>
  );
}
