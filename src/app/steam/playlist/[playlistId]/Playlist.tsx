import React from 'react';
import { GamesTableHead } from './GamesTableHead';
import { GamesTableBody } from './GamesTableBody';
import { getPlaylistRatingsMatrix } from './getPlaylistRatingsMatrix';

export const Playlist: React.FC = async () => {
  const ratingsMatrix = await getPlaylistRatingsMatrix();

  return (
    <div className='space-y-4'>
      <div className='w-full overflow-auto rounded-md border border-border'>
        <table className='w-full border-collapse text-sm'>
          <GamesTableHead />
          <GamesTableBody ratingsMatrix={ratingsMatrix} />
        </table>
      </div>
    </div>
  );
};
