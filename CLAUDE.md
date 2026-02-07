# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A personal blog built with Next.js 16 and React 19, featuring an editorial minimalist design. Uses static site generation (SSG) with Markdown-based content.

## Common Commands

```bash
# Development server
npm run dev

# Build static site (outputs to dist/)
npm run build

# Run ESLint
npm run lint
```

## Architecture

### Static Site Generation

The project uses Next.js static export (`output: "export"`) with all pages pre-rendered at build time:

- **Dynamic routes** (`[slug]`, `[tag]`) use `generateStaticParams()` to define all paths at build time
- **Build output** goes to `dist/` directory
- **Images** are unoptimized (`images: { unoptimized: true }`) for static export compatibility

### Content Management

Blog posts are stored as Markdown files in `content/posts/`:

```markdown
---
title: "文章标题"
date: "2025-02-07"
excerpt: "文章摘要"
tags: ["标签1", "标签2"]
---

正文内容...
```

Content processing pipeline (`lib/posts.ts`):
1. `gray-matter` parses frontmatter
2. `remark` with `remark-gfm` processes Markdown (GitHub Flavored Markdown supported)
3. `remark-html` converts to HTML
4. Reading time is calculated (200 words/minute)

### Design System

Editorial minimalist design defined in `app/globals.css`:

- **Background**: Warm paper `#FDFBF7` (dark: `#1a1a1a`)
- **Accent**: Ochre brown `#8B4513` (dark: `#A0522D`)
- **Typography**: Noto Serif SC / Noto Serif for body text
- **Texture**: Subtle paper grain overlay (2.5% opacity noise)
- **Prose styles**: `.prose` class provides article typography

### Component Patterns

- Server components by default
- Client components marked with `"use client"` (ThemeToggle, etc.)
- `cn()` utility from `lib/utils.ts` for conditional class merging
- Tailwind CSS v4 with CSS-based configuration

### Key Files

- `lib/posts.ts` - Post fetching and Markdown processing
- `app/globals.css` - Design system and prose styles
- `app/layout.tsx` - Root layout with metadata
- `app/template.tsx` - Page template wrapping all pages with Header/Footer
- `app/rss.xml/route.ts` - RSS feed generation
