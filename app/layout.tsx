import { Toaster } from '@/components/ui/sonner';
import AuthContextProvider from '@/context/auth-context';
import QueryClientProvider from '@/context/tanstack-query';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
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
  title: 'Hubsport CRM Playground',
  description: 'App for testing Hubspot CRM',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthContextProvider>
          <Toaster />
          <QueryClientProvider>{children}</QueryClientProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
