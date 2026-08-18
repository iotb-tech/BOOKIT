"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import type { ResourceAvailability } from "@/types/availability";

export function useResourceAvailability(resourceId: string) {
  return useQuery({
    queryKey: ["resource-availability", resourceId],

    queryFn: async (): Promise<ResourceAvailability[]> => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("resource_availability")
        .select(
          "id, resource_id, start_time, end_time, status, created_at"
        )
        .eq("resource_id", resourceId)
        .eq("status", "available")
        .gte("start_time", new Date().toISOString())
        .order("start_time", {
          ascending: true,
        });

      if (error) {
        throw new Error(error.message);
      }

      return data ?? [];
    },

    enabled: Boolean(resourceId),
  });
}