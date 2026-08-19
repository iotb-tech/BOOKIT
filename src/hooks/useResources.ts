"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { getResources } from "@/lib/resources";

const supabase = createClient();

export function useResources() {
  const query = useQuery({
    queryKey: ["resources"],

    queryFn: async () => {
      if (!supabase) {
        throw new Error(
          "Supabase is not configured. Check your .env.local file."
        );
      }

      return getResources(supabase);
    },
  });

  return {
    ...query,
    resources: query.data ?? [],
  };
}