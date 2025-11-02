import { headers } from 'next/headers';
import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { authServer } from '@/libs/auth/server';
import { getSteamProfile } from '../../_actions/getSteamProfile';
import { getPlaylistById } from '../../_actions/getPlaylistById';
import { Playlist } from './Playlist';

export default async function SteamPlaylist({
  params,
}: PageProps<'/steam/playlist/[playlistId]'>) {
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

        <Playlist playlist={playlist} />
      </div>
    </div>
  );
}
