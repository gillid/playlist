'use client';

import React from 'react';
import { motion } from 'motion/react';
import { GameThumb } from './GameThumb';
import { RatingSelector } from './RatingSelector';
import { RatingIcon } from './RatingIcon';
import type { RatingsMatrix } from './getPlaylistRatingsMatrix';

export const GamesTableBody: React.FC<{ ratingsMatrix: RatingsMatrix }> = ({
  ratingsMatrix,
}) => {
  return (
    <tbody>
      {ratingsMatrix.games.map(({ game, ratings }) => {
        return (
          <motion.tr layout key={game.id} className='border-t border-border'>
            <td className='sticky left-0 z-10 bg-background px-3 py-2 align-middle'>
              <GameThumb
                steamAppId={game.steamAppId}
                name={game.name}
                image={game.image}
              />
            </td>

            {ratings.map(({ value, gameId, profileId, isCurrentUser }) => {
              return (
                <td
                  key={`${gameId}_${profileId}`}
                  className='px-3 py-2 align-middle text-center'
                >
                  {isCurrentUser ? (
                    <RatingSelector value={value} gameId={gameId} />
                  ) : (
                    <span className={`inline-flex items-center rounded`}>
                      <RatingIcon value={value} />
                    </span>
                  )}
                </td>
              );
            })}
          </motion.tr>
        );
      })}
    </tbody>
  );
};
