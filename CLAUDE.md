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

- CSS custom properties in `src/styles/globals.css`
- CSS Modules for component styles
- Dark mode via `prefers-color-scheme: dark`
- Font: Atkinson Hyperlegible

### Deployment

Push to `main` triggers GitHub Actions to build and push Docker image to `ghcr.io/petrihanninen/blog:latest`.

## Writing Blog Posts

### Process

- All content (ideas, outlines, drafts, published posts) lives in `src/content/` as MDX files
- Drafts have no `date` in frontmatter (they only appear with `?drafts` query param)
- When ready to publish, add `date` to frontmatter

### Tone of Voice

- Direct and opinionated—take a clear stance
- Conversational but not fluffy; no filler or corporate speak
- Personal perspective using "I" and "you"
- Profanity is fine when it adds punch ("shitty UI", "garbage")
- Challenge conventional thinking; don't just validate common beliefs
- Practical and actionable—give readers something concrete
- No excessive hedging or disclaimers
