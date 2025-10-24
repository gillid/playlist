'use client';

import { useTransition } from 'react';
import { authClient } from '@/libs/auth/client';
import Image from 'next/image';

export const Steam = () => {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      await authClient.steamSignIn();
    });
  };

  return (
    <button
      type='button'
      className='group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 transition active:scale-95 cursor-pointer mx-auto disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed'
      disabled={isPending}
      onClick={handleClick}
      aria-label='Sign in with Steam'
      title='Sign in with Steam'
    >
      <Image
        src={'/steam_sign_in.png'}
        alt={'Sign In through Steam'}
        height={35}
        width={180}
        className='select-none transition will-change-transform group-hover:brightness-110 group-active:brightness-95 group-hover:contrast-110'
        priority
      />
    </button>
  );
};
