interface BookingErrorProps {
  onRetry: () => void;
  message?: string;
}

export function BookingError({ onRetry, message }: BookingErrorProps) {
  return (
    <div className="text-center py-12 border border-neutral-200 rounded-lg">
      <p className="text-base text-error">
        {message ?? "Couldn't load your bookings. Please try again."}
      </p>
      <button
        onClick={onRetry}
        className="mt-3 text-sm font-medium text-primary-600 hover:text-primary-700"
      >
        Retry
      </button>
    </div>
  );
}
