import React from 'react';
import {
  BadgeInfoIcon,
  OctagonAlertIcon,
  LucideCircleCheck,
} from 'lucide-react';
import { Alert, AlertTitle } from '@/ui/alert';

export const InlineNotification: React.FC<
  {
    type: 'error' | 'success' | 'info';
    message: string;
    visible: boolean;
    className?: string;
  } & React.ComponentProps<'div'>
> = ({ type, message, visible, className, ...rest }) => {
  if (!visible) {
    return null;
  }

  if (type === 'error') {
    return (
      <Alert variant='destructive' className={className} {...rest}>
        <OctagonAlertIcon />
        <AlertTitle>{message}</AlertTitle>
      </Alert>
    );
  }

  if (type === 'success') {
    return (
      <Alert variant='success' className={className} {...rest}>
        <LucideCircleCheck />
        <AlertTitle>{message}</AlertTitle>
      </Alert>
    );
  }

  return (
    <Alert variant='default' className={className} {...rest}>
      <BadgeInfoIcon />
      <AlertTitle>{message}</AlertTitle>
    </Alert>
  );
};
