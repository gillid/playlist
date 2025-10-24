import { Steam } from './Steam';

export const DashboardPublic = () => {
  return (
    <div className='container space-y-8 px-4 pb-20'>
      <div className='text-center space-y-2'>
        <h1 className='text-3xl font-semibold tracking-tight'>Login with:</h1>
      </div>

      <div className='space-y-4 text-center'>
        <Steam />
      </div>
    </div>
  );
};
