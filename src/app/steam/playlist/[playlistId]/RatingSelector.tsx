'use client';

import React from 'react';
import type { RatingValue } from '@/libs/prisma';
import { RatingIcon } from './RatingIcon';
import { rateGame } from './_actions/rateGame';

export const RatingSelector: React.FC<{
  value: RatingValue;
  gameId: string;
}> = ({ value, gameId }) => {
  const ratings: RatingValue[] = ['YES', 'MAYBE', 'NO'];

  return (
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
          className='focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-ring'
          onClick={() => rateGame(gameId, rating)}
          disabled={value === rating}
        >
          <RatingIcon value={rating} active={value === rating} />
        </button>
      ))}
    </div>
  );
};
