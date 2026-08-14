"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { getResourceById } from "@/lib/resources";

const supabase = createClient();

export function useResource(id: string) {
  const query = useQuery({
    queryKey: ["resource", id],

    queryFn: async () => {
      if (!supabase) {
        throw new Error(
          "Supabase is not configured. Check your .env.local file."
        );
      }

      return getResourceById(supabase, id);
    },

    enabled: Boolean(id),
  });

  return {
    ...query,
    resource: query.data ?? null,
  };
}