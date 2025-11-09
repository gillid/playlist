import { CreatePlaylist } from './CreatePlaylist';
import { Playlists } from './Playlists';

export default async function SteamDashboard() {
  return (
    <div className='gutter py-8 space-y-8'>
      <h1 className='text-3xl font-semibold tracking-tight'>Playlists</h1>

      <Playlists />

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>Create a new playlist</h2>
        <CreatePlaylist />
      </section>
    </div>
  );
}
