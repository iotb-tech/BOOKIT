"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { bookingRequestSchema, type BookingRequest } from "@/schemas/bookingSchema";

export type BookingActionResult = { success: true; bookingId?: string } | { success: false; error: string };

export async function createBookingAction(input: BookingRequest): Promise<BookingActionResult> {
  const parsed = bookingRequestSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Please check the booking details." };
  }

  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) return { success: false, error: "Please log in before booking a session." };

  const { resourceId, startTime, endTime } = parsed.data;
  const { data, error } = await supabase
    .from("bookings")
    .insert({
      resource_id: resourceId,
      user_id: userData.user.id,
      start_time: startTime,
      end_time: endTime,
      status: "confirmed",
    })
    .select("id")
    .single();

  if (error) {
    const overlap = error.code === "23P01" || /overlap|conflict|exclude/i.test(error.message);
    return {
      success: false,
      error: overlap ? "That time slot was just taken. Please choose another available time." : error.message,
    };
  }

  revalidatePath("/my-bookings");
  revalidatePath(`/resources/${resourceId}`);
  revalidatePath("/dashboard");
  return { success: true, bookingId: data?.id };
}

export async function cancelBookingAction(bookingId: string): Promise<BookingActionResult> {
  if (!bookingId) return { success: false, error: "Booking id is required." };
  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) return { success: false, error: "Please log in to manage bookings." };

  const { error } = await supabase
    .from("bookings")
    .update({ status: "cancelled" })
    .eq("id", bookingId)
    .eq("user_id", userData.user.id)
    .eq("status", "confirmed");

  if (error) return { success: false, error: error.message };
  revalidatePath("/my-bookings");
  revalidatePath("/dashboard");
  return { success: true };
}
