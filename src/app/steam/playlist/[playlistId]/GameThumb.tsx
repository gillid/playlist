import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ImageBox: React.FC<
  React.PropsWithChildren<{ name: string; appId: string }>
> = ({ children, appId, name }) => (
  <Link
    href={`https://store.steampowered.com/app/${appId}`}
    target='_blank'
    className='relative h-[35px] md:h-[46px] lg:h-[69px] w-[92px] md:w-[123px] lg:w-[184px] rounded-xs overflow-hidden ring-1 ring-border bg-muted flex items-center justify-center hover:ring-ring transition-colors'
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
}> = ({ steamAppId, name, image }) => {
  if (!image) {
    return <ImageBox name={name} appId={steamAppId} />;
  }

  return (
    <ImageBox name={name} appId={steamAppId}>
      <Image
        src={image}
        width={184}
        height={69}
        alt={name}
        title={name}
        className={`z-10 object-cover`}
      />
    </ImageBox>
  );
};
