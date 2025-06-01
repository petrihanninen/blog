import { getBlogs } from './utils';

import styles from './styles.module.css';
import { Blog } from "../components/Blog/Blog";

export default async function Home() {
  const blogs = await getBlogs();

  return (
    <main>
      <h1>
        Petri Hänninen
      </h1>

      <p className={styles.lede}>
        I write code, climb rocks, click heads and am curious about pretty much everything.
      </p>

      {blogs.map(blog => <Blog slug={blog.slug} key={blog.slug} frontmatter={blog.frontmatter}>{blog.content}</Blog>)}
    </main>
  );
}
