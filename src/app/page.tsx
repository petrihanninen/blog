import { getBlogs } from '@/app/utils';
import { Blog } from '@/components/Blog/Blog';
import { ColorPicker } from '@/components/ColorPicker/ColorPicker';

const formatDate = (date: string | Date) =>
  new Date(date).toISOString().slice(0, 10);

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const showDrafts = 'drafts' in params;
  const blogs = await getBlogs();
  const sortedBlogs = blogs
    .filter(
      blog =>
        showDrafts ||
        (blog.frontmatter.date && new Date(blog.frontmatter.date) <= new Date()),
    )
    .sort((a, b) => {
      const dateA = a.frontmatter.date ? new Date(a.frontmatter.date) : new Date(0);
      const dateB = b.frontmatter.date ? new Date(b.frontmatter.date) : new Date(0);
      return dateA > dateB ? -1 : 1;
    });

  return (
    <div className="site">
      <header className="site-header">
        <h1 className="site-title">Petri Hänninen</h1>
        <p className="site-lede">
          I write code, climb rocks, click heads and am curious about pretty much everything.
        </p>
        <ColorPicker />
      </header>

      <main className="posts">
        {sortedBlogs.map(blog => (
          <Blog
            key={blog.slug}
            slug={blog.slug}
            title={blog.frontmatter.title}
            lede={blog.frontmatter.lede}
            date={blog.frontmatter.date ? formatDate(blog.frontmatter.date) : undefined}
          >
            {blog.content}
          </Blog>
        ))}
      </main>

      <footer className="site-footer">
        <span>Petri Hänninen</span>
        <span>{sortedBlogs.length} posts</span>
      </footer>
    </div>
  );
}
