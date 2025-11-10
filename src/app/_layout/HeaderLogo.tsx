'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AppIcon } from '@/ui/AppIcon';

export const HeaderLogo: React.FC = () => {
  const pathname = usePathname();
  const isHomepage = pathname === '/';

  const logo = (
    <div className='flex items-center gap-3 pl-4 sm:pl-0 select-none'>
      <AppIcon light={true} />
      <span className='text-xl font-semibold'>Playlist</span>
    </div>
  );

  if (isHomepage) {
    return logo;
  }

  return <Link href='/'>{logo}</Link>;
};
