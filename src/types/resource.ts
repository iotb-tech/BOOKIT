export type ResourceStatus =
  | "available"
  | "limited"
  | "unavailable";

export interface Resource {
  id: string;
  name: string;
  description: string;
  owner_id: string | null;
  owner_name?: string;
  type?: "Mentor" | "Study Group";
  skills?: string[];
  duration_minutes?: number;
  created_at?: string;
  status?: ResourceStatus;
}