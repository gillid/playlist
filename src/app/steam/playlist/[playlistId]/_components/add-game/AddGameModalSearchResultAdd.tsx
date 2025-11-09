import React from 'react';
import { Loader2Icon, PlusIcon } from 'lucide-react';
import useSWRMutation from 'swr/mutation';
import { Button } from '@/ui/button';
import { addGameToPlaylist } from '../../_actions/addGameToPlaylist';

export const AddGameModalSearchResultAdd: React.FC<{
  steamAppId: string;
  playlistId: string;
}> = ({ steamAppId, playlistId }) => {
  const { trigger, isMutating, error } = useSWRMutation(
    'addGameToPlaylist',
    addGameToPlaylist
  );

  if (isMutating) {
    return (
      <Loader2Icon className='h-6 w-6 animate-spin text-muted-foreground mx-3' />
    );
  }

  if (error) {
    return <span className='text-destructive text-sm'>{error}</span>;
  }

  return (
    <Button
      size='sm'
      className='flex items-center gap-2'
      onClick={() => trigger({ playlistId, steamAppId })}
    >
      <PlusIcon className='h-4 w-4' />
      Add
    </Button>
  );
};
