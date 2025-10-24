import { headers } from 'next/headers';
import { authServer } from '@/libs/auth/server';
import { DashboardPrivate } from './private/DashboardPrivate';
import { DashboardPublic } from './public/DashboardPublic';

export default async function Home() {
  const session = await authServer.api.getSession({
    headers: await headers(),
  });

  return session ? <DashboardPrivate /> : <DashboardPublic />;
}
