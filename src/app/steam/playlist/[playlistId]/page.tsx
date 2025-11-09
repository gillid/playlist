import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSteamProfile } from '../../_functions/getSteamProfile';
import { getPlaylistById } from './_functions/getPlaylistById';
import { PlaylistProvider } from './_providers/PlaylistProvider';
import { Playlist } from './Playlist';

export default async function SteamPlaylist({
  params,
}: PageProps<'/steam/playlist/[playlistId]'>) {
  const steamProfile = await getSteamProfile();

  const { playlistId } = await params;
  if (!playlistId) {
    notFound();
  }

  const playlist = await getPlaylistById(playlistId);
  if (!playlist) {
    notFound();
  }

  const participants = [playlist.owner, ...playlist.participants];
  const isUserParticipant = participants.some(
    (participant) => participant.id === steamProfile.id
  );
  if (!isUserParticipant) {
    notFound();
  }

  return (
    <PlaylistProvider.Provider value={playlist}>
      <div className='gutter pb-8'>
        <div className='flex items-center space-x-2 text-muted-foreground text-sm h-8'>
          <Link href='/steam/dashboard' className='underline'>
            Playlists
          </Link>
          <span className='mx-2'>/</span>
          <span>{playlist.name}</span>
        </div>

        <div className='space-y-8'>
          <h1 className='text-3xl font-semibold tracking-tight'>
            {playlist.name}
          </h1>

          <Playlist />
        </div>
      </div>
    </PlaylistProvider.Provider>
  );
}
