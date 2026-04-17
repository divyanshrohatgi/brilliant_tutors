# Brilliant Tutors Academy

Website for Brilliant Tutors Academy — a tutoring business based in Reading, Berkshire specialising in 11+ and GCSE preparation.

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Clerk (auth) · Stripe (payments) · Prisma + Neon (database) · Resend (email)

## Getting started

```bash
npm install
npm run dev
```

Copy `.env.local` and fill in the required keys before running.

## Database

```bash
npx prisma migrate dev   # apply migrations
npm run db:seed          # seed promo codes
npm run db:studio        # open Prisma Studio
```

## Local webhook testing

Stripe webhooks require a public URL. Use [ngrok](https://ngrok.com) to tunnel your local server.

```bash
ngrok http 3000
```

Copy the forwarding URL (e.g. `https://abc123.ngrok-free.dev`) and:

1. Go to Stripe Dashboard → Developers → Webhooks → Add destination
2. Set the endpoint URL to `https://<your-ngrok-url>/api/webhooks/stripe`
3. Subscribe to the `checkout.session.completed` event
4. Copy the signing secret and set `STRIPE_WEBHOOK_SECRET` in `.env.local`
5. Restart the dev server

The ngrok free plan generates a new URL each session — update the Stripe endpoint URL whenever you restart ngrok.

## Adding blog posts (MDX)

Blog posts live in `content/posts/`. Each post is a `.mdx` file with a frontmatter block at the top.

**1. Create the file:**
```
content/posts/your-post-slug.mdx
```
Use a descriptive kebab-case filename — it becomes the post URL (`/blog/your-post-slug`). Target keywords where possible, e.g. `how-to-pass-kendrick-11-plus.mdx`.

**2. Add frontmatter at the top:**
```yaml
---
title: "Your Post Title"
description: "150-160 character meta description for SEO. Make it specific and include target keywords."
date: "2026-05-01"
author: "Brilliant Tutors Academy"
category: "11+ Tips"
tags: ["11+", "Year 5", "Kendrick", "Reading School"]
cover: "https://res.cloudinary.com/dn9zmy2gk/image/upload/f_auto,q_auto/brilliant-tutors/your-image"
readTime: "5 min read"
---
```

Available categories: `11+ Tips`, `GCSE`, `Exam Prep`, `Study Habits`, `Parent Advice`

**3. Write the content in Markdown below the frontmatter:**
```markdown
Intro paragraph here.

## Section heading

Content...

## Another section

More content. Link to relevant pages like [Year 5 programme](/courses/year-5).
```

- Use `##` for main sections (these appear in the sidebar table of contents)
- Use `###` for subsections
- Link to relevant course/product pages from within the post to help SEO
- External links open in a new tab automatically

**4. Upload a cover image first** (see Adding images section below), then paste the Cloudinary URL into the `cover` field.

The post appears on `/blog` immediately — no code changes needed.

## Adding images (Cloudinary)

All images are hosted on Cloudinary. To upload new images for blog posts, shop products, or any other content:

**1. Name your file clearly** — the filename becomes the Cloudinary public ID and can't be renamed after upload.
Good: `mock-exam-june-2026.jpg`, `blog-gcse-tips.avif`

**2. Drop the file into `images/`** (project root, not `public/`)

**3. Run the upload script:**
```bash
node scripts/upload-images.mjs images/
```

It prints the Cloudinary URL for each uploaded file:
```
✓ blog-gcse-tips.avif
  → https://res.cloudinary.com/dn9zmy2gk/image/upload/f_auto,q_auto/brilliant-tutors/blog-gcse-tips
```

**4. Use the URL in your content:**

For blog posts (MDX frontmatter):
```yaml
cover: "https://res.cloudinary.com/dn9zmy2gk/image/upload/f_auto,q_auto/brilliant-tutors/blog-gcse-tips"
```

For shop products — paste the URL into the `imageUrl` field in Prisma Studio (`npm run db:studio`) or the seed file.

**Upload a subfolder only:**
```bash
node scripts/upload-images.mjs images/blog/
```

Cloudinary credentials are stored in `.env.local` under `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`.

## Deploy

Deployed on Vercel. Set all environment variables in the Vercel project settings before going live.
