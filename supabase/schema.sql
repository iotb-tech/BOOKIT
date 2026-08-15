create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text unique,
  role text default 'student',
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);