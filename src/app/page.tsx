import { ListMusic } from 'lucide-react';

export default function Home() {
  return (
    <main className='min-h-screen flex items-center justify-center bg-background text-foreground'>
      <h1 className='flex items-center gap-3 text-3xl font-semibold'>
        <ListMusic aria-hidden className='h-8 w-8' />
        Playlist
      </h1>
    </main>
  );
}
