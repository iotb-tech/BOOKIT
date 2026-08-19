"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { fetchMyBookings } from "@/lib/bookings";
import {
  cancelBooking,
  createBooking,
} from "@/lib/bookings/actions";
import { createClient } from "@/lib/supabase/client";

/* =========================================================
   QUERY KEYS
   ========================================================= */

export const bookingKeys = {
  all: ["bookings"] as const,
  mine: () => [...bookingKeys.all, "mine"] as const,
};

/* =========================================================
   GET MY BOOKINGS
   ========================================================= */

export function useMyBookings() {
  const supabase = createClient();

  return useQuery({
    queryKey: bookingKeys.mine(),

    queryFn: () => fetchMyBookings(supabase),
  });
}

/* =========================================================
   CREATE BOOKING
   ========================================================= */

type CreateBookingInput = {
  resourceId: string;
  startTime: string;
  endTime: string;
};

export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateBookingInput) => {
      return createBooking(input);
    },

    onSuccess: (result) => {
      if (!result.success) {
        return;
      }

      // Get fresh booking data after creating a booking
      queryClient.invalidateQueries({
        queryKey: bookingKeys.all,
      });
    },
  });
}

/* =========================================================
   CANCEL BOOKING
   ========================================================= */

export function useCancelBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookingId: string) => {
      return cancelBooking(bookingId);
    },

    onSuccess: (result) => {
      if (!result.success) {
        return;
      }

      // Get fresh booking data after cancellation
      queryClient.invalidateQueries({
        queryKey: bookingKeys.all,
      });
    },
  });
}