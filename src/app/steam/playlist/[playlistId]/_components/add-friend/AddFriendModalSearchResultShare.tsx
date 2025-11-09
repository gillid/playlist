import React, { useState } from 'react';
import { CheckIcon, CopyIcon } from 'lucide-react';
import { getClientEnv } from '@/libs/env/client';
import { Button } from '@/ui/button';
import { SteamIcon } from '@/ui/SteamIcon';
import type { Friend } from '../../_actions/getFriendsList';
import type { PlaylistWithRelations } from '../../_functions/getPlaylistById';

export const AddFriendModalSearchResultShare: React.FC<{
  playlist: PlaylistWithRelations;
  friend: Friend;
}> = ({ playlist, friend }) => {
  const [copied, setCopied] = useState(false);

  const sharePath = `/share?redirect=${encodeURIComponent(`/steam/playlist/${playlist.id}`)}`;

  const invitationLink = `${getClientEnv('NEXT_PUBLIC_APP_URL')}${sharePath}`;

  const handleCopyInvitation = () => {
    navigator.clipboard.writeText(invitationLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleOpenSteamChat = () => {
    window.location.href = `steam://friends/message/${friend.steamId64}`;
  };

  return (
    <div className='flex items-center gap-2'>
      <Button
        title='Copy Invitation Link'
        onClick={handleCopyInvitation}
        variant='ghost'
        size='sm'
        className='flex-1 min-w-22 border bg-background hover:bg-accent/50 transition-colors justify-between gap-2'
      >
        <span className='min-w-10 truncate'>{invitationLink}</span>
        {copied ? (
          <CheckIcon className='text-green-600 shrink-0' />
        ) : (
          <CopyIcon className='shrink-0' />
        )}
      </Button>

      <Button
        title='Open Steam Chat'
        onClick={handleOpenSteamChat}
        variant='outline'
        size='sm'
        className='shrink-0'
      >
        <SteamIcon />
      </Button>
    </div>
  );
};
