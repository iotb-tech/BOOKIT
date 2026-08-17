"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { getMyBookings, cancelBooking } from "@/lib/bookings";

const supabase = createClient();

export function useBookings() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      return getMyBookings(supabase);
    },
  });

  const cancel = useMutation({
    mutationFn: (bookingId: string) => cancelBooking(supabase, bookingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });

  return {
    ...query,
    bookings: query.data ?? [],
    cancelBooking: cancel.mutate,
    isCancelling: cancel.isPending,
  };
}
