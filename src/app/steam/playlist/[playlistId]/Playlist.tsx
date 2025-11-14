import React from 'react';
import { AddFriend } from './_components/add-friend/AddFriend';
import { AddGame } from './_components/add-game/AddGame';
import { clearUpdates } from './_functions/clearUpdates';
import { getPlaylistRatingsMatrix } from './_functions/getPlaylistRatingsMatrix';
import { PlaylistProvider } from './_providers/PlaylistProvider';
import { GamesTableBody } from './GamesTableBody';
import { GamesTableHead } from './GamesTableHead';

export const Playlist: React.FC = async () => {
  const ratingsMatrix = await getPlaylistRatingsMatrix();
  const playlist = PlaylistProvider.get();

  await clearUpdates(playlist.id);

  return (
    <div className='space-y-4'>
      <div className='flex gap-4'>
        <AddGame playlist={playlist} />
        <AddFriend playlist={playlist} />
      </div>

      <div className='w-full overflow-auto border border-border scrollbar-thin scrollbar-thumb-primary scrollbar-track-background rounded-md '>
        <table className='w-full border-collapse text-sm'>
          <GamesTableHead />
          <GamesTableBody ratingsMatrix={ratingsMatrix} />
        </table>
      </div>
    </div>
  );
};
