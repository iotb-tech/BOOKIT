import {
  z,
} from "zod";

export const resourceSchema =
  z.object({
    name:
      z
        .string()
        .trim()
        .min(
          2,
          "Name must be at least 2 characters"
        ),

    description:
      z
        .string()
        .trim()
        .min(
          10,
          "Description must be at least 10 characters"
        ),

    type:
      z.enum([
        "Mentor",
        "Study Group",
      ]),

    status:
      z.enum([
        "available",
        "unavailable",
        "maintenance",
      ]),

    duration_minutes:
      z
        .string()
        .optional()
        .refine(
          (value) =>
            value ===
              undefined ||
            value ===
              "" ||
            (
              !Number.isNaN(
                Number(
                  value
                )
              ) &&
              Number(
                value
              ) >= 15 &&
              Number(
                value
              ) <= 240
            ),

          "Duration must be between 15 and 240 minutes"
        ),
  });

export type ResourceFormValues =
  z.infer<
    typeof resourceSchema
  >;