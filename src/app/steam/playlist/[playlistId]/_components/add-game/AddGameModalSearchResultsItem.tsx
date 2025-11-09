import React from 'react';
import { CheckIcon } from 'lucide-react';
import type { Game } from '../../_actions/getGamesList';
import type { PlaylistWithRelations } from '../../_functions/getPlaylistById';
import { GameThumb } from '../../GameThumb';
import { AddGameModalSearchResultAdd } from './AddGameModalSearchResultAdd';

export const AddGameModalSearchResultsItem: React.FC<{
  playlist: PlaylistWithRelations;
  game: Game;
  isAlreadyInPlaylist: boolean;
}> = ({ playlist, game, isAlreadyInPlaylist }) => {
  return (
    <div
      key={game.appid}
      className='w-full p-3 rounded-md border border-border bg-card flex items-center gap-3'
    >
      <GameThumb
        steamAppId={game.appid}
        name={game.name}
        image={game.image}
        width={231}
        height={87}
        className='h-[24px] md:h-[48px]'
      />

      <div className='flex-1 min-w-10 font-medium truncate'>{game.name}</div>

      {isAlreadyInPlaylist ? (
        <div className='text-xs text-muted-foreground flex gap-1 items-center'>
          In this playlist
          <CheckIcon className='h-3 w-3 text-green-600' />
        </div>
      ) : (
        <AddGameModalSearchResultAdd
          steamAppId={game.appid}
          playlistId={playlist.id}
        />
      )}
    </div>
  );
};
