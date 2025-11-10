import { headers } from 'next/headers';
import { authServer } from '@/libs/auth/server';
import { prisma } from '@/libs/prisma';
import { Avatar } from '@/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu';
import { SignOutButton } from './SignOutButton';

export const HeaderUser = async () => {
  const session = await authServer.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return null;
  }

  const steamProfile = await prisma.steamProfile.findUnique({
    where: { userId: session.user.id },
  });

  const name = steamProfile?.name ?? session.user.name;
  const avatar = steamProfile?.image ?? session.user.image ?? null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
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
          <Avatar image={avatar} title={name} className='h-7 w-7' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' side='bottom' align='end'>
        <SignOutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
