import type { SupabaseClient } from "@supabase/supabase-js";
import type { Resource } from "@/types/resource";

const RESOURCE_FIELDS =
  "id, name, description, owner_id, created_at, type, skills, duration_minutes, status";

export async function getResources(
  supabase: SupabaseClient
): Promise<Resource[]> {
  const { data, error } = await supabase
    .from("resources")
    .select(RESOURCE_FIELDS)
    .order("name", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch resources: ${error.message}`);
  }

  return (data ?? []) as Resource[];
}

export async function getResourceById(
  supabase: SupabaseClient,
  id: string
): Promise<Resource | null> {
  const { data, error } = await supabase
    .from("resources")
    .select(RESOURCE_FIELDS)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to fetch resource: ${error.message}`);
  }

  return data as Resource | null;
}