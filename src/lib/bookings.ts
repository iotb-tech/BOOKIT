import type { SupabaseClient } from "@supabase/supabase-js";
import type { BookingWithResource } from "@/types/booking";

const BOOKING_FIELDS_WITH_RESOURCE =
  "id, resource_id, user_id, start_time, end_time, status, created_at, resource:resources(id, name, type)";

/**
 * Fetches every booking for the currently signed-in user, most recent first.
 * Relies on the "Users can view their own bookings" RLS policy, so no
 * explicit user_id filter is required here.
 */
export async function getMyBookings(
  supabase: SupabaseClient
): Promise<BookingWithResource[]> {
  const { data, error } = await supabase
    .from("bookings")
    .select(BOOKING_FIELDS_WITH_RESOURCE)
    .order("start_time", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch bookings: ${error.message}`);
  }

  return (data ?? []) as unknown as BookingWithResource[];
}

export async function cancelBooking(
  supabase: SupabaseClient,
  bookingId: string
): Promise<void> {
  const { error } = await supabase
    .from("bookings")
    .update({ status: "cancelled" })
    .eq("id", bookingId);

  if (error) {
    throw new Error(`Failed to cancel booking: ${error.message}`);
  }
}
