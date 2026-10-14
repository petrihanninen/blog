import '@/styles/globals.css';
import '@/styles/themes/hazard.css';
import '@/styles/themes/poster.css';
import '@/styles/themes/blueprint.css';
import '@/styles/themes/acid.css';
import '@/styles/themes/riso.css';
import '@/styles/themes/concrete.css';

import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Petri Hänninen',
  description: 'I write code, climb rocks, click heads and am curious about pretty much everything.',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
