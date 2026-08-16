export type ResourceStatus =
  | "available"
  | "unavailable"
  | "maintenance";

export type ResourceType =
  | "Mentor"
  | "Study Group";

export interface Resource {
  id: string;
  name: string;
  description: string | null;
  owner_id: string;
  created_at: string;
  type: ResourceType | null;
  skills: string[];
  duration_minutes: number | null;
  status: ResourceStatus;
}