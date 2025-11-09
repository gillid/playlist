'use client';

import React from 'react';
import { motion } from 'motion/react';
import type { RatingsMatrix } from './_functions/getPlaylistRatingsMatrix';
import { GameThumb } from './GameThumb';
import { RatingIcon } from './RatingIcon';
import { RatingSelector } from './RatingSelector';

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
                width={184}
                height={69}
                className='aspect-[184/69] h-[35px] md:h-[46px] lg:h-[69px]'
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
