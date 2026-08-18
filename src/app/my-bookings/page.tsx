import { DashboardShell } from "@/components/auth/dashboard-shell";
import { MyBookings } from "@/components/auth/my-bookings";

export default function MyBookingsPage() {
  return (
    <DashboardShell>
      <div className="container-page py-8">
        <h1 className="page-title">My Bookings</h1>
        <p className="muted mt-2">Keep track of your upcoming and past sessions.</p>
        <div className="mt-8"><MyBookings /></div>
      </div>
    </DashboardShell>
  );
}