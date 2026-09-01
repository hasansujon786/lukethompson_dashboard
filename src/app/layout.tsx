import type { Metadata } from 'next';
import { Providers } from './providers';
import './globals.css';
import { Arimo } from 'next/font/google';
import { cn } from '@/lib/utils';

const arimo = Arimo({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-arimo',
});

export const metadata: Metadata = {
  title: 'GetDockPay - Admin Dashboard',
  description: 'Secure admin dashboard for GetDockPay',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn('font-arimo', arimo.variable)}>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
