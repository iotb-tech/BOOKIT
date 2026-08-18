 "use client";

import { useQuery } from "@tanstack/react-query";
import { CalendarDays, Clock3 } from "lucide-react";
import type { Booking } from "@/types/booking";
import { CancelBookingButton } from "./booking-actions";

async function getBookings(): Promise<Booking[]> {
  const response = await fetch("/api/bookings", { cache: "no-store" });
  if (!response.ok) throw new Error("Could not load bookings");
  return response.json();
}

export function MyBookings() {
  const query = useQuery({
    queryKey: ["my-bookings"],
    queryFn: getBookings
  });

  if (query.isLoading) return <div className="py-20 text-center text-slate-500">Loading bookings...</div>;
  if (query.isError) return <div className="py-20 text-center text-red-600">Could not load bookings.</div>;

  const bookings = query.data ?? [];

  return (
    <div className="space-y-4">
      {bookings.length === 0 && (
        <div className="card p-12 text-center">
          <CalendarDays className="mx-auto text-slate-300" size={40} />
          <h2 className="mt-4 font-bold">No bookings yet</h2>
          <p className="mt-2 text-sm text-slate-500">Browse resources and book your first session.</p>
        </div>
      )}

      {bookings.map((booking) => {
        const start = new Date(booking.start_time);
        const end = new Date(booking.end_time);
        const cancelled = booking.status === "cancelled";

        return (
          <article key={booking.id} className={`card flex flex-col gap-5 p-5 md:flex-row md:items-center md:justify-between ${cancelled ? "opacity-60" : ""}`}>
            <div>
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-[#eef0ff]">
                  {booking.resource?.type === "study_group" ? "👥" : "👩🏽‍💻"}
                </div>
                <div>
                  <h3 className="font-bold">{booking.resource?.name ?? "Booking"}</h3>
                  <span className="text-xs text-slate-500">{cancelled ? "Cancelled" : "Confirmed"}</span>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-5 text-sm text-slate-500">
                <span className="flex items-center gap-2"><CalendarDays size={15} />{start.toLocaleDateString()}</span>
                <span className="flex items-center gap-2"><Clock3 size={15} />{start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} – {end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
              </div>
              {booking.note && <p className="mt-3 text-sm text-slate-500">Note: {booking.note}</p>}
            </div>

            {!cancelled && start > new Date() && <CancelBookingButton bookingId={booking.id} />}
          </article>
        );
      })}
    </div>
  );
}