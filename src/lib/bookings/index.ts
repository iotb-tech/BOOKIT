import type { SupabaseClient } from "@supabase/supabase-js";

export type Booking = {
  id: string;
  resource_id: string;
  user_id: string;
  start_time: string;
  end_time: string;
  status: "confirmed" | "cancelled";
  created_at: string;
};

/**
 * Get all bookings belonging to the logged-in user.
 */
export async function fetchMyBookings(
  supabase: SupabaseClient
): Promise<Booking[]> {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("start_time", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

/**
 * Get one booking by its ID.
 */
export async function fetchBooking(
  supabase: SupabaseClient,
  bookingId: string
): Promise<Booking | null> {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", bookingId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}