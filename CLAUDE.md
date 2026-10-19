# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Making Code Changes

After you're done with any changes, always rebase, merge and push to main and don't create a PR unless I say otherwise.

## Commands

```bash
pnpm dev              # Start dev server on port 4000 (with Turbo)
pnpm build            # Build for production
pnpm check            # Run lint + typecheck (use before committing)
pnpm format:write     # Auto-format code with Prettier
```

## Architecture

This is a personal blog built with Next.js 16 (App Router) and TypeScript. Blog posts are MDX files compiled at build time.

### Content Flow

1. Blog posts live in `src/content/posts/` with YAML frontmatter (`title`, `date`, optional `lede`)
2. `getBlogs()` in `src/app/utils.ts` reads all post MDX files and compiles them with `next-mdx-remote/rsc`
3. Home page (`src/app/page.tsx`) renders posts sorted by date (newest first)
4. `<Blog>` component (`src/components/Blog/Blog.tsx`) is a client component that handles expand/collapse UI
5. Standalone pages (e.g. About) live in `src/content/pages/` with frontmatter `title` and are served at `/<slug>` by `src/app/[page]/page.tsx`. They are never listed as posts. The header nav links to every page automatically

### Adding a Blog Post

Create `src/content/posts/my-post.mdx`:
```mdx
---
title: Post Title
date: 2025-01-01
lede: Optional short excerpt
---

Content here...
```

### Styling

- One stylesheet, `src/styles/globals.css`, with the whole design driven by two CSS variables: `--bg` and `--ink`
- The color picker in the header sets those variables, stores the choice in localStorage, and picks black or white ink by WCAG contrast (`src/components/ColorPicker/`)
- An inline script in `src/app/layout.tsx` restores the stored color before first paint
- System fonts only, no dark mode

### Deployment

Deployed on Vercel. Push to `main` triggers an automatic deploy to https://blog.petrihanninen.com.

## Writing Blog Posts

### Process

- All posts (ideas, outlines, drafts, published posts) live in `src/content/posts/` as MDX files
- Drafts have no `date` in frontmatter (they only appear with `?drafts` query param)
- When ready to publish, add `date` to frontmatter
