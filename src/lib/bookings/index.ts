import type { SupabaseClient } from "@supabase/supabase-js";
import type { Booking } from "@/types/booking";

const ENHANCED_SELECT = "id, resource_id, user_id, start_time, end_time, status, created_at, resources(name, type, duration_minutes)";
const BASE_SELECT = "id, resource_id, user_id, start_time, end_time, status, created_at, resources(name)";

function normalizeBooking(row: Record<string, unknown>): Booking {
  const relation = row.resources;
  const resourceRow = Array.isArray(relation) ? relation[0] : relation;
  const resource = resourceRow && typeof resourceRow === "object" ? (resourceRow as Record<string, unknown>) : null;

  return {
    id: String(row.id),
    resource_id: String(row.resource_id),
    user_id: String(row.user_id),
    start_time: String(row.start_time),
    end_time: String(row.end_time),
    status: row.status === "cancelled" ? "cancelled" : "confirmed",
    created_at: String(row.created_at),
    resource: resource
      ? {
          name: String(resource.name ?? "Booked session"),
          type: typeof resource.type === "string" ? resource.type : null,
          duration_minutes: typeof resource.duration_minutes === "number" ? resource.duration_minutes : null,
        }
      : null,
  };
}

export async function getBookingsForCurrentUser(supabase: SupabaseClient): Promise<Booking[]> {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) return [];

  const enhanced = await supabase
    .from("bookings")
    .select(ENHANCED_SELECT)
    .eq("user_id", userData.user.id)
    .order("start_time", { ascending: true });

  if (!enhanced.error) {
    return (enhanced.data ?? []).map((row) => normalizeBooking(row as unknown as Record<string, unknown>));
  }

  const base = await supabase
    .from("bookings")
    .select(BASE_SELECT)
    .eq("user_id", userData.user.id)
    .order("start_time", { ascending: true });

  if (base.error) throw new Error(base.error.message);
  return (base.data ?? []).map((row) => normalizeBooking(row as unknown as Record<string, unknown>));
}
