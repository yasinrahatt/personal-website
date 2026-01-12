# Yasin Rahat — Personal Website

A minimalist, blog-style personal website built with Next.js (App Router), TypeScript, and Tailwind CSS. Posts are stored as Markdown files in the `/content` folder with frontmatter.

## File tree

```
.
├── app
│   ├── [category]
│   │   ├── [slug]
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── rss.xml
│   │   └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   ├── page.tsx
│   └── sitemap.ts
├── components
│   ├── CategoryPostList.tsx
│   └── ThemeToggle.tsx
├── content
│   ├── academic
│   ├── founder-story
│   ├── thoughts
│   └── travel
├── lib
│   └── posts.ts
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

## Running locally

```bash
npm install
npm run dev
```

The site will be available at `http://localhost:3000`.

## Adding a new post

1. Add a new Markdown file in the relevant category folder inside `/content`.
2. Include frontmatter at the top of the file:

```md
---
title: "Post title"
date: "YYYY-MM-DD"
summary: "Short summary"
tags:
  - tag-one
  - tag-two
category: "founder-story" # or travel, thoughts, academic
---

Your post content goes here.
```

3. The slug is derived from the filename (e.g., `my-post.md` becomes `/category/my-post`).

## Deploying to Vercel

1. Push the repository to GitHub.
2. Create a new project in Vercel and import the repository.
3. Use the default Next.js build settings:
   - Build Command: `npm run build`
   - Output Directory: `.next`
4. Set your production domain and update `metadataBase` in `app/layout.tsx` if needed.
