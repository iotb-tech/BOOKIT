create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text unique,
  role text default 'student',
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- BOOKIT: RESOURCES
-- ============================================

create table public.resources (
  id uuid primary key default gen_random_uuid(),

  name text not null,

  description text,

  owner_id uuid not null
    references auth.users(id)
    on delete cascade,

  created_at timestamptz not null default now()
);


-- ============================================
-- BOOKIT: BOOKINGS
-- ============================================

create table public.bookings (
  id uuid primary key default gen_random_uuid(),

  resource_id uuid not null
    references public.resources(id)
    on delete cascade,

  user_id uuid not null
    references auth.users(id)
    on delete cascade,

  start_time timestamptz not null,

  end_time timestamptz not null,

  status text not null default 'confirmed'
    check (status in ('confirmed', 'cancelled')),

  created_at timestamptz not null default now(),

  -- A booking must have a positive duration
  check (end_time > start_time)
);

alter table public.profiles enable row level security;

alter table public.resources enable row level security;

alter table public.bookings enable row level security;

-- Authenticated users can view resources
create policy "Authenticated users can view resources"
on public.resources
for select
to authenticated
using (true);

create policy "Users can create their own resources"
on public.resources
for insert
to authenticated
with check ((select auth.uid()) = owner_id);

create policy "Owners can update their own resources"
on public.resources
for update
to authenticated
using ((select auth.uid()) = owner_id)
with check ((select auth.uid()) = owner_id);

create policy "Owners can delete their own resources"
on public.resources
for delete
to authenticated
using ((select auth.uid()) = owner_id);


create policy "Users can view their own bookings"
on public.bookings
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can create their own bookings"
on public.bookings
for insert
to authenticated
with check ((select auth.uid()) = user_id);


create policy "Users can update their own bookings"
on public.bookings
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);