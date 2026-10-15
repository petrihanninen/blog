import Link from 'next/link';

import { getPageSlugs } from '@/app/utils';
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
      <Link href="/">Home</Link>
      {getPageSlugs().map(slug => (
        <Link key={slug} href={`/${slug}`}>
          {slug.replaceAll('-', ' ')}
        </Link>
      ))}
    </nav>
    <ColorPicker />
  </header>
);
