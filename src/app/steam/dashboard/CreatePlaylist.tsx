'use client';

import React, { useRef } from 'react';
import useSWRMutation from 'swr/mutation';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { InlineNotification } from '@/ui/InlineNotification';
import { createPlaylist } from './_actions/createPlaylist';

export const CreatePlaylist = () => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetWithDelay = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      reset();
    }, 5000);
  };

  const { trigger, isMutating, error, reset, data } = useSWRMutation(
    'createPlaylist',
    createPlaylist,
    {
      onSuccess: () => {
        resetWithDelay();
      },
      onError: () => {
        resetWithDelay();
      },
    }
  );

  const handleSubmit = async (formData: FormData) => {
    try {
      await trigger(formData);
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  };

  const isError = !!error;

  return (
    <div className='max-w-md space-y-4'>
      <form action={handleSubmit} className='flex gap-2'>
        <div className='flex-1'>
          <Input
            name='playlist_name'
            placeholder='Playlist name'
            className='w-full'
            required
            minLength={3}
            aria-invalid={isError}
            aria-describedby={isError ? 'playlist_name_error' : undefined}
          />
        </div>
        <Button type='submit' disabled={isMutating} aria-disabled={isMutating}>
          Create
        </Button>
      </form>
      {isError && (
        <InlineNotification
          id='playlist_name_error'
          type='error'
          message={error?.message}
          visible={true}
        />
      )}
      {!!data && (
        <InlineNotification
          id='playlist_name_success'
          type='success'
          message={data.message}
          visible={true}
        />
      )}
    </div>
  );
};
