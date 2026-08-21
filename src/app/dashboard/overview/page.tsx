import AppShell from "@/components/layout/AppShell";
import { createClient } from "@/lib/supabase/server";
import { getBookingsForCurrentUser } from "@/lib/bookings";
import { getCurrentUser } from "@/lib/auth/actions";
import type { Booking } from "@/types/booking";

export const dynamic = "force-dynamic";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const hours = [9, 10, 11, 12, 13, 14];

function startOfMonday(date: Date) {
  const result = new Date(date);
  const day = result.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  result.setDate(result.getDate() + diff);
  result.setHours(0, 0, 0, 0);
  return result;
}

function dayIndexFromMonday(date: Date) {
  return (date.getDay() + 6) % 7;
}

function activityText(booking: Booking) {
  const title = booking.resource?.name ?? "a session";
  if (booking.status === "cancelled") return `You cancelled ${title}`;
  return `You booked ${title}`;
}

export default async function DashboardOverviewPage() {
  const user = await getCurrentUser();
  const bookings = await getBookingsForCurrentUser(await createClient()).catch(() => []);
  const now = new Date();
  const weekStart = startOfMonday(now);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 7);

  const thisWeek = bookings.filter((booking) => {
    const start = new Date(booking.start_time);
    return booking.status === "confirmed" && start >= weekStart && start < weekEnd;
  });
  const futureBookings = bookings
    .filter((booking) => booking.status === "confirmed" && new Date(booking.end_time) >= now)
    .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime());
  const totalHours = thisWeek.reduce(
    (sum, booking) => sum + (new Date(booking.end_time).getTime() - new Date(booking.start_time).getTime()) / 3_600_000,
    0,
  );
  const next = futureBookings[0];
  const recent = [...bookings]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 3);

  const fullName = (user?.user_metadata?.full_name as string | undefined) || user?.email?.split("@")[0] || "Alex";
  const initials = fullName.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();

  return (
    <AppShell>
      <main className="px-5 py-7 sm:px-8 lg:px-10 lg:py-9">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-extrabold text-[#1e1d31]">Dashboard Overview</h1>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-amber-200 to-orange-400 text-[10px] font-bold text-white">{initials}</div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-lg bg-primary-700 p-5 text-white shadow-card">
              <p className="text-[9px] uppercase tracking-wide text-primary-100">Next Booking</p>
              <p className="mt-3 text-sm font-bold">{next?.resource?.name ?? "No booking scheduled"}</p>
              <p className="mt-1 text-[10px] text-primary-100">
                {next
                  ? new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(next.start_time))
                  : "Browse resources to get started"}
              </p>
              <a href="/my-bookings" className="mt-3 inline-block text-[10px] font-semibold underline underline-offset-2">View it</a>
            </div>
            <Metric label="This Week" value={thisWeek.length} helper="Bookings" />
            <Metric label="Hours Booked" value={Math.round(totalHours)} helper="This Week" accent="green" />
            <Metric label="Streak" value={thisWeek.length ? Math.min(thisWeek.length, 3) : 0} helper="Weeks" accent="amber" />
          </div>

          <div className="mt-7 grid gap-5 xl:grid-cols-[1.6fr_0.8fr]">
            <section className="rounded-lg border border-neutral-200 bg-white p-5 shadow-[0_1px_8px_rgba(20,18,35,0.03)]">
              <h2 className="text-xs font-extrabold text-neutral-900">Weekly Schedule</h2>
              <div className="mt-4 overflow-x-auto">
                <div className="grid min-w-[620px] grid-cols-[56px_repeat(7,1fr)] border-t border-neutral-100 text-[9px] text-neutral-500">
                  <div />
                  {days.map((day, index) => {
                    const date = new Date(weekStart);
                    date.setDate(date.getDate() + index);
                    return <div key={day} className="border-l border-neutral-100 py-2 text-center"><strong className="block text-neutral-700">{day}</strong><span>{date.getDate()}</span></div>;
                  })}
                  {hours.map((hour) => (
                    <div key={hour} className="contents">
                      <div className="border-t border-neutral-100 py-5 pr-2 text-right">{hour > 12 ? hour - 12 : hour}:00</div>
                      {days.map((day, dayIndex) => {
                        const booking = thisWeek.find((item) => {
                          const start = new Date(item.start_time);
                          return dayIndexFromMonday(start) === dayIndex && start.getHours() === hour;
                        });
                        return (
                          <div key={`${day}-${hour}`} className="relative min-h-12 border-l border-t border-neutral-100">
                            {booking && <span className="absolute inset-x-2 top-1 line-clamp-2 rounded bg-primary-50 px-1 py-1.5 text-center text-[8px] font-semibold text-primary-700">{booking.resource?.name ?? "Booked session"}</span>}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <aside className="rounded-lg border border-neutral-200 bg-white p-5 shadow-[0_1px_8px_rgba(20,18,35,0.03)]">
              <h2 className="text-xs font-extrabold text-neutral-900">Recent Activity</h2>
              <div className="mt-4 space-y-5">
                {recent.length === 0 ? (
                  <p className="text-[10px] leading-5 text-neutral-400">Your booking activity will appear here.</p>
                ) : (
                  recent.map((booking, index) => (
                    <Activity
                      key={booking.id}
                      initials={booking.status === "cancelled" ? "CX" : `B${index + 1}`}
                      text={activityText(booking)}
                      detail={new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(booking.created_at))}
                    />
                  ))
                )}
              </div>
              <a href="/my-bookings" className="mt-6 inline-block text-[10px] font-semibold text-primary-700">View all activity</a>
            </aside>
          </div>
        </div>
      </main>
    </AppShell>
  );
}

function Metric({ label, value, helper, accent }: { label: string; value: number; helper: string; accent?: "green" | "amber" }) {
  const background = accent === "green" ? "bg-green-50/70" : accent === "amber" ? "bg-amber-50/70" : "bg-white";
  return <div className={`rounded-lg border border-neutral-200 p-5 ${background}`}><p className="text-[9px] font-medium text-neutral-500">{label}</p><p className="mt-3 text-3xl font-extrabold text-neutral-900">{value}</p><p className="mt-1 text-[10px] text-neutral-500">{helper}</p></div>;
}

function Activity({ initials, text, detail }: { initials: string; text: string; detail: string }) {
  return <div className="flex gap-3"><div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-50 text-[8px] font-bold text-primary-700">{initials}</div><div><p className="text-[10px] font-semibold text-neutral-800">{text}</p><p className="mt-1 text-[9px] text-neutral-400">{detail}</p></div></div>;
}
