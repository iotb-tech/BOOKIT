 "use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, CalendarDays, Clock3, TrendingUp } from "lucide-react";
import { type Booking } from "@/types/booking";

async function getBookings(): Promise<Booking[]> {
  const response = await fetch("/api/bookings", { cache: "no-store" });
  if (!response.ok) throw new Error("Could not load bookings");
  return response.json();
}

export function DashboardHome({ firstName }: { firstName: string }) {
  const { data: bookings = [] } = useQuery({
    queryKey: ["my-bookings"],
    queryFn: getBookings
  });

  const active = bookings.filter((b) => b.status === "confirmed" && new Date(b.start_time) >= new Date());
  const past = bookings.filter((b) => new Date(b.end_time) < new Date());

  return (
    <div className="container-page py-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm text-slate-500">Here&apos;s what&apos;s happening with your bookings.</p>
          <h1 className="mt-2 text-3xl font-bold text-[#11153f]">Good morning, {firstName}! 👋</h1>
        </div>
        <Link href="/resources" className="btn-primary">Find a Session</Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat title="Upcoming" value={String(active.length)} icon={<CalendarDays />} />
        <Stat title="Past" value={String(past.length)} icon={<Clock3 />} />
        <Stat title="Confirmed" value={String(active.length)} icon={<TrendingUp />} />
        <Stat title="Hours Booked" value={String(Math.round(bookings.length))} icon={<Clock3 />} />
      </div>

      <section className="mt-8 card p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">Upcoming Bookings</h2>
          <Link href="/my-bookings" className="text-sm font-semibold text-[#3940c9]">View all</Link>
        </div>

        <div className="mt-5 divide-y divide-slate-100">
          {active.slice(0, 4).map((booking) => (
            <div key={booking.id} className="flex flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-semibold">{booking.resource?.name ?? "Session"}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {new Date(booking.start_time).toLocaleString()}
                </p>
              </div>
              <span className="w-fit rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">Confirmed</span>
            </div>
          ))}
          {active.length === 0 && <p className="py-8 text-center text-sm text-slate-500">No upcoming bookings.</p>}
        </div>
      </section>

      <section className="mt-8 grid gap-5 md:grid-cols-3">
        <Link href="/resources" className="card p-6 hover:border-[#cfd2ff]">
          <span className="text-2xl">🔎</span>
          <h3 className="mt-4 font-bold">Find a mentor</h3>
          <p className="mt-2 text-sm text-slate-500">Explore mentors and their availability.</p>
          <span className="mt-4 inline-flex items-center text-sm font-semibold text-[#3940c9]">Browse <ArrowRight size={15} className="ml-1" /></span>
        </Link>
        <Link href="/resources" className="card p-6 hover:border-[#cfd2ff]">
          <span className="text-2xl">👥</span>
          <h3 className="mt-4 font-bold">Join a study group</h3>
          <p className="mt-2 text-sm text-slate-500">Learn with people working toward similar goals.</p>
          <span className="mt-4 inline-flex items-center text-sm font-semibold text-[#3940c9]">Browse <ArrowRight size={15} className="ml-1" /></span>
        </Link>
        <Link href="/my-bookings" className="card p-6 hover:border-[#cfd2ff]">
          <span className="text-2xl">📅</span>
          <h3 className="mt-4 font-bold">Manage bookings</h3>
          <p className="mt-2 text-sm text-slate-500">See, review, and cancel your sessions.</p>
          <span className="mt-4 inline-flex items-center text-sm font-semibold text-[#3940c9]">Open <ArrowRight size={15} className="ml-1" /></span>
        </Link>
      </section>
    </div>
  );
}

function Stat({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between text-slate-400">
        <span className="text-xs font-medium">{title}</span>
        {icon}
      </div>
      <p className="mt-3 text-3xl font-bold text-[#11153f]">{value}</p>
    </div>
  );
}