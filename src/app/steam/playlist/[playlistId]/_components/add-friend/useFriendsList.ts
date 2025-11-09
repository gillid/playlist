import useSWR from 'swr';
import getFriendsList from '../../_actions/getFriendsList';

export const useFriendsList = () => {
  return useSWR('getFriendsList', getFriendsList, {
    dedupingInterval: 1000 * 60,
  });
};
