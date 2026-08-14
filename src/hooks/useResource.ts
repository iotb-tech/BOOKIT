"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { getResourceById } from "@/lib/resources";

const supabase = createClient();

export function useResource(id: string) {
  const query = useQuery({
    queryKey: ["resource", id],

    queryFn: async () => {
      return getResourceById(supabase, id);
    },

    enabled: Boolean(id),
  });

  return {
    ...query,
    resource: query.data ?? null,
  };
}