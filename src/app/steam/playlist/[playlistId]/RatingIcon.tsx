import React from 'react';
import {
  ThumbsUpIcon,
  MinusIcon,
  ThumbsDownIcon,
  LoaderIcon,
} from 'lucide-react';
import type { RatingValue } from '@/libs/prisma';

const base =
  'py-1 px-2 inline-flex rounded border border-transparent transition-colors';

export const RatingIcon: React.FC<{
  value: RatingValue;
  active?: boolean;
  size?: number;
}> = ({ value, active = true, size = 4 }) => {
  const sizeClass = `w-${size} h-${size}`;

  switch (value) {
    case 'YES':
      return (
        <span
          title={value}
          className={[
            base,
            active
              ? 'bg-emerald-600/20 text-emerald-400 ring-1 ring-emerald-600/40'
              : 'bg-muted text-muted-foreground hover:bg-muted/80',
          ].join(' ')}
        >
          <ThumbsUpIcon className={sizeClass} />
        </span>
      );

    case 'MAYBE':
      return (
        <span
          title={value}
          className={[
            base,
            active
              ? 'bg-amber-600/20 text-amber-400 ring-1 ring-amber-600/40'
              : 'bg-muted text-muted-foreground hover:bg-muted/80',
          ].join(' ')}
        >
          <MinusIcon className={sizeClass} />
        </span>
      );

    case 'PENDING':
      return (
        <span
          title={value}
          className={[
            base,
            'bg-muted text-muted-foreground',
          ].join(' ')}
        >
          <LoaderIcon className={sizeClass} />
        </span>
      );

    case 'NO':
      return (
        <span
          title={value}
          className={[
            base,
            active
              ? 'bg-rose-600/20 text-rose-400 ring-1 ring-rose-600/40'
              : 'bg-muted text-muted-foreground hover:bg-muted/80',
          ].join(' ')}
        >
          <ThumbsDownIcon className={sizeClass} />
        </span>
      );
  }
};
