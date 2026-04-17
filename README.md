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

## Deploy

Deployed on Vercel. Set all environment variables in the Vercel project settings before going live.
