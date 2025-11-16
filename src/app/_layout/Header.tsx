import { ClientGuard } from '../_components/ClientGuard';
import { HeaderLogo } from './HeaderLogo';
import { HeaderUser } from './HeaderUser';
import { PushNotifications } from './PushNotifications';

export const Header = async () => {
  return (
    <header className='border-b border-border bg-card'>
      <div className='gutter max-sm:px-0 h-12'>
        <div className='h-full flex items-center justify-between gap-2 sm:gap-4'>
          <HeaderLogo />
          <div className='h-full flex items-center'>
            <ClientGuard>
              <PushNotifications />
            </ClientGuard>
            <HeaderUser />
          </div>
        </div>
      </div>
    </header>
  );
};
