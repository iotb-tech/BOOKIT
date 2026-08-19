import { z } from "zod";

export const bookingRequestSchema =
  z.object({
    resourceId: z
      .string()
      .min(
        1,
        "Resource is required"
      ),

    slotId: z
      .string()
      .min(
        1,
        "Please select an available slot"
      ),
  });

// Alias retained in case another file
// still imports bookingSchema.
export const bookingSchema =
  bookingRequestSchema;

export type BookingRequest =
  z.infer<
    typeof bookingRequestSchema
  >;

export type BookingFormData =
  BookingRequest;

export type BookingFormValues =
  BookingRequest;