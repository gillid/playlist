import useSWR from 'swr';
import { getGamesList } from '../../_actions/getGamesList';

export const useGamesList = (searchQuery: string) => {
  const isSearchQueryEnough = searchQuery.length >= 3;

  return useSWR(
    isSearchQueryEnough ? `getGamesList:${searchQuery}` : null,
    () => getGamesList(searchQuery),
    {
      dedupingInterval: 1000 * 60 * 15,
    }
  );
};
