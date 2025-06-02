import '@/styles/globals.css';

import { type Metadata } from 'next';
import { Atkinson_Hyperlegible } from 'next/font/google';

export const metadata: Metadata = {
  title: 'p11n',
  description: 'My home in the internets',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

const geist = Atkinson_Hyperlegible({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={geist.className}>{children}</body>
    </html>
  );
}
