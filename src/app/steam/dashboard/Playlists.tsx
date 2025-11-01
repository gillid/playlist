import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/ui/card';
import { getPlaylists } from '../_actions/getPlaylists';
import { PlaylistParticipants } from '../_components/PlaylistParticipants';
import { PlaylistGames } from '../_components/PlaylistGames';

export const Playlists: React.FC = async () => {
  const playlists = await getPlaylists();

  if (!playlists || playlists.length === 0) {
    return (
      <div className='rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground'>
        Create your first playlist to get started!
      </div>
    );
  }

  return (
    <ul className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      {playlists.map((playlist) => {
        const participants = [playlist.owner, ...playlist.participants];
        const games = playlist.games;

        return (
          <li key={playlist.id} className='h-full'>
            <Link
              href={`/steam/playlist/${playlist.id}`}
              className='block h-full'
            >
              <Card className='h-full transition-colors hover:bg-accent/40 focus-within:ring-2 focus-within:ring-ring'>
                <CardContent className='p-4'>
                  <div className='flex items-center justify-between gap-2'>
                    <div className='font-medium truncate' title={playlist.name}>
                      {playlist.name}
                    </div>

                    <PlaylistParticipants participants={participants} />
                  </div>

                  <div className='mt-3 flex items-center gap-3'>
                    <PlaylistGames games={games} />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
