# BookIt

BookIt is a full-stack learning-session booking platform for mentors and study groups.

It helps authenticated users discover learning resources, view real availability, book a specific time slot, manage upcoming and past sessions, and cancel future bookings without back-and-forth scheduling messages.

## Core Features

- Email/password authentication with Supabase
- Google and GitHub OAuth
- Protected authenticated routes
- Dashboard with booking statistics
- Mentor and study-group discovery
- Resource search and filtering
- Dynamic resource detail pages
- Multiple availability slots per resource
- Atomic slot-based booking
- Database-level overlap protection
- My Bookings with Upcoming and Past views
- Booking cancellation with future-slot release
- Responsive authenticated navigation

## Technology Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS
- Supabase Authentication
- Supabase PostgreSQL
- TanStack Query
- React Hook Form
- Zod
- Lucide React
- Git and GitHub

## Project Structure

```text
src/
  app/
  components/
  hooks/
  lib/
  providers/
  schemas/
  types/

supabase/
  schema.sql
  seed.sql
  migrations/