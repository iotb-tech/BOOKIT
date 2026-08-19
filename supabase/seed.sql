-- Optional demo data. Run after at least one user has signed up.
do $$
declare
  owner uuid;
  react_id uuid;
  next_id uuid;
begin
  select id into owner from auth.users order by created_at asc limit 1;
  if owner is null then
    raise notice 'Create a BookIt user first, then rerun seed.sql.';
    return;
  end if;

  insert into public.resources (name, description, owner_id, type, skills, duration_minutes, status)
  select 'React Mentorship', 'Expert in React, Next.js, TypeScript and frontend architecture.', owner, 'Mentor', array['React','Next.js','TypeScript'], 60, 'available'
  where not exists (select 1 from public.resources where name = 'React Mentorship')
  returning id into react_id;

  select id into react_id from public.resources where name = 'React Mentorship' order by created_at limit 1;

  insert into public.resources (name, description, owner_id, type, skills, duration_minutes, status)
  select 'Study Group: Next.js', 'Group for Next.js learners of all levels.', owner, 'Study Group', array['Next.js','React','Projects'], 60, 'available'
  where not exists (select 1 from public.resources where name = 'Study Group: Next.js')
  returning id into next_id;

  select id into next_id from public.resources where name = 'Study Group: Next.js' order by created_at limit 1;

  insert into public.resources (name, description, owner_id, type, skills, duration_minutes, status)
  select * from (values
    ('Career Mentorship', 'Helping fellows with career growth and practical direction.', owner, 'Mentor', array['Career','CV','Interviews'], 60, 'available'),
    ('Database Study Group', 'Peer learning sessions focused on databases and SQL.', owner, 'Study Group', array['Postgres','SQL','Supabase'], 60, 'available'),
    ('UI/UX Mentor', 'Practical product design, interface and usability mentoring.', owner, 'Mentor', array['UI/UX','Design systems','Accessibility'], 60, 'available'),
    ('Python Study Group', 'Collaborative Python problem-solving and project sessions.', owner, 'Study Group', array['Python','Projects','Algorithms'], 60, 'available')
  ) as demo(name, description, owner_id, type, skills, duration_minutes, status)
  where not exists (select 1 from public.resources r where r.name = demo.name);

  -- Give the first demo user a couple of future bookings so the dashboards are populated.
  if react_id is not null then
    insert into public.bookings (resource_id, user_id, start_time, end_time, status)
    select react_id, owner, date_trunc('day', now()) + interval '2 days 10 hours', date_trunc('day', now()) + interval '2 days 11 hours', 'confirmed'
    where not exists (
      select 1 from public.bookings
      where resource_id = react_id and user_id = owner
        and start_time = date_trunc('day', now()) + interval '2 days 10 hours'
    );
  end if;

  if next_id is not null then
    insert into public.bookings (resource_id, user_id, start_time, end_time, status)
    select next_id, owner, date_trunc('day', now()) + interval '4 days 14 hours', date_trunc('day', now()) + interval '4 days 15 hours', 'confirmed'
    where not exists (
      select 1 from public.bookings
      where resource_id = next_id and user_id = owner
        and start_time = date_trunc('day', now()) + interval '4 days 14 hours'
    );
  end if;
end $$;
