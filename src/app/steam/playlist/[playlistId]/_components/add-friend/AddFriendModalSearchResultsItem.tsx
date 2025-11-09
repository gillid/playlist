import React from 'react';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';
import { Avatar } from '@/ui/avatar';
import { Button } from '@/ui/button';
import type { Friend } from '../../_actions/getFriendsList';
import type { PlaylistWithRelations } from '../../_functions/getPlaylistById';
import { AddFriendModalSearchResultAdd } from './AddFriendModalSearchResultAdd';
import { AddFriendModalSearchResultShare } from './AddFriendModalSearchResultShare';

export const AddFriendModalSearchResultsItem: React.FC<{
  playlist: PlaylistWithRelations;
  friend: Friend;
  isAlreadyInPlaylist: boolean;
}> = ({ playlist, friend, isAlreadyInPlaylist }) => {
  const [showShare, setShowShare] = React.useState(false);

  return (
    <div className='w-full p-3 rounded-md border border-border bg-card space-y-4'>
      <div className='flex items-center gap-3'>
        <Avatar
          image={friend.image}
          title={friend.name}
          className='h-10 w-10 flex-shrink-0'
        />

        <div className='flex-1 min-w-10 font-medium truncate'>
          <div>{friend.name}</div>
          <div className='text-xs text-muted-foreground'>
            {isAlreadyInPlaylist && (
              <div className='text-xs text-muted-foreground flex gap-1 items-center'>
                In this playlist
                <CheckIcon className='h-3 w-3 text-green-600' />
              </div>
            )}
          </div>
        </div>

        {isAlreadyInPlaylist ? (
          <Button
            onClick={() => setShowShare(!showShare)}
            variant='ghost'
            size='sm'
            className='flex items-center gap-2'
            aria-expanded={showShare}
          >
            <span>Share link</span>
            <ChevronDownIcon
              className={`h-4 w-4 transition-transform ${
                showShare ? 'rotate-180' : ''
              }`}
            />
          </Button>
        ) : (
          <AddFriendModalSearchResultAdd
            friendSteamId={friend.steamId64}
            playlistId={playlist.id}
          />
        )}
      </div>

      {showShare && (
        <div className='transition-all duration-200 ease-in-out'>
          <AddFriendModalSearchResultShare
            playlist={playlist}
            friend={friend}
          />
        </div>
      )}
    </div>
  );
};
