import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { Header } from './Header';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Playlist',
  description: 'What do you play next?',
};

export const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang='en' className='dark' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-dvh flex flex-col`}
      >
        <Header />
        <main className='flex-1 flex flex-col bg-background text-foreground'>
          {children}
        </main>
        <footer className='flex-shrink-0 bg-gradient-to-b from-background to-gray-950 text-foreground text-center py-2'>
          <Link
            href='/about'
            prefetch={false}
            className='text-sm text-muted-foreground hover:underline'
          >
            About
          </Link>
        </footer>
      </body>
    </html>
  );
};
