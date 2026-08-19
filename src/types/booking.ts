export type BookingStatus = "confirmed" | "cancelled";

export interface BookingResourceSummary {
  name: string;
  type?: string | null;
  duration_minutes?: number | null;
}

export interface Booking {
  id: string;
  resource_id: string;
  user_id: string;
  start_time: string;
  end_time: string;
  status: BookingStatus;
  created_at: string;
  resource?: BookingResourceSummary | null;
}
