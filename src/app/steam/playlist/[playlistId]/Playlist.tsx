import React from 'react';
import { AddFriend } from './_components/add-friend/AddFriend';
import { PlaylistProvider } from './_providers/PlaylistProvider';
import { GamesTableBody } from './GamesTableBody';
import { GamesTableHead } from './GamesTableHead';
import { getPlaylistRatingsMatrix } from './getPlaylistRatingsMatrix';

export const Playlist: React.FC = async () => {
  const ratingsMatrix = await getPlaylistRatingsMatrix();
  const playlist = PlaylistProvider.get();

  return (
    <div className='space-y-4'>
      <div className='flex gap-4'>
        <AddFriend playlist={playlist} />
      </div>

      <div className='w-full overflow-auto rounded-md border border-border'>
        <table className='w-full border-collapse text-sm'>
          <GamesTableHead />
          <GamesTableBody ratingsMatrix={ratingsMatrix} />
        </table>
      </div>
    </div>
  );
};
