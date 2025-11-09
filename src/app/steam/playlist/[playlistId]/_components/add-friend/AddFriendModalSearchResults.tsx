import React from 'react';
import { Loader2Icon } from 'lucide-react';
import { InlineNotification } from '@/ui/InlineNotification';
import type { PlaylistWithRelations } from '../../_functions/getPlaylistById';
import { AddFriendModalSearchResultsItem } from './AddFriendModalSearchResultsItem';
import { useFriendsList } from './useFriendsList';

export const AddFriendModalSearchResults: React.FC<{
  playlist: PlaylistWithRelations;
  searchQuery: string;
}> = ({ playlist, searchQuery }) => {
  const { data, isLoading, error } = useFriendsList();

  if (isLoading) {
    return (
      <div className='flex items-center justify-center py-8'>
        <Loader2Icon className='h-6 w-6 animate-spin text-muted-foreground' />
      </div>
    );
  }

  if (error || !data) {
    return (
      <InlineNotification
        type='error'
        message={error?.message ?? 'An error occurred while fetching friends'}
        visible={true}
      />
    );
  }

  const participants = [playlist.owner, ...playlist.participants];
  const participantsIds = participants.map((p) => p.steamId64);

  const results = data.filter((friend) => {
    return friend.name.toLowerCase().includes(searchQuery.trim().toLowerCase());
  });

  if (results.length === 0) {
    return (
      <InlineNotification
        type='info'
        message='No results found'
        visible={true}
        className='text-muted-foreground'
      />
    );
  }

  return (
    <div className='flex-1 overflow-y-auto space-y-2'>
      {results.map((friend) => {
        const isAlreadyInPlaylist = participantsIds.includes(friend.steamId64);

        return (
          <AddFriendModalSearchResultsItem
            key={friend.steamId64}
            playlist={playlist}
            friend={friend}
            isAlreadyInPlaylist={isAlreadyInPlaylist}
          />
        );
      })}
    </div>
  );
};
