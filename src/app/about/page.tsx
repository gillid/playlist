import React from 'react';
import Link from 'next/link';

export default async function About() {
  return (
    <div className='gutter py-8 space-y-2'>
      <h1 className='text-xl font-bold'>About this app</h1>

      <p>
        This app allows creating &#34;playlists&#34; - lists of Steam games,
        which can be shared with friends and rated.
      </p>

      <h2 className='text-lg font-semibold mt-4'>Tech stack:</h2>

      <ul className='list-disc pl-5'>
        <li>Next.js</li>
        <li>Tailwind CSS + shadcn/ui + lucide-react + motion</li>
        <li>Prisma (PostgreSQL)</li>
        <li>better-auth</li>
        <li>Steam API</li>
      </ul>

      <p>
        More info -{' '}
        <Link
          href='https://github.com/gillid/playlist'
          className='text-muted-foreground hover:underline'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='GitHub repository'
          title='GitHub repository'
        >
          https://github.com/gillid/playlist
        </Link>
      </p>

      <h2 className='text-lg font-semibold mt-4'>Privacy</h2>

      <p>
        Steam API provides only publicly available player profile data, for
        example, nickname, avatar, friendlist, and other things that can be
        accessed via your steam page according to your privacy settings. This
        never includes personal data like email, phone number, and so on. This
        app neither stores nor even has access to your private information.
      </p>
    </div>
  );
}
