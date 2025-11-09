import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/ui/utils';

const ImageBox: React.FC<
  React.PropsWithChildren<{
    name: string;
    appId: string;
    className?: string;
  }>
> = ({ children, appId, name, className }) => (
  <Link
    href={`https://store.steampowered.com/app/${appId}`}
    target='_blank'
    className={cn(
      'relative rounded-xs overflow-hidden ring-1 ring-border bg-muted flex items-center justify-center hover:ring-ring transition-colors',
      className
    )}
  >
    <span className='absolute z-0 content-center text-center h-full w-full text-xs text-muted-foreground'>
      {name}
    </span>
    {children}
  </Link>
);

export const GameThumb: React.FC<{
  steamAppId: string;
  name: string;
  image?: string;
  width: number;
  height: number;
  className?: string;
}> = ({ steamAppId, name, image, width, height, className }) => {
  className = cn(`aspect-[${width}/${height}]`, className);

  if (!image) {
    return <ImageBox name={name} appId={steamAppId} className={className} />;
  }

  return (
    <ImageBox name={name} appId={steamAppId} className={className}>
      <Image
        src={image}
        alt={name}
        title={name}
        width={width}
        height={height}
        className={`z-10 object-cover`}
      />
    </ImageBox>
  );
};
