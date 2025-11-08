'use client';

import React, { useRef } from 'react';
import useSWRMutation from 'swr/mutation';
import type { RatingValue } from '@/libs/prisma';
import { cn } from '@/ui/utils';
import { RatingIcon } from './RatingIcon';
import { rateGame } from './_actions/rateGame';

export const RatingSelector: React.FC<{
  value: RatingValue;
  gameId: string;
}> = ({ value, gameId }) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetWithDelay = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      reset();
    }, 5000);
  };

  const { trigger, error, isMutating, reset } = useSWRMutation(
    'rateGame',
    rateGame,
    {
      onSuccess: () => {
        resetWithDelay();
      },
      onError: () => {
        resetWithDelay();
      },
    }
  );

  const handleOnClick = async (rating: RatingValue) => {
    await trigger({ rating, gameId });
  };

  const ratings: RatingValue[] = ['YES', 'MAYBE', 'NO'];

  return (
    <>
      <div
        role='group'
        aria-label='Your rating'
        className='flex justify-center gap-2'
      >
        {ratings.map((rating) => (
          <button
            key={rating}
            type='button'
            aria-pressed={value === rating}
            className={cn(
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-ring'
            )}
            onClick={() => handleOnClick(rating)}
            disabled={value === rating || isMutating}
          >
            <RatingIcon value={rating} active={value === rating} />
          </button>
        ))}
      </div>
      {!!error && (
        <div className='mt-2 text-sm text-destructive'>{error?.message}</div>
      )}
    </>
  );
};
