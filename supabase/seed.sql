-- Run this AFTER creating at least one user through /signup.
-- It uses the first auth user as the demo resource owner.

do $$
declare
  v_owner uuid;
begin
  select id into v_owner
  from auth.users
  order by created_at
  limit 1;

  if v_owner is null then
    raise exception 'Create a BookIt user first, then run seed.sql again.';
  end if;

  insert into public.resources
    (name, description, owner_id, type, skills, duration_minutes)
  select
    'Jane Smith',
    'I help fellows build real-world React, Next.js and frontend projects.',
    v_owner,
    'mentor',
    array['React','Next.js','TypeScript','Tailwind CSS'],
    60
  where not exists (
    select 1 from public.resources where name = 'Jane Smith'
  );

  insert into public.resources
    (name, description, owner_id, type, skills, duration_minutes)
  select
    'Study Group: Next.js',
    'Peer study group for Next.js learners of all levels.',
    v_owner,
    'study_group',
    array['Next.js','App Router','Supabase'],
    60
  where not exists (
    select 1 from public.resources where name = 'Study Group: Next.js'
  );

  insert into public.resources
    (name, description, owner_id, type, skills, duration_minutes)
  select
    'Alex Johnson',
    'Career mentorship focused on CVs, interviews and professional growth.',
    v_owner,
    'mentor',
    array['Career','CV','Interview'],
    60
  where not exists (
    select 1 from public.resources where name = 'Alex Johnson'
  );
end $$;