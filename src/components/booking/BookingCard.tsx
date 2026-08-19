"use client";

import {
  CalendarDays,
  Clock3,
} from "lucide-react";

import type { Booking } from "@/types/booking";
import { useCancelBooking } from "@/hooks/useBookings";

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

function formatTime(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(iso));
}

function isStudyGroup(
  name?: string | null,
  type?: string | null
) {
  const normalizedType = (type ?? "")
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, "_");

  return (
    normalizedType === "study_group" ||
    normalizedType === "studygroup" ||
    (name ?? "").toLowerCase().includes("study group")
  );
}

function getResourceInitials(
  name?: string | null,
  type?: string | null
) {
  const resourceName = name?.trim() || "Booked Session";

  if (isStudyGroup(resourceName, type)) {
    const teamMatch = resourceName.match(/Team\s+(\d+)/i);

    if (teamMatch) {
      return `T${teamMatch[1]}`;
    }
  }

  return resourceName
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function BookingCard({
  booking,
  index = 0,
  cancellable = true,
}: {
  booking: Booking;
  index?: number;
  cancellable?: boolean;
}) {
  const cancel = useCancelBooking();

  const resourceName =
    booking.resource?.name ?? "Booked Session";

  const resourceType =
    booking.resource?.type;

  const studyGroup = isStudyGroup(
    resourceName,
    resourceType
  );

  const initials = getResourceInitials(
    resourceName,
    resourceType
  );

  const isConfirmed =
    booking.status === "confirmed";

  const isCancelled =
    booking.status === "cancelled";

  const avatarStyle = studyGroup
    ? index % 2
      ? "bg-primary-100 text-primary-700"
      : "bg-emerald-100 text-emerald-700"
    : index % 2
      ? "bg-blue-100 text-blue-700"
      : "bg-amber-100 text-amber-700";

  const statusLabel = isCancelled
    ? "Cancelled"
    : cancellable
      ? "Confirmed"
      : "Completed";

  const statusClasses = isCancelled
    ? "bg-rose-50 text-rose-700"
    : cancellable
      ? "bg-green-50 text-green-700"
      : "bg-blue-50 text-blue-700";

  const handleCancel = async () => {
    const confirmed = window.confirm(
      "Cancel this booking? The slot will become available again."
    );

    if (!confirmed) return;

    const result = await cancel.mutateAsync(
      booking.id
    );

    if (!result.success) {
      window.alert(
        result.error ||
          "Unable to cancel this booking."
      );
    }
  };

  return (
    <article className="grid items-center gap-5 border-b border-slate-100 py-5 last:border-b-0 sm:grid-cols-[1.4fr_1fr_auto_auto]">
      {/* Resource */}
      <div className="flex min-w-0 items-center gap-4">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${avatarStyle}`}
        >
          {initials}
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-800">
            {resourceName}
          </p>

          <p className="mt-1 truncate text-sm text-slate-500">
            {studyGroup
              ? "Study group session"
              : "Mentorship session"}
          </p>
        </div>
      </div>

      {/* Date / Time */}
      <div className="space-y-2 text-sm text-slate-500">
        <p className="flex items-center gap-2">
          <CalendarDays
            size={15}
            className="text-slate-400"
          />

          {formatDate(booking.start_time)}
        </p>

        <p className="flex items-center gap-2">
          <Clock3
            size={15}
            className="text-slate-400"
          />

          {formatTime(booking.start_time)} -{" "}
          {formatTime(booking.end_time)}
        </p>
      </div>

      {/* Status */}
      <span
        className={`w-fit rounded-full px-3 py-1.5 text-xs font-semibold ${statusClasses}`}
      >
        {statusLabel}
      </span>

      {/* Cancel */}
      {cancellable && isConfirmed ? (
        <button
          type="button"
          onClick={handleCancel}
          disabled={cancel.isPending}
          className="h-10 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {cancel.isPending
            ? "Cancelling..."
            : "Cancel"}
        </button>
      ) : (
        <span className="hidden sm:block" />
      )}
    </article>
  );
}
