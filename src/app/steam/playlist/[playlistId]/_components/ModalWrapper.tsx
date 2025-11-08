import React from 'react';
import { cn } from '@/ui/utils';
import { Dialog, DialogContent } from '@/ui/dialog';

export const ModalWrapper: React.FC<
  React.PropsWithChildren<{
    open: boolean;
    onOpenChange: (open: boolean) => void;
  }>
> = ({ children, open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          'flex flex-col',
          'w-full sm:w-lg max-w-none sm:max-w-none',
          'h-[100vh] sm:h-[80vh] lg:h-[60vh]'
        )}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
};
