import React from 'react';
import type { SteamProfile } from '@/libs/prisma';
import { Avatar } from '@/ui/avatar';

const PARTICIPANTS_TO_SHOW = 5;

export const PlaylistParticipants: React.FC<{
  participants: SteamProfile[];
}> = ({ participants }) => {
  const extraParticipants = Math.max(
    0,
    participants.length - PARTICIPANTS_TO_SHOW
  );

  return (
    <div
      className='flex -space-x-2'
      aria-label={`${participants.length} participants`}
    >
      {participants.slice(0, PARTICIPANTS_TO_SHOW).map((p) => (
        <Avatar
          key={p.id}
          image={p.image}
          title={p.name}
          className='h-6 w-6 ring-1 ring-background'
        />
      ))}

      {extraParticipants > 0 && (
        <Avatar
          key='more-participants'
          text={`+${extraParticipants}`}
          title={`${extraParticipants} more participants`}
          className='h-6 w-6 bg-muted text-foreground ring-1 ring-background'
        />
      )}
    </div>
  );
};
