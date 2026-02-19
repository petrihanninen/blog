import { getBlogs } from '@/app/utils';

import styles from './styles.module.css';
import { Blog } from '@/components/Blog/Blog';

export default async function Home({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const showDrafts = 'drafts' in params;
  const blogs = await getBlogs();
  const sortedBlogs = blogs
    .filter(blog => showDrafts || (blog.frontmatter.date && new Date(blog.frontmatter.date) <= new Date()))
    .sort((a, b) => {
      const dateA = a.frontmatter.date ? new Date(a.frontmatter.date) : new Date(0)
      const dateB = b.frontmatter.date ? new Date(b.frontmatter.date) : new Date(0)
      return dateA > dateB ? -1 : 1
    })

  return (
    <main className={styles.main}>
      <h1>
        Petri Hänninen
      </h1>

      <p className={styles.lede}>
        I write code, climb rocks, click heads and am curious about pretty much everything.
      </p>

      {sortedBlogs.map(blog => <Blog slug={blog.slug} key={blog.slug} frontmatter={blog.frontmatter}>{blog.content}</Blog>)}
    </main>
  );
}
