import { SteamIcon } from '@/components/SteamIcon';

export default function Home() {
  return (
    <main className='min-h-screen flex items-center justify-center bg-background text-foreground p-4'>
      <div className='w-full max-w-md space-y-8'>
        <div className='text-center space-y-2'>
          <h1 className='text-3xl font-semibold tracking-tight'>Login with</h1>
        </div>

        <div className='space-y-4'>
          <button
            type='button'
            className='w-full flex items-center justify-center gap-3 px-6 py-4 bg-card hover:bg-card/80 border border-border rounded-lg transition-colors text-card-foreground font-medium text-lg'
          >
            <img
              src='/steam_sign_in.png'
              height={35}
              width={180}
              alt='Sign In through Steam'
            />
          </button>
        </div>
      </div>
    </main>
  );
}
