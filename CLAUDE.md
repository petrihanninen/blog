# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev              # Start dev server on port 4000 (with Turbo)
pnpm build            # Build for production
pnpm check            # Run lint + typecheck (use before committing)
pnpm format:write     # Auto-format code with Prettier
```

## Architecture

This is a personal blog built with Next.js 16 (App Router) and TypeScript. Blog posts are MDX files compiled at build time.

### Making Code Changes

All new code should be committed and pushed to main after getting a green light from me, no need to use PRs here. If I tell you to do something and push to main, it means that you shouldn't ask for confirmation after.

### Content Flow

1. MDX files live in `src/content/` with YAML frontmatter (`title`, `date`, optional `lede`)
2. `getBlogs()` in `src/app/utils.ts` reads all MDX files and compiles them with `next-mdx-remote/rsc`
3. Home page (`src/app/page.tsx`) renders posts sorted by date (newest first)
4. `<Blog>` component (`src/components/Blog/Blog.tsx`) is a client component that handles expand/collapse UI

### Adding a Blog Post

Create `src/content/my-post.mdx`:
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

- All content (ideas, outlines, drafts, published posts) lives in `src/content/` as MDX files
- Drafts have no `date` in frontmatter (they only appear with `?drafts` query param)
- When ready to publish, add `date` to frontmatter
