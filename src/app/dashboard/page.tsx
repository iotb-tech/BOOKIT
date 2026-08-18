import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/auth/dashboard-shell";
import { DashboardHome } from "@/components/auth/dashboard-home";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const firstName =
    user.user_metadata?.first_name ||
    user.email?.split("@")[0] ||
    "there";

 
    return (
    <DashboardShell>
      <DashboardHome firstName={firstName} />
    </DashboardShell>
  );

}
// // import { getCurrentUser } from "@/lib/auth/actions";

// const mockStats = {
//   upcoming: 3,
//   past: 8,
//   cancelled: 1,
//   totalHours: 12,
// };

// const mockUpcomingBookings = [
//   {
//     id: "1",
//     title: "React Mentorship",
//     withName: "Jane Smith",
//     date: "May 25, 2024",
//     timeRange: "10:00 AM - 11:00 AM",
//     status: "Confirmed",
//   },
//   {
//     id: "2",
//     title: "Study Group: Next.js",
//     withName: "Study Buddies",
//     date: "May 27, 2024",
//     timeRange: "2:00 PM - 3:00 PM",
//     status: "Confirmed",
//   },
// ];

// export default async function DashboardPage() {
//   const user = await getCurrentUser();
//   const fullName = (user?.user_metadata?.full_name as string) ?? "";
//   const firstName = fullName.split(" ")[0] || "there";

//   return (
//     <main className="min-h-screen w-full bg-neutral-50 px-4 py-10">
//       <div className="mx-auto max-w-5xl">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-neutral-900">Dashboard</h1>
//           <p className="mt-1 text-neutral-600">
//             Welcome back, {firstName}! Here is what is happening with your bookings.
//           </p>
//         </div>

//         <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
//           <StatCard label="Upcoming Bookings" value={mockStats.upcoming} />
//           <StatCard label="Past Bookings" value={mockStats.past} />
//           <StatCard label="Cancelled" value={mockStats.cancelled} />
//           <StatCard label="Total Hours" value={mockStats.totalHours} />
//         </div>

//         <div className="rounded-lg bg-white p-6 shadow-sm">
//           <div className="mb-4 flex items-center justify-between">
//             <h2 className="text-xl font-semibold text-neutral-900">
//               Upcoming Bookings
//             </h2>
//             <a
//               href="/my-bookings"
//               className="text-sm font-medium text-primary-600 hover:underline"
//             >
//               View all
//             </a>
//           </div>

//           {mockUpcomingBookings.length === 0 ? (
//             <p className="py-8 text-center text-sm text-neutral-600">
//               No upcoming bookings yet.
//             </p>
//           ) : (
//             <ul className="divide-y divide-neutral-100">
//               {mockUpcomingBookings.map((booking) => (
//                 <li
//                   key={booking.id}
//                   className="flex items-center justify-between py-4"
//                 >
//                   <div>
//                     <p className="font-medium text-neutral-900">
//                       {booking.title}
//                     </p>
//                     <p className="text-sm text-neutral-600">
//                       with {booking.withName}
//                     </p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-sm text-neutral-900">{booking.date}</p>
//                     <p className="text-sm text-neutral-600">
//                       {booking.timeRange}
//                     </p>
//                   </div>
//                   <span className="ml-4 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-success">
//                     {booking.status}
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>
//     </main>
//   );
// }

// function StatCard({ label, value }: { label: string; value: number }) {
//   return (
//     <div className="rounded-lg bg-white p-4 shadow-sm">
//       <p className="text-sm text-neutral-600">{label}</p>
//       <p className="mt-1 text-2xl font-bold text-neutral-900">{value}</p>
//     </div>
//   );
// }
