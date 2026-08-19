"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { getBookingsForCurrentUser } from "@/lib/bookings";
import { cancelBookingAction, createBookingAction } from "@/lib/bookings/actions";
import type { BookingRequest } from "@/schemas/bookingSchema";

export function useBookings() {
  return useQuery({
    queryKey: ["bookings", "current-user"],
    queryFn: () => getBookingsForCurrentUser(createClient()),
  });
}

export function useCreateBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: BookingRequest) => createBookingAction(request),
    onSuccess: async (result) => {
      if (result.success) await queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
}

export function useCancelBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (bookingId: string) => cancelBookingAction(bookingId),
    onSuccess: async (result) => {
      if (result.success) {
        await queryClient.invalidateQueries({ queryKey: ["bookings"] });
        await queryClient.invalidateQueries({ queryKey: ["resources"] });
      }
    },
  });
}
