import fs from 'fs'
import path from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'

import type { Frontmatter } from './types'

const contentDir = path.join(process.cwd(), 'src/content')

const getBlogBySlug = async (slug: string) => {
  const filePath = path.join(contentDir, `${slug}.mdx`)
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { frontmatter, content } = await compileMDX<Frontmatter>({
    source: fileContent,
    options: { parseFrontmatter: true },
  })
  return {
    frontmatter,
    content,
    slug
  }
}

export const getBlogs = async () => {
  const files = fs.readdirSync(contentDir).filter(file => file.endsWith('.mdx'))
  const blogs = await Promise.all(files.map(async file => await getBlogBySlug(path.parse(file).name)))
  return blogs
}

