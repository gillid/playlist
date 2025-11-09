'use client';

import React, { useState } from 'react';
import { Gamepad2Icon } from 'lucide-react';
import { Button } from '@/ui/button';
import type { PlaylistWithRelations } from '../../_functions/getPlaylistById';
import { ModalWrapper } from '../ModalWrapper';
import { AddGameModal } from './AddGameModal';

export const AddGame: React.FC<{
  playlist: PlaylistWithRelations;
}> = ({ playlist }) => {
  const [addGameModalOpen, setAddGameModalOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setAddGameModalOpen(true)}
        variant='outline'
        className='flex items-center gap-2'
      >
        <Gamepad2Icon className='h-4 w-4' />
        Add Game
      </Button>

      <ModalWrapper open={addGameModalOpen} onOpenChange={setAddGameModalOpen}>
        <AddGameModal playlist={playlist} />
      </ModalWrapper>
    </>
  );
};
