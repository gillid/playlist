import { steam } from '@/libs/steam';
import { Avatar } from '@/ui/avatar';

export const Game = async ({ steamAppId }: { steamAppId: string }) => {
  const game = await steam.getGameDetails(steamAppId);

  if (!game) {
    return null;
  }

  return (
    <Avatar
      image={game.image}
      title={game.name}
      className='h-10 w-10 ring-1 ring-background'
    />
  );
};
