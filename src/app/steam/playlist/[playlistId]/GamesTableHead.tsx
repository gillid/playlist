import React from 'react';
import { Avatar } from '@/ui/avatar';
import type { RatingsMatrix } from './getPlaylistRatingsMatrix';

export const GamesTableHead: React.FC<{ ratingsMatrix: RatingsMatrix }> = ({
  ratingsMatrix,
}) => {
  return (
    <thead className='sticky top-0 z-10 bg-background'>
      <tr>
        <th className='sticky left-0 z-10 bg-background px-3 py-2 text-left font-medium text-muted-foreground'>
          Game
        </th>
        {ratingsMatrix.participants.map(
          ({ profileId, name, image, isCurrentUser }) => {
            return (
              <th
                key={profileId}
                className={`px-3 py-2 font-medium ${isCurrentUser ? 'text-primary' : 'text-muted-foreground'}`}
                title={name}
              >
                <div className='mx-auto flex items-center justify-center gap-2 lg:w-20'>
                  <Avatar
                    image={image}
                    title={name}
                    className={`h-6 w-6 ring-1 ${isCurrentUser ? 'ring-ring' : 'ring-border'}`}
                  />
                  <span className='truncate hidden lg:block max-w-[12rem]'>
                    {name}
                  </span>
                </div>
              </th>
            );
          }
        )}
      </tr>
    </thead>
  );
};
