import React from 'react';
import { AddFriend } from './_components/add-friend/AddFriend';
import { AddGame } from './_components/add-game/AddGame';
import { getPlaylistRatingsMatrix } from './_functions/getPlaylistRatingsMatrix';
import { PlaylistProvider } from './_providers/PlaylistProvider';
import { GamesTableBody } from './GamesTableBody';
import { GamesTableHead } from './GamesTableHead';

export const Playlist: React.FC = async () => {
  const ratingsMatrix = await getPlaylistRatingsMatrix();
  const playlist = PlaylistProvider.get();

  return (
    <div className='space-y-4'>
      <div className='flex gap-4'>
        <AddGame playlist={playlist} />
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
