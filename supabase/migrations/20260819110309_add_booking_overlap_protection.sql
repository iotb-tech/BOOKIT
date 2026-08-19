-- ============================================
-- BOOKIT: BOOKING OVERLAP PROTECTION
-- ============================================

-- Required for the equality operator on uuid
-- to work with the GiST exclusion constraint.
create extension if not exists btree_gist;

-- Prevent overlapping confirmed bookings
-- for the same resource.
alter table public.bookings
add constraint bookings_no_overlap
exclude using gist (
  resource_id with =,
  tstzrange(start_time, end_time, '[)') with &&
)
where (status = 'confirmed');