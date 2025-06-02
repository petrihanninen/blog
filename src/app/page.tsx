import { getBlogs } from '@/app/utils';

import styles from './styles.module.css';
import { Blog } from "@/components/Blog/Blog";

export default async function Home() {
  const blogs = await getBlogs();
  const sortedBlogs = blogs.sort((a, b) => new Date(a.frontmatter.date) > new Date(b.frontmatter.date) ? -1 : 1)

  return (
    <main>
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
