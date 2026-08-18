"use client";
import { Suspense, useState, useMemo } from "react";
import { useBookings } from "@/hooks/useBookings";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Search, CalendarCheck2 } from "lucide-react";
import BookingCard from "@/components/booking/BookingCard";
// import PageBadge from '@/components/ui/PageBadge'
function MyBookingsContent() {
  const { data: bookings = [], isLoading, isError, refetch } = useBookings();

  const searchParams = useSearchParams();
  type Tab = "upcoming" | "past";
  const created = searchParams.get("created") === "1";

  const [tab, setTab] = useState<Tab>("upcoming");

  const [now] = useState(() => Date.now());

  const { upcoming, past } = useMemo(() => {
    const upcomingBookings = bookings
      .filter(
        (booking) =>
          booking.status === "confirmed" &&
          new Date(booking.end_time).getTime() >= now
      )
      .sort(
        (a, b) =>
          new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
      );

    const pastBookings = bookings
      .filter(
        (booking) =>
          booking.status === "cancelled" ||
          new Date(booking.end_time).getTime() < now
      )
      .sort(
        (a, b) =>
          new Date(b.start_time).getTime() - new Date(a.start_time).getTime()
      );

    return {
      upcoming: upcomingBookings,
      past: pastBookings,
    };
  }, [bookings, now]);

  const visible = tab === "upcoming" ? upcoming : past;

  return (
    <main className="min-h-screen bg-[#fbfbfd] px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-7xl">
        {/* back link */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-primary-700"
        >
          <ArrowLeft />
          Back to dashborad
        </Link>
        {/* Header */}
        <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          {/* left */}
          <div>
            {/* <PageBadge /> */}
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-800">
              {" "}
              Manage your sessions
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              View and managee your upcoming and previous sessions
            </p>
          </div>
          {/* right */}
          <Link
            href={"/resources"}
            className="inline-flex w-fit items-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700 sm:mt-1"
          >
            <Search size={16} />
            Find a session
          </Link>
        </div>

        {/* Booking created */}
        {created && (
          <div
            role="status"
            className="mt-6 rounded-lg border border-green-100 bg-green-50 px-4 py-3 text-sm font-medium text-green-700"
          >
            {" "}
            Booking confirmed. Your session is now listed under Upcoming.
          </div>
        )}
        {/* tabs */}
        <div className="mt-8 border-b border-slate-200">
          <div className="flex gap-8">
            <button
              type="button"
              onClick={() => setTab("upcoming")}
              className={`border-b-2 pb-3 text-sm font-semibold transition ${
                tab === "upcoming"
                  ? "border-primary-600 text-primary-700"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              Upcoming ({upcoming.length})
            </button>

            <button
              type="button"
              onClick={() => setTab("past")}
              className={`border-b-2 pb-3 text-sm font-semibold transition ${
                tab === "past"
                  ? "border-primary-600 text-primary-700"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              Past ({past.length})
            </button>
          </div>
        </div>
        {/* content */}
        <section className="mt-5">
          {/* loading */}
          {isLoading && (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="h-24 animate-pulse rounded-xl border border-slate-100 bg-white"
                ></div>
              ))}
            </div>
          )}

          {/* error */}
          {isError && (
            <div className="rounded-xl border border-red-100 bg-white px-6 py-14 text-center">
              <p className="text-sm font-medium text-red-600">
                Couldn&apos;t load your bookings.
              </p>

              <button
                type="button"
                onClick={() => refetch()}
                className="mt-3 text-sm font-semibold text-primary-700 transition hover:text-primary-800"
              >
                Try again
              </button>
            </div>
          )}

          {/* empty */}
          {!isLoading && !isError && visible.length === 0 && (
            <div className="rounded-xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                <CalendarCheck2 size={26} />
              </div>

              <p className="mt-4 text-base font-semibold text-slate-700">
                No {tab} bookings
              </p>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                {tab === "upcoming"
                  ? "Browse resources to book your next mentorship or study-group session."
                  : "Your completed and cancelled sessions will appear here."}
              </p>

              {tab === "upcoming" && (
                <Link
                  href="/resources"
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700"
                >
                  <Search size={16} />
                  Browse Resources
                </Link>
              )}
            </div>
          )}

          {/* booking list */}
          {!isLoading && !isError && visible.length > 0 && (
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white px-5">
              {visible.map((booking, index) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  index={index}
                  cancellable={tab === "upcoming"}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function MyBookingsPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#fbfbfd] px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div className="mx-auto max-w-7xl">
            <div className="h-5 w-36 animate-pulse rounded-md bg-slate-200" />

            <div className="mt-6 h-7 w-32 animate-pulse rounded-full bg-slate-200" />

            <div className="mt-4 h-9 w-64 animate-pulse rounded-md bg-slate-200" />

            <div className="mt-3 h-5 w-80 max-w-full animate-pulse rounded-md bg-slate-100" />

            <div className="mt-10 space-y-3">
              {Array.from({
                length: 3,
              }).map((_, index) => (
                <div
                  key={index}
                  className="h-24 animate-pulse rounded-xl border border-slate-100 bg-white"
                />
              ))}
            </div>
          </div>
        </main>
      }
    >
      <MyBookingsContent />
    </Suspense>
  );
}
export default MyBookingsPage;
