import { HeaderLogo } from './HeaderLogo';
import { HeaderUser } from './HeaderUser';

export const Header = async () => {
  return (
    <header className='border-b border-border bg-card'>
      <div className='gutter max-sm:px-0 h-12'>
        <div className='h-full flex items-center justify-between gap-2 sm:gap-4'>
          <HeaderLogo />
          <HeaderUser />
        </div>
      </div>
    </header>
  );
};
