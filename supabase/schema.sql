-- BookIt schema: run in the Supabase SQL editor for a fresh project.
create extension if not exists btree_gist;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  role text not null default 'student',
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.resources (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  owner_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  type text check (type in ('Mentor', 'Study Group')),
  skills text[] not null default '{}',
  duration_minutes integer check (duration_minutes is null or duration_minutes > 0),
  status text not null default 'available' check (status in ('available', 'unavailable', 'maintenance'))
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  resource_id uuid not null references public.resources(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  start_time timestamptz not null,
  end_time timestamptz not null,
  status text not null default 'confirmed' check (status in ('confirmed', 'cancelled')),
  created_at timestamptz not null default now(),
  check (end_time > start_time)
);

create index if not exists bookings_user_start_idx on public.bookings (user_id, start_time);
create index if not exists bookings_resource_start_idx on public.bookings (resource_id, start_time);
create index if not exists resources_owner_idx on public.resources (owner_id);

-- A half-open range allows back-to-back sessions (10:00-11:00 and 11:00-12:00)
-- while rejecting any true overlap for confirmed bookings, even under concurrency.
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'bookings_no_confirmed_overlap'
  ) then
    alter table public.bookings
      add constraint bookings_no_confirmed_overlap
      exclude using gist (
        resource_id with =,
        tstzrange(start_time, end_time, '[)') with &&
      ) where (status = 'confirmed');
  end if;
end $$;

alter table public.profiles enable row level security;
alter table public.resources enable row level security;
alter table public.bookings enable row level security;

-- Recreate policies safely.
drop policy if exists "Users can view their own profile" on public.profiles;
create policy "Users can view their own profile" on public.profiles for select to authenticated using ((select auth.uid()) = id);
drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile" on public.profiles for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

drop policy if exists "Authenticated users can view resources" on public.resources;
create policy "Authenticated users can view resources" on public.resources for select to authenticated using (true);
drop policy if exists "Users can create their own resources" on public.resources;
create policy "Users can create their own resources" on public.resources for insert to authenticated with check ((select auth.uid()) = owner_id);
drop policy if exists "Owners can update their own resources" on public.resources;
create policy "Owners can update their own resources" on public.resources for update to authenticated using ((select auth.uid()) = owner_id) with check ((select auth.uid()) = owner_id);
drop policy if exists "Owners can delete their own resources" on public.resources;
create policy "Owners can delete their own resources" on public.resources for delete to authenticated using ((select auth.uid()) = owner_id);

drop policy if exists "Users can view their own bookings" on public.bookings;
create policy "Users can view their own bookings" on public.bookings for select to authenticated using ((select auth.uid()) = user_id);
drop policy if exists "Users can create their own bookings" on public.bookings;
create policy "Users can create their own bookings" on public.bookings for insert to authenticated with check ((select auth.uid()) = user_id);
drop policy if exists "Users can update their own bookings" on public.bookings;
create policy "Users can update their own bookings" on public.bookings for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, email)
  values (new.id, new.raw_user_meta_data ->> 'full_name', new.email)
  on conflict (id) do update set
    full_name = excluded.full_name,
    email = excluded.email,
    updated_at = now();
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();
