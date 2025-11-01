'use client';

import React, { useEffect, useRef } from 'react';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { InlineNotification } from '@/ui/InlineNotification';
import { useResettableFormState } from '@/libs/form-state/useResettableFormState';
import {
  createPlaylistAction,
  type CreatePlaylistActionResponse,
} from './createPlaylistAction';

export const CreatePlaylist = () => {
  const [state, action, isPending, reset] =
    useResettableFormState<CreatePlaylistActionResponse>(createPlaylistAction, {
      status: 'idle',
      message: '',
    });

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (state.status === 'idle') {
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      reset();
    }, 5000);
  }, [state.status, action, reset]);

  const isError = state.status === 'error';
  const isSuccess = state.status === 'success';

  return (
    <div className='max-w-md space-y-4'>
      <form action={action} className='flex gap-2'>
        <div className='flex-1'>
          <Input
            name='playlist_name'
            placeholder='Playlist name'
            className='w-full'
            required
            aria-invalid={isError}
            aria-describedby={isError ? 'playlist_name_error' : undefined}
          />
        </div>
        <Button type='submit' disabled={isPending} aria-disabled={isPending}>
          Create
        </Button>
      </form>
      <InlineNotification
        id='playlist_name_error'
        type='error'
        message={state.message}
        visible={isError}
      />
      <InlineNotification
        id='playlist_name_success'
        type='success'
        message={state.message}
        visible={isSuccess}
      />
    </div>
  );
};
