export type ResourceStatus =
  | "available"
  | "unavailable"
  | "maintenance";

export interface Resource {
  id: string;
  name: string;
  description: string;
  owner_id: string;
  owner_name?: string;
  type?: "Mentor" | "Study Group";
  skills?: string[];
  duration_minutes?: number;
  created_at?: string;
  status?: ResourceStatus;
}