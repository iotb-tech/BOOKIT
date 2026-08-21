-- =========================================================
-- BOOKIT EXPANDED AVAILABILITY SCHEDULE
-- Mentors:
--   Monday-Friday
--   4 x 60-minute sessions per day
--
-- Study Groups:
--   Monday, Wednesday, Saturday
--   1 x 90-minute study session per day
--
-- Generates approximately 4 weeks of future availability.
-- =========================================================

-- ---------------------------------------------------------
-- SET RESOURCE DURATIONS
-- ---------------------------------------------------------

update public.resources
set duration_minutes =
  case
    when type = 'Mentor' then 60
    when type = 'Study Group' then 90
    else duration_minutes
  end;

-- ---------------------------------------------------------
-- REMOVE UNUSED FUTURE DEMO AVAILABILITY
--
-- Do NOT delete:
-- - booked slots
-- - unavailable slots
-- - slots already referenced by booking history
-- ---------------------------------------------------------

delete from public.resource_availability a
where a.start_time >= now()
  and a.status = 'available'
  and not exists (
    select 1
    from public.bookings b
    where b.availability_id = a.id
  );

-- =========================================================
-- MENTOR AVAILABILITY
-- =========================================================
--
-- Monday-Friday
--
-- 09:00 - 10:00
-- 10:30 - 11:30
-- 13:00 - 14:00
-- 15:00 - 16:00
--
-- Lagos timezone
-- =========================================================

insert into public.resource_availability (
  resource_id,
  start_time,
  end_time,
  status
)
select
  r.id,

  (
    d.day::date +
    s.start_at
  ) at time zone 'Africa/Lagos',

  (
    d.day::date +
    s.start_at +
    interval '1 hour'
  ) at time zone 'Africa/Lagos',

  'available'

from public.resources r

cross join generate_series(
  current_date,
  current_date + interval '27 days',
  interval '1 day'
) as d(day)

cross join (
  values
    (time '09:00'),
    (time '10:30'),
    (time '13:00'),
    (time '15:00')
) as s(start_at)

where r.type = 'Mentor'

  -- Monday-Friday
  and extract(
    isodow from d.day
  ) between 1 and 5

  -- Do not create past slots
  and (
    (
      d.day::date +
      s.start_at
    ) at time zone 'Africa/Lagos'
  ) > now()

on conflict (
  resource_id,
  start_time,
  end_time
)
do nothing;

-- =========================================================
-- STUDY GROUP AVAILABILITY
-- =========================================================
--
-- Monday      17:00 - 18:30
-- Wednesday   17:00 - 18:30
-- Saturday    10:00 - 11:30
--
-- 90-minute sessions give enough time for:
-- - topic review
-- - discussion
-- - practice
-- - questions
-- =========================================================

insert into public.resource_availability (
  resource_id,
  start_time,
  end_time,
  status
)
select
  r.id,

  (
    d.day::date +
    case
      when extract(
        isodow from d.day
      ) = 6
      then time '10:00'

      else time '17:00'
    end
  ) at time zone 'Africa/Lagos',

  (
    d.day::date +
    case
      when extract(
        isodow from d.day
      ) = 6
      then time '10:00'

      else time '17:00'
    end +
    interval '90 minutes'
  ) at time zone 'Africa/Lagos',

  'available'

from public.resources r

cross join generate_series(
  current_date,
  current_date + interval '27 days',
  interval '1 day'
) as d(day)

where r.type = 'Study Group'

  and extract(
    isodow from d.day
  ) in (
    1, -- Monday
    3, -- Wednesday
    6  -- Saturday
  )

  and (
    (
      d.day::date +
      case
        when extract(
          isodow from d.day
        ) = 6
        then time '10:00'

        else time '17:00'
      end
    ) at time zone 'Africa/Lagos'
  ) > now()

on conflict (
  resource_id,
  start_time,
  end_time
)
do nothing;

-- =========================================================
-- REFRESH NEXT AVAILABLE TIME
-- =========================================================

update public.resources r
set next_available_at = (
  select min(
    a.start_time
  )
  from public.resource_availability a
  where a.resource_id = r.id
    and a.status = 'available'
    and a.start_time > now()
);