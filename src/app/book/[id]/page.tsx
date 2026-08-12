"use client";

import { useState } from "react";
import { bookingSchema } from "@/schemas/bookingSchema";

export default function BookingPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(1);

  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Check the information entered by the user
    const result = bookingSchema.safeParse({
      name,
      email,
      date,
      guests,
    });

    // If the information is not correct
    if (!result.success) {
      setMessage(result.error.issues[0].message);
      return;
    }

    // If everything is correct
    setMessage("Booking information is valid!");

    console.log("Booking:", result.data);
  }

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-md">
        <h1 className="mb-6 text-3xl font-bold">
          Make a Booking
        </h1>

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
              onChange={(event) => setName(event.target.value)}
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
              onChange={(event) => setEmail(event.target.value)}
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
              onChange={(event) => setDate(event.target.value)}
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

          {/* Submit button */}
          <button
            type="submit"
            className="w-full rounded bg-black px-4 py-2 text-white"
          >
            Book Now
          </button>
        </form>
      </div>
    </main>
  );
}