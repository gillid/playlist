'use client';

import React from 'react';
import { LogOutIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/libs/auth/client';
import { DropdownMenuItem, DropdownMenuShortcut } from '@/ui/dropdown-menu';

export const SignOutButton: React.FC = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.refresh();
        },
      },
    });
  };

  return (
    <DropdownMenuItem onClick={handleSignOut} className='cursor-pointer'>
      Log Out
      <DropdownMenuShortcut>
        <LogOutIcon />
      </DropdownMenuShortcut>
    </DropdownMenuItem>
  );
};
