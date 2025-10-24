import { headers } from 'next/headers';
import Image from 'next/image';
import { authServer } from '@/libs/auth/server';
import { AppIcon } from '@/components/AppIcon';

const HeaderUser = async () => {
  const session = await authServer.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return null;
  }

  const name = session.user.name ?? 'Player';
  const avatar = session.user.image ?? null;
  const initial = name?.charAt(0).toUpperCase() ?? 'P';

  return (
    <button
      type='button'
      aria-haspopup='menu'
      aria-label='Account menu'
      title='Account'
      className='group h-full inline-flex items-center gap-2 border-l border-r border-border bg-muted/40 hover:bg-muted/60 active:bg-muted/70 px-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 transition-colors cursor-pointer select-none min-w-0'
      data-user-trigger
    >
      <span className='max-w-[8rem] sm:max-w-[10rem] md:max-w-[14rem] lg:max-w-[16rem] truncate text-sm font-medium text-muted-foreground'>
        {name}
      </span>
      {avatar ? (
        <Image
          src={avatar}
          alt={name}
          width={28}
          height={28}
          className='h-7 w-7 rounded-full border border-border object-cover group-active:brightness-95'
        />
      ) : (
        <div className='h-7 w-7 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs font-medium border border-border group-active:brightness-95'>
          {initial}
        </div>
      )}
    </button>
  );
};

export const Header = async () => {
  return (
    <header className='border-b border-border bg-card'>
      <div className='container mx-auto pl-4 pr-0 h-12'>
        <div className='h-full flex items-center justify-between gap-2 sm:gap-4'>
          <div className='flex items-center gap-3'>
            <AppIcon light={true} />
            <h1 className='text-xl font-semibold'>Playlist</h1>
          </div>
          <HeaderUser />
        </div>
      </div>
    </header>
  );
};
