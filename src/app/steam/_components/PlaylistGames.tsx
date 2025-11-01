import React from 'react';
import type { SteamPlaylistGame } from '@/libs/prisma';
import { Avatar } from '@/ui/avatar';
// import { Game } from './Game';

const GAMES_TO_SHOW = 6;

export const PlaylistGames: React.FC<{ games: SteamPlaylistGame[] }> = ({
  games,
}) => {
  const extraGames = Math.max(0, games.length - GAMES_TO_SHOW);

  return (
    <div className='flex -space-x-2' aria-label={`${games.length} games`}>
      {games
        .slice(0, GAMES_TO_SHOW)
        .map(
          (game) => '' /*<Game key={game.id} steamAppId={game.steamAppId} />*/
        )}

      {extraGames > 0 && (
        <Avatar
          key='more-games'
          text={`+${extraGames}`}
          title={`${extraGames} more games`}
          className='h-10 w-10 bg-muted text-foreground ring-1 ring-background'
        />
      )}
    </div>
  );
};
