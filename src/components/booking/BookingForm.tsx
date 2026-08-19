"use client";

import { useState } from "react";

import { useCreateBooking } from "@/hooks/useBookings";
import { bookingSchema } from "@/schemas/bookingSchema";

type BookingFormProps = {
  resourceId: string;
};

export default function BookingForm({
  resourceId,
}: BookingFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [guests, setGuests] = useState(1);

  const [message, setMessage] = useState("");

  const createBookingMutation = useCreateBooking();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("");

    // Validate the original form information
    const result = bookingSchema.safeParse({
      name,
      email,
      date,
      guests,
    });

    if (!result.success) {
      setMessage(result.error.issues[0].message);
      return;
    }

    // Make sure both times have been entered
    if (!startTime || !endTime) {
      setMessage("Please select a start time and end time.");
      return;
    }

    // Convert date + time into complete ISO date-time values
    const startDateTime = new Date(
      `${date}T${startTime}`
    );

    const endDateTime = new Date(
      `${date}T${endTime}`
    );

    if (
      Number.isNaN(startDateTime.getTime()) ||
      Number.isNaN(endDateTime.getTime())
    ) {
      setMessage("Please enter valid booking times.");
      return;
    }

    if (endDateTime <= startDateTime) {
      setMessage("End time must be after start time.");
      return;
    }

    createBookingMutation.mutate(
      {
        resourceId,
        startTime: startDateTime.toISOString(),
        endTime: endDateTime.toISOString(),
      },
      {
        onSuccess: (response) => {
          if (!response.success) {
            setMessage(response.error);
            return;
          }

          setMessage("Booking created successfully!");

          // Clear the form after successful booking
          setDate("");
          setStartTime("");
          setEndTime("");
          setGuests(1);
        },

        onError: () => {
          setMessage(
            "Something went wrong while creating the booking."
          );
        },
      }
    );
  }

  return (
    <main>
      <div className="mx-auto max-w-md">
        <h2 className="mb-6 text-2xl font-bold">
          Make a Booking
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-lg border p-6"
        >
          {/* Name */}
          <div>
            <label className="mb-1 block font-medium">
              Full Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              placeholder="Enter your name"
              className="w-full rounded border p-2"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-1 block font-medium">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="Enter your email"
              className="w-full rounded border p-2"
            />
          </div>

          {/* Date */}
          <div>
            <label className="mb-1 block font-medium">
              Booking Date
            </label>

            <input
              type="date"
              value={date}
              onChange={(event) =>
                setDate(event.target.value)
              }
              className="w-full rounded border p-2"
            />
          </div>

          {/* Start time */}
          <div>
            <label className="mb-1 block font-medium">
              Start Time
            </label>

            <input
              type="time"
              value={startTime}
              onChange={(event) =>
                setStartTime(event.target.value)
              }
              className="w-full rounded border p-2"
            />
          </div>

          {/* End time */}
          <div>
            <label className="mb-1 block font-medium">
              End Time
            </label>

            <input
              type="time"
              value={endTime}
              onChange={(event) =>
                setEndTime(event.target.value)
              }
              className="w-full rounded border p-2"
            />
          </div>

          {/* Number of guests */}
          <div>
            <label className="mb-1 block font-medium">
              Number of Guests
            </label>

            <input
              type="number"
              min="1"
              max="10"
              value={guests}
              onChange={(event) =>
                setGuests(Number(event.target.value))
              }
              className="w-full rounded border p-2"
            />
          </div>

          {/* Error or success message */}
          {message && (
            <p className="rounded bg-gray-100 p-3">
              {message}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={createBookingMutation.isPending}
            className="w-full rounded bg-black px-4 py-2 text-white disabled:opacity-50"
          >
            {createBookingMutation.isPending
              ? "Booking..."
              : "Book Now"}
          </button>
        </form>
      </div>
    </main>
  );
}