# BookIt

BookIt is a scheduling platform for mentor office hours and study-group sessions. It replaces ad-hoc DM scheduling with a shared flow for discovering resources, choosing a time, booking a session, viewing personal bookings, and cancelling when plans change.

## Problem validation

Early project responses showed that fellows often do not know whether a mentor or study partner is available before sending a message. Several respondents described relying on a reply or a prior agreement to know availability, and the team also recorded cases where a chosen time had already been scheduled elsewhere. The validation screenshots supplied by the team remain in `images/`.

The MVP therefore focuses on two outcomes:

- Make availability and booking details visible in one place.
- Prevent two confirmed bookings from occupying overlapping time ranges for the same resource.

## Core routes

- `/` — landing page
- `/login` and `/signup` — email/password plus Google and GitHub OAuth
- `/dashboard` — personal dashboard
- `/dashboard/overview` — weekly overview and recent activity layout
- `/resources` — resource browse/search/filter
- `/resources/[id]` — resource detail and availability
- `/book/[id]` — validated booking flow
- `/my-bookings` — upcoming/past bookings and cancellation
- `/messages`, `/profile`, `/settings` — navigation destinations used by the dashboard sidebar

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS
- Supabase Auth + Postgres
- React Hook Form + Zod
- TanStack Query

## Local setup

```bash
git clone <repository-url>
cd BOOKIT
npm install
cp .env.example .env.local
npm run dev
```

Set these values in `.env.local` from the team's shared Supabase project:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

Do not commit `.env.local`.

## Database upgrade

For a fresh Supabase project, run `supabase/schema.sql` in the SQL editor.

If the existing team database already has the original `resources` and `bookings` tables, run:

`supabase/migrations/20260818_bookit_hardening.sql`

For a polished demo after at least one user has signed up, you can optionally run `supabase/seed.sql` to add the six reference-style resources and two future bookings.

The migration adds the resource UI fields (`type`, `skills`, `duration_minutes`, `status`), indexes, and a database exclusion constraint that rejects overlapping **confirmed** bookings for the same resource. The time range is half-open, so back-to-back sessions such as 10:00–11:00 and 11:00–12:00 remain valid.

## Google and GitHub OAuth

The login and signup screens use the same Supabase OAuth flow for both providers. The UI code is ready, but each provider must also be enabled in the shared Supabase project.

1. Enable **Google** and **GitHub** under Supabase Authentication providers and add each provider's client credentials.
2. In Supabase Auth URL configuration, add your local and deployed callback URLs to the redirect allow list, for example:
   - `http://localhost:3000/**` for local development
   - `https://<your-vercel-domain>/auth/callback` for the production app
3. Configure the provider application itself with the callback URL shown by Supabase for that provider.
4. Restart the local server after changing environment variables.

OAuth redirects back through `src/app/auth/callback/route.ts`, exchanges the PKCE auth code for a session, then sends the user to the requested protected route (dashboard by default).

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
```

Before demo day, test at minimum:


- Signup/login/logout and session persistence
- Google login/signup and GitHub login/signup
- Protected-route redirects
- Resource loading, error, empty, search and filter states
- Valid booking creation
- Exact duplicate and partial overlap rejection
- Back-to-back booking acceptance
- Cancellation and immediate query refresh
- Desktop and mobile layouts
