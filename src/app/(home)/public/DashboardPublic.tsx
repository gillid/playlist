import { Steam } from './Steam';

export const DashboardPublic = () => {
  return (
    <div className='flex-1 container mx-auto px-4 grid place-items-center'>
      <div className='space-y-8 pb-20 text-center'>
        <h1 className='text-3xl font-semibold tracking-tight'>Login with:</h1>

        <div>
          <Steam />
        </div>
      </div>
    </div>
  );
};
