'use client';

import React, { useState } from 'react';
import { UserPlusIcon } from 'lucide-react';
import { Button } from '@/ui/button';
import type { PlaylistWithRelations } from '../../_functions/getPlaylistById';
import { ModalWrapper } from '../ModalWrapper';
import { AddFriendModal } from './AddFriendModal';

export const AddFriend: React.FC<{
  playlist: PlaylistWithRelations;
}> = ({ playlist }) => {
  const [addFriendModalOpen, setAddFriendModalOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setAddFriendModalOpen(true)}
        variant='outline'
        className='flex items-center gap-2'
      >
        <UserPlusIcon className='h-4 w-4' />
        Add Friend
      </Button>

      <ModalWrapper
        open={addFriendModalOpen}
        onOpenChange={setAddFriendModalOpen}
      >
        <AddFriendModal playlist={playlist} />
      </ModalWrapper>
    </>
  );
};
