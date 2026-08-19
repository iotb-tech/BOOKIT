export interface ResourceAvailability {
  id: string;
  resource_id: string;
  start_time: string;
  end_time: string;
  status: "available" | "booked" | "unavailable";
  created_at: string;
}