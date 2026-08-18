import { z } from 'zod';

export const bookingSchema = z.object({
  date: z.string().min(1, 'Please select a date'),
  startTime: z.string().min(1, 'Please choose a start time'),
  endTime: z.string().min(1, 'Please choose an end time'),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
export type BookingFormValues = BookingFormData;