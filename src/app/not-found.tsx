import { FrownIcon } from 'lucide-react';
import Link from 'next/link';

export const NotFound = async () => (
  <div className='flex-1 gutter py-8 grid place-items-center'>
    <div className='space-y-4 pb-20 text-center'>
      <div className='text-muted-foreground flex justify-center'>
        <FrownIcon className='h-16 w-16' />
      </div>
      <h1 className='text-2xl font-bold'>404 Not Found</h1>
      <p className='text-muted-foreground'>
        Sorry, we couldn&apos;t find the page you&apos;re looking for.
      </p>
      <p className='text-muted-foreground'>
        Start from the{' '}
        <Link href='/' className='underline text-primary'>
          home page
        </Link>
      </p>
    </div>
  </div>
);

export default NotFound;
