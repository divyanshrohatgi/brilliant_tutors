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

## Deploy

Deployed on Vercel. Set all environment variables in the Vercel project settings before going live.
