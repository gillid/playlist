import React from 'react';
import { DialogDescription, DialogHeader, DialogTitle } from '@/ui/dialog';

export const ModalHeader: React.FC<{ title: string; description: string }> = ({
  title,
  description,
}) => (
  <DialogHeader>
    <DialogTitle>{title}</DialogTitle>
    <DialogDescription>{description}</DialogDescription>
  </DialogHeader>
);
