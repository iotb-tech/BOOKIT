-- Safe upgrade for an existing BookIt database.
create extension if not exists btree_gist;

alter table public.resources add column if not exists type text;
alter table public.resources add column if not exists skills text[] not null default '{}';
alter table public.resources add column if not exists duration_minutes integer;
alter table public.resources add column if not exists status text not null default 'available';

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'resources_type_check') then
    alter table public.resources add constraint resources_type_check check (type is null or type in ('Mentor', 'Study Group'));
  end if;
  if not exists (select 1 from pg_constraint where conname = 'resources_status_check') then
    alter table public.resources add constraint resources_status_check check (status in ('available', 'unavailable', 'maintenance'));
  end if;
  if not exists (select 1 from pg_constraint where conname = 'resources_duration_check') then
    alter table public.resources add constraint resources_duration_check check (duration_minutes is null or duration_minutes > 0);
  end if;
  if not exists (select 1 from pg_constraint where conname = 'bookings_no_confirmed_overlap') then
    alter table public.bookings add constraint bookings_no_confirmed_overlap
      exclude using gist (resource_id with =, tstzrange(start_time, end_time, '[)') with &&)
      where (status = 'confirmed');
  end if;
end $$;

create index if not exists bookings_user_start_idx on public.bookings (user_id, start_time);
create index if not exists bookings_resource_start_idx on public.bookings (resource_id, start_time);
create index if not exists resources_owner_idx on public.resources (owner_id);
