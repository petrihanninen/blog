import type { Metadata } from 'next';

import { getPage, getPageSlugs } from '@/app/utils';
import { SiteHeader } from '@/components/SiteHeader/SiteHeader';

type Props = { params: Promise<{ page: string }> };

export const dynamicParams = false;

export const generateStaticParams = () => getPageSlugs().map(page => ({ page }));

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { frontmatter } = await getPage((await params).page);
  return { title: `${frontmatter.title} — Petri Hänninen` };
};

export default async function Page({ params }: Props) {
  const { frontmatter, content } = await getPage((await params).page);

  return (
    <div className="site">
      <SiteHeader />

      <main className="page">
        <h2 className="page-title">{frontmatter.title}</h2>
        <div className="prose">{content}</div>
      </main>

      <footer className="site-footer">
        <span>Petri Hänninen</span>
      </footer>
    </div>
  );
}
