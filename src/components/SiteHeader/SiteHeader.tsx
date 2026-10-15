import Link from 'next/link';

import { ColorPicker } from '@/components/ColorPicker/ColorPicker';

export const SiteHeader = () => (
  <header className="site-header">
    <h1 className="site-title">
      <Link href="/">Petri Hänninen</Link>
    </h1>
    <p className="site-lede">
      I write code, climb rocks, click heads and am curious about pretty much everything.
    </p>
    <nav className="site-nav">
      <Link href="/about">About</Link>
    </nav>
    <ColorPicker />
  </header>
);
