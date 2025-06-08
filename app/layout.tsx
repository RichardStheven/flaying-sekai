import { type Metadata } from 'next';
import {
  ClerkProvider,
  SignedIn,
  UserButton,
} from '@clerk/nextjs';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

import { PlayerProvider } from '@/components/game/logic/PlayerContext'; // CONTEXTO DO JOGO

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Classificados Sekai',
  description: 'A caçada mais divertida da internet',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen overflow-hidden`}>
          <SignedIn>
            <div className="absolute top-4 right-4 z-50">
              <UserButton />
            </div>
          </SignedIn>
          <PlayerProvider>{children}</PlayerProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
