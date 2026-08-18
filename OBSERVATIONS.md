# Repo Audit Observations

**1. Booking data layer status**

- **`src/hooks/useBookings.ts`**: confirmed empty. See [src/hooks/useBookings.ts](src/hooks/useBookings.ts#L1).
- **`src/lib/bookings.ts`**: not found in repository (no file at that path).
- **`src/app/my-bookings/page.tsx`**: placeholder — renders a static "My Bookings" header, no data fetching. See [src/app/my-bookings/page.tsx](src/app/my-bookings/page.tsx#L1-L7).
- **Booking components**: requested components and status:
  - `BookingCard.tsx`: exists but is empty. See [src/components/booking/BookingCard.tsx](src/components/booking/BookingCard.tsx#L1).
  - `BookingListSkeleton.tsx`: not present (file not found).
  - `BookingEmpty.tsx`: not present (file not found).
  - `BookingError.tsx`: not present (file not found).
  - Other booking components present: `AvailableSlot.tsx` (has real content) — [src/components/booking/AvailableSlot.tsx](src/components/booking/AvailableSlot.tsx#L1-L12); `BookingHeader.tsx` (has content) — [src/components/booking/BookingHeader.tsx](src/components/booking/BookingHeader.tsx#L1-L6); `DateSelector.tsx`, `StartTime.tsx`, `EndTime.tsx` all contain real client UI code.
- **Overlap-prevention (double-booking) logic**: Not found in server code or schema. I searched source files and the only mentions are marketing copy (UI) such as [src/components/landing/Features.tsx](src/components/landing/Features.tsx#L17-L19) and [src/components/landing/Hero.tsx](src/components/landing/Hero.tsx#L46-L46). The database schema (see below) does not include exclusion constraints or triggers to prevent overlapping `bookings` intervals.

**2. Resources implementation**

- **`src/app/resources/page.tsx`**: simple placeholder that returns "This is resources" — [src/app/resources/page.tsx](src/app/resources/page.tsx#L1-L3).
- **`src/app/resources/[id]/page.tsx`**: renders `ResourceDetails` component and passes `params.id` — [src/app/resources/[id]/page.tsx](src/app/resources/[id]/page.tsx#L1-L6).
- **Data access pattern**: There are hooks implemented under `src/hooks/` (`useResources.ts` and `useResource.ts`) which call `src/lib/resources.ts` functions; see [src/hooks/useResources.ts](src/hooks/useResources.ts#L1-L12) and [src/hooks/useResource.ts](src/hooks/useResource.ts#L1-L12). `src/lib/resources.ts` exports `getResources` and `getResourceById` — [src/lib/resources.ts](src/lib/resources.ts#L1-L20).
- **Important inconsistency**: Resource UI components import hooks from a non-existent path `@/lib/resources/hooks` (e.g. [src/components/resources/ResourceDetails.tsx](src/components/resources/ResourceDetails.tsx#L1-L4) and [src/components/resources/ResourceList.tsx](src/components/resources/ResourceList.tsx#L1-L6)). There is no `src/lib/resources/hooks` file in the repo; hooks actually live under `src/hooks/`. This will cause runtime import failures unless fixed.
- **Files under `src/components/resources/`** (all present and have content):
  - `ResourceBadge.tsx` (exports `StatusBadge`) — [src/components/resources/ResourceBadge.tsx](src/components/resources/ResourceBadge.tsx#L1-L8)
  - `ResourceCard.tsx` — [src/components/resources/ResourceCard.tsx](src/components/resources/ResourceCard.tsx#L1-L8)
  - `ResourceDetails.tsx` — [src/components/resources/ResourceDetails.tsx](src/components/resources/ResourceDetails.tsx#L1-L8)
  - `ResourceDetailSkeleton.tsx` — [src/components/resources/ResourceDetailSkeleton.tsx](src/components/resources/ResourceDetailSkeleton.tsx#L1-L6)
  - `ResourceEmpty.tsx` — [src/components/resources/ResourceEmpty.tsx](src/components/resources/ResourceEmpty.tsx#L1-L6)
  - `ResourceError.tsx` — [src/components/resources/ResourceError.tsx](src/components/resources/ResourceError.tsx#L1-L6)
  - `ResourceList.tsx` — [src/components/resources/ResourceList.tsx](src/components/resources/ResourceList.tsx#L1-L8)
  - `ResourceListSkeleton.tsx` — [src/components/resources/ResourceListSkeleton.tsx](src/components/resources/ResourceListSkeleton.tsx#L1-L6)

**3. Auth status**

- **`LoginForm.tsx` and `SignupForm.tsx`**: both exist and contain full form implementations that call `src/lib/auth/actions` helpers — see [src/components/auth/LoginForm.tsx](src/components/auth/LoginForm.tsx#L1-L8) and [src/components/auth/SignupForm.tsx](src/components/auth/SignupForm.tsx#L1-L8).
- **`src/lib/supabase/middleware.ts`**: `PUBLIC_PATHS` currently includes `"/login"`, `"/signup"`, and `"/auth"` — [src/lib/supabase/middleware.ts](src/lib/supabase/middleware.ts#L6).
- **`src/middleware.ts`**: middleware delegates to `updateSession` and applies a broad matcher to protect pages (excludes static assets and images) — [src/middleware.ts](src/middleware.ts#L1-L8).

**4. Dashboard status**

- **`src/app/dashboard/page.tsx`**: exists and renders a dashboard. It calls `getCurrentUser()` for the user but uses static/mock data for the stats and upcoming bookings (`mockStats`, `mockUpcomingBookings`) — [src/app/dashboard/page.tsx](src/app/dashboard/page.tsx#L1-L12) and the page markup is mock-driven.

**5. Known bugs to confirm or deny**

- **Navbar merged Tailwind class bug**: Checked `src/components/layout/Navbar.tsx` — the nav `className` is `"flex items-center justify-between p-4 border-b text-white bg-primary-600"` (properly spaced). No merged class like `text-whitebg-primary-600` found in that file — [src/components/layout/Navbar.tsx](src/components/layout/Navbar.tsx#L37).

**6. Supabase schema**

Contents of `supabase/schema.sql` (tables and main columns):

- `public.profiles` (definition starts at line 1): columns include `id uuid primary key references auth.users(id)`, `full_name text`, `email text unique`, `role text default 'student'`, `avatar_url text`, `created_at timestamptz default now()`, `updated_at timestamptz default now()` — see [supabase/schema.sql](supabase/schema.sql#L1-L14).
- `public.resources` (definition starts at line 15): columns include `id uuid primary key default gen_random_uuid()`, `name text not null`, `description text`, `owner_id uuid not null references auth.users(id) on delete cascade`, `created_at timestamptz not null default now()` — see [supabase/schema.sql](supabase/schema.sql#L15-L27).
- `public.bookings` (definition starts at line 34): columns include `id uuid primary key default gen_random_uuid()`, `resource_id uuid not null references public.resources(id) on delete cascade`, `user_id uuid not null references auth.users(id) on delete cascade`, `start_time timestamptz not null`, `end_time timestamptz not null`, `status text not null default 'confirmed' check (status in ('confirmed', 'cancelled'))`, `created_at timestamptz not null default now()`, and a `check (end_time > start_time)` to ensure positive duration — see [supabase/schema.sql](supabase/schema.sql#L34-L56).

Note: there are no exclusion constraints, unique constraints across time ranges, or triggers in this schema that would prevent overlapping bookings.

**7. Git state (verified from repository)**

- Local branches (from `git branch -a`):
  - `feature/dashboard` (current)
  - `feature/login-ui`
  - `main`
  - remote branches under `remotes/origin/` (multiple). See local listing above.
- Ahead/behind relative to `main` (local branches):
  - `feature/dashboard`: 0 behind, 1 ahead
  - `feature/login-ui`: 35 behind, 0 ahead
  - `main`: 0 behind, 0 ahead
    (computed via `git rev-list --left-right --count main...<branch>`)
- Most recent commits on `main` (15) with authors (from `git log`):
  - `4e41ae5` Ismail — Merge pull request #35 from iotb-tech/sofiyat-auth-testing-navigation
  - `9bef82b` Ismail — Merge branch 'main' into sofiyat-auth-testing-navigation
  - `234c2a4` Ismail — Merge pull request #36 from iotb-tech/feature/login-ui
  - `155df24` zariyatucs — feat: edited sign up UI
  - `bf811de` sofiyat34 — feat: complete authentication testing and navigation
  - `eea9200` NetsGit — Merge pull request #34 from iotb-tech/harry/resource-data
  - `94c0a85` NetsGit — Merge branch 'main' into harry/resource-data
  - `6217f7a` NetsGit — feat: add React Query provider
  - `9238e00` NetsGit — Merge pull request #33 from iotb-tech/harry/resource-data
  - `65f693e` NetsGit — feat: align resource model with expanded schema
  - `08be865` Ismail — Merge pull request #32 from iotb-tech/booking-ui
  - `30928b2` Ameer3134 — added the bookin-ui
  - `319b66d` Ifetayo02 — Merge branch 'main' of https://github.com/iotb-tech/BOOKIT
  - `1fc92d0` Ifetayo02 — resource UI updates in progress
  - `43d96b8` Akintobi Abibat Olamide — Merge pull request #31 from iotb-tech/abibat/auth-core

---

## Biggest risks before Demo Day (ranked)

1. **No server-side overlap prevention**: The database schema lacks exclusion constraints or triggers to stop overlapping `bookings`. This directly threatens the core requirement that double-booking must be impossible (see [supabase/schema.sql](supabase/schema.sql#L34-L56)).
2. **Missing bookings data API (`src/lib/bookings.ts`) and empty `useBookings` hook**: there is no `src/lib/bookings.ts` and `src/hooks/useBookings.ts` is empty — the booking data layer is incomplete and client pages/components have no real data plumbing.
3. **Resource hook import mismatch**: resource components import hooks from `@/lib/resources/hooks` which does not exist; this will cause runtime import failures for resource pages/components even though the components themselves are implemented.
4. **Incomplete booking UI components**: key booking components are empty or missing (`BookingCard.tsx` empty; `BookingListSkeleton`, `BookingEmpty`, `BookingError` missing), so the booking UX is not implemented end-to-end.
5. **`/my-bookings` is a placeholder page**: no server-side or client-side data wiring for a user's bookings is present yet.

If you want, I can (a) add a DB-level exclusion constraint or sample stored procedure to prevent overlapping bookings, (b) implement `src/lib/bookings.ts` and hook up `useBookings.ts`, and (c) fix the resource hook import paths — tell me which you'd like prioritized.
