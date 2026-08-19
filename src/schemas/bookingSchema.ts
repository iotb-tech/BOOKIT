import { z } from "zod";

export const bookingSchema = z
  .object({
    date: z.string().min(1, "Please select a date"),
    timeSlot: z.string().min(1, "Please select a time"),
    note: z.string().max(200, "Keep your note under 200 characters"),
  })
  .superRefine((value, ctx) => {
    if (!value.date) return;
    const selected = new Date(`${value.date}T23:59:59`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (Number.isNaN(selected.getTime()) || selected < today) {
      ctx.addIssue({ code: "custom", path: ["date"], message: "Please select today or a future date" });
    }
  });

export const bookingRequestSchema = z
  .object({
    resourceId: z.string().min(1),
    startTime: z.string().datetime({ offset: true }),
    endTime: z.string().datetime({ offset: true }),
  })
  .superRefine((value, ctx) => {
    const start = new Date(value.startTime);
    const end = new Date(value.endTime);
    if (end <= start) {
      ctx.addIssue({ code: "custom", path: ["endTime"], message: "End time must be after start time" });
    }
    if (start.getTime() < Date.now() - 60_000) {
      ctx.addIssue({ code: "custom", path: ["startTime"], message: "Bookings cannot be created in the past" });
    }
  });

export type BookingFormData = z.infer<typeof bookingSchema>;
export type BookingFormValues = BookingFormData;
export type BookingRequest = z.infer<typeof bookingRequestSchema>;
