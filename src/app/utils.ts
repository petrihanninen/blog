import fs from 'fs'
import path from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'

import type { Frontmatter, PageFrontmatter } from './types'

const contentDir = path.join(process.cwd(), 'src/content')
const postsDir = path.join(contentDir, 'posts')
const pagesDir = path.join(contentDir, 'pages')

const listSlugs = (dir: string) => {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter(file => file.endsWith('.mdx'))
    .map(file => path.parse(file).name)
}

const compileFile = async <T extends Record<string, unknown>>(dir: string, slug: string) => {
  const source = fs.readFileSync(path.join(dir, `${slug}.mdx`), 'utf-8')
  const { frontmatter, content } = await compileMDX<T>({
    source,
    options: { parseFrontmatter: true },
  })
  return { frontmatter, content, slug }
}

export const getBlogs = () =>
  Promise.all(listSlugs(postsDir).map(slug => compileFile<Frontmatter>(postsDir, slug)))

export const getPageSlugs = () => listSlugs(pagesDir)

export const getPage = (slug: string) => compileFile<PageFrontmatter>(pagesDir, slug)
