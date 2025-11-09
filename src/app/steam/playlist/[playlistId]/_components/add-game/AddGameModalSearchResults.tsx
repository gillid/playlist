import React from 'react';
import { Loader2Icon } from 'lucide-react';
import { InlineNotification } from '@/ui/InlineNotification';
import type { PlaylistWithRelations } from '../../_functions/getPlaylistById';
import { AddGameModalSearchResultsItem } from './AddGameModalSearchResultsItem';
import { useGamesList } from './useGamesList';

export const AddGameModalSearchResults: React.FC<{
  playlist: PlaylistWithRelations;
  searchQuery: string;
}> = ({ playlist, searchQuery }) => {
  const isQueryValid = searchQuery.length >= 3;
  const { data, isLoading, error } = useGamesList(searchQuery);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center py-8'>
        <Loader2Icon className='h-6 w-6 animate-spin text-muted-foreground' />
      </div>
    );
  }

  if (error) {
    return (
      <InlineNotification
        type='error'
        message={error?.message ?? 'An error occurred while fetching games'}
        visible={true}
      />
    );
  }

  if (!isQueryValid) {
    return (
      <InlineNotification
        type='info'
        message='Type at least 3 characters to search for games.'
        visible={true}
      />
    );
  }

  if (!data) {
    return (
      <InlineNotification
        type='info'
        message='No results found matching your search'
        visible={true}
      />
    );
  }

  const gamesInPlaylist = playlist.games.map((game) => game.steamAppId);

  return (
    <div className='flex-1 overflow-y-auto space-y-2'>
      {data.map((game) => {
        const isAlreadyInPlaylist = gamesInPlaylist.includes(game.appid);

        return (
          <AddGameModalSearchResultsItem
            key={game.appid}
            game={game}
            playlist={playlist}
            isAlreadyInPlaylist={isAlreadyInPlaylist}
          />
        );
      })}
    </div>
  );
};
