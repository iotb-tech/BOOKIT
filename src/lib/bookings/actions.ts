"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import type { Booking } from "@/types/booking";

type CreateBookingInput = {
  resourceId: string;
  startTime: string;
  endTime: string;
};

type BookingActionSuccess<T> = {
  success: true;
  booking: T;
};

type BookingActionError = {
  success: false;
  error: string;
};

type BookingActionResult<T> =
  | BookingActionSuccess<T>
  | BookingActionError;

/* =========================================================
   CREATE BOOKING
   ========================================================= */

export async function createBooking(
  input: CreateBookingInput
): Promise<BookingActionResult<Booking>> {
  const supabase = await createClient();

  // Get the currently logged-in user.
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      success: false,
      error: "You must be logged in to create a booking.",
    };
  }

  // Validate the resource ID.
  if (!input.resourceId) {
    return {
      success: false,
      error: "A resource is required.",
    };
  }

  // Convert the booking times to Date objects.
  const startTime = new Date(input.startTime);
  const endTime = new Date(input.endTime);

  if (
    Number.isNaN(startTime.getTime()) ||
    Number.isNaN(endTime.getTime())
  ) {
    return {
      success: false,
      error: "Please provide valid booking times.",
    };
  }

  // The database also checks this, but checking here
  // gives the user a clearer message.
  if (endTime <= startTime) {
    return {
      success: false,
      error: "End time must be after start time.",
    };
  }

  // Make sure the resource exists.
  const { data: resource, error: resourceError } = await supabase
    .from("resources")
    .select("id")
    .eq("id", input.resourceId)
    .maybeSingle();

  if (resourceError) {
    return {
      success: false,
      error: resourceError.message,
    };
  }

  if (!resource) {
    return {
      success: false,
      error: "The selected resource does not exist.",
    };
  }

  /*
   * We intentionally do NOT perform an overlap SELECT here.
   *
   * RLS allows users to see their own bookings only, so a client-side
   * overlap query cannot reliably see another user's booking.
   *
   * The PostgreSQL exclusion constraint is the final authority.
   */

  const { data: booking, error: bookingError } = await supabase
    .from("bookings")
    .insert({
      resource_id: input.resourceId,
      user_id: user.id,
      start_time: input.startTime,
      end_time: input.endTime,
      status: "confirmed",
    })
    .select()
    .single();

  if (bookingError) {
    // PostgreSQL exclusion constraint violation.
    if (bookingError.code === "23P01") {
      return {
        success: false,
        error: "This resource is already booked for that time.",
      };
    }

    return {
      success: false,
      error: bookingError.message,
    };
  }

  revalidatePath("/book");
  revalidatePath("/bookings");
  revalidatePath("/dashboard");

  return {
    success: true,
    booking: booking as Booking,
  };
}

/* =========================================================
   CANCEL BOOKING
   ========================================================= */

export async function cancelBooking(
  bookingId: string
): Promise<BookingActionResult<Booking>> {
  const supabase = await createClient();

  // Get the currently logged-in user.
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      success: false,
      error: "You must be logged in to cancel a booking.",
    };
  }

  if (!bookingId) {
    return {
      success: false,
      error: "A booking ID is required.",
    };
  }

  // RLS + user_id ensure that a user can only cancel
  // their own booking.
  const { data: booking, error: bookingError } = await supabase
    .from("bookings")
    .update({
      status: "cancelled",
    })
    .eq("id", bookingId)
    .eq("user_id", user.id)
    .select()
    .maybeSingle();

  if (bookingError) {
    return {
      success: false,
      error: bookingError.message,
    };
  }

  if (!booking) {
    return {
      success: false,
      error:
        "Booking not found or you do not have permission to cancel it.",
    };
  }

  revalidatePath("/book");
  revalidatePath("/bookings");
  revalidatePath("/dashboard");

  return {
    success: true,
    booking: booking as Booking,
  };
}