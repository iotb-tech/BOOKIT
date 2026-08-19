"use client";

import Link from "next/link";

import {
  useRouter,
} from "next/navigation";

import {
  CalendarDays,
  Clock3,
  ArrowLeft,
} from "lucide-react";

import {
  useCreateBooking,
} from "@/hooks/useBookings";

import {
  useResourceAvailability,
} from "@/hooks/useResourceAvailability";

import {
  useResource,
} from "@/lib/resources/hooks";

function formatDate(
  iso: string
) {
  return new Intl.DateTimeFormat(
    "en-US",
    {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  ).format(
    new Date(iso)
  );
}

function formatTime(
  iso: string
) {
  return new Intl.DateTimeFormat(
    "en-US",
    {
      hour: "numeric",
      minute: "2-digit",
    }
  ).format(
    new Date(iso)
  );
}

export default function BookingForm({
  resourceId,
  slotId,
}: {
  resourceId: string;
  slotId?: string;
}) {
  const router =
    useRouter();

  const createBooking =
    useCreateBooking();

  const {
    data: resource,
    isLoading:
      resourceLoading,
    isError:
      resourceError,
  } =
    useResource(
      resourceId
    );

  const {
    data:
      availability = [],
    isLoading:
      availabilityLoading,
    isError:
      availabilityError,
    refetch:
      refetchAvailability,
  } =
    useResourceAvailability(
      resourceId
    );

  const selectedSlot =
    slotId
      ? availability.find(
          (slot) =>
            slot.id === slotId
        )
      : undefined;

  const isLoading =
    resourceLoading ||
    availabilityLoading;

  const resourceUnavailable =
    resource?.status !==
    "available";

  const handleBooking =
    () => {
      if (
        !slotId ||
        !selectedSlot ||
        !resource ||
        resourceUnavailable
      ) {
        return;
      }

      createBooking.mutate(
        {
          resourceId,
          slotId,
        },
        {
          onSuccess:
            (result) => {
              if (
                !result.success
              ) {
                return;
              }

              router.replace(
                "/my-bookings?created=1"
              );

              router.refresh();
            },
        }
      );
    };

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href={`/resources/${resourceId}`}
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-primary-700"
      >
        <ArrowLeft
          size={16}
        />

        Back to availability
      </Link>

      <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] sm:p-8">
        <p className="text-sm font-semibold text-primary-700">
          Confirm booking
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-800">
          {resource?.name ??
            "Book a session"}
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Confirm the
          availability slot
          you selected.
          BookIt will use
          this exact slot
          when creating
          your booking.
        </p>

        {isLoading && (
          <div className="mt-7 space-y-3">
            <div className="h-20 animate-pulse rounded-xl bg-slate-100" />

            <div className="h-11 animate-pulse rounded-lg bg-slate-100" />
          </div>
        )}

        {!isLoading &&
          (resourceError ||
            availabilityError) && (
            <div className="mt-7 rounded-xl border border-red-100 bg-red-50 p-5">
              <p className="text-sm font-medium text-red-700">
                We could not
                load this
                booking slot.
              </p>

              <button
                type="button"
                onClick={() =>
                  refetchAvailability()
                }
                className="mt-3 text-sm font-semibold text-primary-700 hover:text-primary-800"
              >
                Try again
              </button>
            </div>
          )}

        {!isLoading &&
          !resourceError &&
          !availabilityError &&
          !slotId && (
            <div className="mt-7 rounded-xl border border-amber-200 bg-amber-50 p-5">
              <p className="text-sm font-semibold text-amber-800">
                No availability
                slot was selected.
              </p>

              <p className="mt-1 text-sm text-amber-700">
                Return to the
                resource page
                and choose one
                of the available
                times.
              </p>

              <Link
                href={`/resources/${resourceId}`}
                className="mt-4 inline-flex rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-700"
              >
                Choose a slot
              </Link>
            </div>
          )}

        {!isLoading &&
          !resourceError &&
          !availabilityError &&
          slotId &&
          !selectedSlot && (
            <div className="mt-7 rounded-xl border border-amber-200 bg-amber-50 p-5">
              <p className="text-sm font-semibold text-amber-800">
                This slot is no
                longer available.
              </p>

              <p className="mt-1 text-sm text-amber-700">
                It may have
                been booked
                already or the
                session time
                has passed.
              </p>

              <Link
                href={`/resources/${resourceId}`}
                className="mt-4 inline-flex rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-700"
              >
                View other slots
              </Link>
            </div>
          )}

        {!isLoading &&
          resource &&
          resourceUnavailable && (
            <div className="mt-7 rounded-xl border border-amber-200 bg-amber-50 p-5">
              <p className="text-sm font-semibold text-amber-800">
                This resource
                is currently
                unavailable
                for booking.
              </p>
            </div>
          )}

        {!isLoading &&
          selectedSlot &&
          resource &&
          !resourceUnavailable && (
            <>
              <div className="mt-7 rounded-xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold text-slate-800">
                  Selected session
                </p>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <CalendarDays
                      size={18}
                      className="mt-0.5 text-primary-600"
                    />

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Date
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-700">
                        {formatDate(
                          selectedSlot.start_time
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock3
                      size={18}
                      className="mt-0.5 text-primary-600"
                    />

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Time
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-700">
                        {formatTime(
                          selectedSlot.start_time
                        )}
                        {" - "}
                        {formatTime(
                          selectedSlot.end_time
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {!createBooking
                .data
                ?.success &&
                createBooking
                  .data
                  ?.error && (
                  <div className="mt-5 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {
                      createBooking
                        .data
                        .error
                    }
                  </div>
                )}

              {createBooking
                .isError && (
                <div className="mt-5 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
                  Something went
                  wrong while
                  creating the
                  booking.
                  Please try
                  again.
                </div>
              )}

              <button
                type="button"
                onClick={
                  handleBooking
                }
                disabled={
                  createBooking
                    .isPending
                }
                className="mt-6 flex h-12 w-full items-center justify-center rounded-lg bg-primary-600 px-5 text-sm font-semibold text-white transition hover:bg-primary-700 disabled:cursor-wait disabled:opacity-60"
              >
                {createBooking
                  .isPending
                  ? "Confirming booking..."
                  : "Confirm Booking"}
              </button>
            </>
          )}
      </section>
    </div>
  );
}