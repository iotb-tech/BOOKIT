// "use client";

// import React from "react";

// export default function MyBookingsPage() {
//   // This page is protected by the authentication middleware.
//   return (
//     <main className="flex min-h-screen items-center justify-center">
//       <h1 className="text-3xl font-bold">
//         My Bookings
//       </h1>
//     </main>
//   );
// }


"use client";

import { useMemo, useState } from "react";
import { useBookings } from "@/hooks/useBookings";
import { BookingCard } from "@/components/booking/BookingCard";
import { BookingListSkeleton } from "@/components/booking/BookingListSkeleton";
import { BookingEmpty } from "@/components/booking/BookingEmpty";
import { BookingError } from "@/components/booking/BookingError";

type Tab = "upcoming" | "past";

export default function MyBookingsPage() {
  const { bookings, isLoading, isError, refetch, cancelBooking, isCancelling } = useBookings();
  const [tab, setTab] = useState<Tab>("upcoming");

  const { upcoming, past } = useMemo(() => {
    const now = new Date();
    const upcoming = bookings.filter(
      (b) => b.status !== "cancelled" && new Date(b.end_time) >= now
    );
    const past = bookings.filter(
      (b) => b.status === "cancelled" || new Date(b.end_time) < now
    );
    return { upcoming, past };
  }, [bookings]);

  const visible = tab === "upcoming" ? upcoming : past;

  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold sm:text-3xl text-white">My Bookings</h1>

      <div className="flex gap-6 border-b border-neutral-200 mt-4 mb-5 text-sm">
        <button
          onClick={() => setTab("upcoming")}
          className={`pb-3 border-b-2 -mb-px ${
            tab === "upcoming"
              ? "border-primary-600 text-primary-600 font-medium"
              : "border-transparent text-neutral-400"
          }`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setTab("past")}
          className={`pb-3 border-b-2 -mb-px ${
            tab === "past"
              ? "border-primary-600 text-primary-600 font-medium"
              : "border-transparent text-neutral-400"
          }`}
        >
          Past
        </button>
      </div>

      {isLoading && <BookingListSkeleton />}
      {isError && <BookingError onRetry={() => refetch()} />}
      {!isLoading && !isError && visible.length === 0 && <BookingEmpty tab={tab} />}
      {!isLoading && !isError && visible.length > 0 && (
        <div className="space-y-3">
          {visible.map((b) => (
            <BookingCard
              key={b.id}
              booking={b}
              onCancel={tab === "upcoming" ? cancelBooking : undefined}
              isCancelling={isCancelling}
            />
          ))}
        </div>
      )}
    </div>
  );
}
