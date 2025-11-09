import { cache } from 'react';
import { logger } from '@/libs/logger';
import type { RatingValue, SteamPlaylistGame } from '@/libs/prisma';
import { steam } from '@/libs/steam';
import { getSteamProfile } from '../../../_functions/getSteamProfile';
import { PlaylistProvider } from '../_providers/PlaylistProvider';
import type { PlaylistWithRelations } from './getPlaylistById';

type Participant = PlaylistWithRelations['participants'][number];
type Game = PlaylistWithRelations['games'][number];
type Counts = { yesCount: number; noCount: number };

export type RatingsMatrix = {
  participants: Array<{
    profileId: string;
    name: string;
    steamId64: string;
    image: string;
    isCurrentUser: boolean;
  }>;
  games: Array<{
    game: SteamPlaylistGame & {
      name: string;
      image?: string;
    };
    ratings: Array<{
      gameId: string;
      profileId: string;
      value: RatingValue;
      isCurrentUser: boolean;
    }>;
  }>;
};

export const getPlaylistRatingsMatrix = cache(
  async (): Promise<RatingsMatrix> => {
    const steamProfile = await getSteamProfile();
    const playlist = PlaylistProvider.get();

    const participants: Map<string, Participant & Counts> = new Map(
      [
        playlist.owner,
        ...playlist.participants,
      ].map((p) => [
        p.id,
        {
          ...p,
          yesCount: 0,
          noCount: 0,
        },
      ])
    );
    const games: Map<string, Game & Counts> = new Map(
      playlist.games.map((g) => [g.id, { ...g, yesCount: 0, noCount: 0 }])
    );

    for (const game of playlist.games) {
      for (const rating of game.ratings) {
        if (rating.value === 'YES') {
          games.get(game.id)!.yesCount++;
          participants.get(rating.profileId)!.yesCount++;
        }

        if (rating.value === 'NO') {
          games.get(game.id)!.noCount++;
          participants.get(rating.profileId)!.noCount++;
        }
      }
    }

    const participantsSorted = [...participants.values()]
      // noCount asc
      .sort((a, b) => a.noCount - b.noCount)
      // yesCount desc
      .sort((a, b) => b.yesCount - a.yesCount)
      // current user first
      .sort((a) => {
        const isCurrentUser = a.id === steamProfile.id;
        return isCurrentUser ? -1 : 1;
      });

    const gamesSorted = [...games.values()]
      // yesCount desc
      .sort((a, b) => b.yesCount - a.yesCount)
      // noCount asc
      .sort((a, b) => a.noCount - b.noCount);

    const matrixParticipants: RatingsMatrix['participants'] =
      participantsSorted.map((p) => ({
        profileId: p.id,
        name: p.name,
        steamId64: p.steamId64,
        image: p.image,
        isCurrentUser: p.id === steamProfile.id,
      }));

    const gamesWithDetails = await Promise.all(
      gamesSorted.map(async (g) => {
        try {
          const details = await steam.getGameDetails(g.steamAppId);
          return {
            ...g,
            name: details?.name ?? `#${g.steamAppId}`,
            image: details?.image,
          };
        } catch (error) {
          logger.error(error);
          return { ...g, name: `#${g.steamAppId}` };
        }
      })
    );

    const matrixGames: RatingsMatrix['games'] = gamesWithDetails.map((g) => ({
      game: g,
      ratings: participantsSorted.map((p) => {
        const rating = g.ratings.find((r) => r.profileId === p.id);

        return {
          gameId: g.id,
          profileId: p.id,
          value: rating?.value ?? 'PENDING',
          isCurrentUser: p.id === steamProfile.id,
        };
      }),
    }));

    return {
      participants: matrixParticipants,
      games: matrixGames,
    };
  }
);
