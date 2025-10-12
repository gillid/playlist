import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ListMusic } from 'lucide-react';
import './globals.css';

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='dark' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className='border-b border-border bg-card'>
          <div className='container mx-auto px-4 py-4'>
            <div className='flex items-center gap-3'>
              <ListMusic aria-hidden className='h-6 w-6' />
              <h1 className='text-xl font-semibold'>Playlist</h1>
            </div>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
