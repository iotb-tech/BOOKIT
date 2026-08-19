import type { BookingWithResource } from "@/types/booking";

function formatDateTime(startIso: string, endIso: string) {
  const start = new Date(startIso);
  const end = new Date(endIso);

  const date = start.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const startTime = start.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });

  const endTime = end.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });

  return { date, time: `${startTime} - ${endTime}` };
}

interface BookingCardProps {
  booking: BookingWithResource;
  onCancel?: (bookingId: string) => void;
  isCancelling?: boolean;
  index?:number
  cancellable?: boolean
}

export default function BookingCard({ booking, index =0, onCancel, isCancelling , cancellable = true}: BookingCardProps) {
  const { date, time } = formatDateTime(booking.start_time, booking.end_time);
  const resourceName = booking.resource?.name ?? "Deleted resource";
  const initial = resourceName.charAt(0).toUpperCase();
  const isCancelled = booking.status === "cancelled";

  return (
    <div className="flex items-center justify-between gap-3 border border-neutral-200 rounded-lg p-4">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold flex items-center justify-center shrink-0">
          {initial}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium truncate">{resourceName}</p>
          {booking.resource?.type && (
            <p className="text-sm text-neutral-600 truncate">{booking.resource.type}</p>
          )}
        </div>
      </div>

      <div className="hidden sm:block text-sm text-neutral-600 text-right shrink-0">
        <p>{date}</p>
        <p>{time}</p>
      </div>

      <span
        className={`text-sm px-2.5 py-1 rounded-full shrink-0 ${
          isCancelled
            ? "bg-neutral-100 text-neutral-600"
            : "bg-green-50 text-success"
        }`}
      >
        {isCancelled ? "Cancelled" : "Confirmed"}
      </span>

      {!isCancelled && onCancel && (
        <button
          onClick={() => onCancel(booking.id)}
          disabled={isCancelling}
          className="text-sm px-3 py-1.5 rounded border border-neutral-200 text-neutral-600 hover:bg-neutral-50 disabled:opacity-50 shrink-0"
        >
          Cancel
        </button>
      )}
    </div>
  );
}
