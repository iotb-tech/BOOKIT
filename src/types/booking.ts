export type ResourceType = "mentor" | "study_group";

export type Resource = {
  id: string;
  name: string;
  description: string;
  owner_id: string;
  type: ResourceType;
  skills: string[];
  image_url: string | null;
  duration_minutes: number;
  created_at: string;
};

export type Booking = {
  id: string;
  resource_id: string;
  user_id: string;
  start_time: string;
  end_time: string;
  status: "confirmed" | "cancelled";
  note: string | null;
  created_at: string;
  resource?: Pick<Resource, "id" | "name" | "type">;
};