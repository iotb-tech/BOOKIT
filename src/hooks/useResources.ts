"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { getResources } from "@/lib/resources";

const supabase = createClient();

export function useResources() {
  const query = useQuery({
    queryKey: ["resources"],

    queryFn: async () => {
      return getResources(supabase);
    },
  });

  return {
    ...query,
    resources: query.data ?? [],
  };
}