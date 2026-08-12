import { z } from "zod";

export const bookingSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters"),

  email: z
    .string()
    .email("Please enter a valid email address"),

  date: z
    .string()
    .min(1, "Please select a date"),

  guests: z
    .number()
    .min(1, "At least 1 guest is required")
    .max(10, "Maximum of 10 guests"),
});

export type BookingFormData = z.infer<typeof bookingSchema>;