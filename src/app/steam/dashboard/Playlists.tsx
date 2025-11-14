import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/ui/card';
import { PlaylistGames } from '../_components/PlaylistGames';
import { PlaylistParticipants } from '../_components/PlaylistParticipants';
import { getPlaylists } from '../_functions/getPlaylists';

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
        const hasUpdates = playlist.updates.length > 0;

        return (
          <li key={playlist.id} className='h-full'>
            <Link
              href={`/steam/playlist/${playlist.id}`}
              className='block h-full'
            >
              <Card className='relative h-full transition-colors hover:bg-accent/40 focus-within:ring-2 focus-within:ring-ring'>
                {hasUpdates && (
                  <span
                    className='absolute -top-1 -right-1 block h-3 w-3 rounded-full bg-blue-500 ring-2 ring-background'
                    aria-label='Unread updates'
                    title='Unread updates'
                  >
                    <span className='sr-only'>Unread updates</span>
                  </span>
                )}
                <CardContent className='p-4'>
                  <div className='flex items-center justify-between gap-2'>
                    <div className='font-medium truncate' title={playlist.name}>
                      {playlist.name}
                    </div>

                    <PlaylistParticipants participants={participants} />
                  </div>

                  {games.length > 0 && (
                    <div className='mt-3 flex items-center gap-3'>
                      <PlaylistGames games={games} />
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
