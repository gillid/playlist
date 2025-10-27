'use client';

import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cn } from '@/ui/utils';

function AvatarRoot({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot='avatar'
      className={cn(
        'relative inline-flex shrink-0 overflow-hidden rounded-full border border-border bg-muted text-muted-foreground',
        className
      )}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot='avatar-image'
      className={cn('h-full w-full object-cover', className)}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot='avatar-fallback'
      className={cn(
        'flex h-full w-full items-center justify-center bg-muted text-xs font-medium text-muted-foreground',
        className
      )}
      {...props}
    />
  );
}

export function Avatar({
  image,
  text,
  title,
  className,
}: (
  | { image: string | null; text?: undefined }
  | { image?: undefined; text: string }
) & {
  title: string;
  className?: string;
}) {
  const fallback = text ?? title.trim().charAt(0).toUpperCase();

  return (
    <AvatarRoot className={cn('select-none', className)} title={title}>
      {image ? <AvatarImage alt={title} src={image} /> : null}
      <AvatarFallback aria-label={title}>{fallback}</AvatarFallback>
    </AvatarRoot>
  );
}
