import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { authServer } from '@/libs/auth/server';
import { getSteamProfile } from '../_actions/getSteamProfile';
import { Playlists } from './Playlists';
// import { CreatePlaylist } from './CreatePlaylist';

export default async function SteamDashboard() {
  const session = await authServer.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect('/');
  }

  const steamProfile = await getSteamProfile();
  if (!steamProfile) {
    redirect('/');
  }

  return (
    <div className='gutter py-8 space-y-8'>
      <h1 className='text-3xl font-semibold tracking-tight'>Playlists</h1>

      <Playlists />

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>Create a new playlist</h2>
        {/*<CreatePlaylist />*/}
      </section>
    </div>
  );
}
