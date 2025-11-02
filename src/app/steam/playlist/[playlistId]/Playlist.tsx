import React from 'react';
import type { PlaylistWithRelations } from '../../_actions/getPlaylistById';
import { GamesTableHead } from './GamesTableHead';
import { GamesTableBody } from './GamesTableBody';
import { getPlaylistRatingsMatrix } from './getPlaylistRatingsMatrix';

export const Playlist: React.FC<{ playlist: PlaylistWithRelations }> = async ({
  playlist,
}) => {
  const ratingsMatrix = await getPlaylistRatingsMatrix(playlist);

  return (
    <div className='w-full overflow-auto rounded-md border border-border'>
      <table className='w-full border-collapse text-sm'>
        <GamesTableHead ratingsMatrix={ratingsMatrix} />
        <GamesTableBody ratingsMatrix={ratingsMatrix} />
      </table>
    </div>
  );
};
