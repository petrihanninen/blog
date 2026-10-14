import '@/styles/globals.css';

import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Petri Hänninen',
  description: 'I write code, climb rocks, click heads and am curious about pretty much everything.',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

const restoreColor = `(function(){try{var b=localStorage.getItem('bg'),i=localStorage.getItem('ink');if(/^#[0-9a-f]{6}$/i.test(b)&&(i==='#000'||i==='#fff')){var s=document.documentElement.style;s.setProperty('--bg',b);s.setProperty('--ink',i)}}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: restoreColor }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
