interface BookingEmptyProps {
  tab: "upcoming" | "past";
}

export function BookingEmpty({ tab }: BookingEmptyProps) {
  return (
    <div className="text-center py-12 border border-neutral-200 rounded-lg">
      <p className="text-base text-neutral-600">
        {tab === "upcoming" ? "No upcoming bookings yet." : "No past bookings."}
      </p>
      {tab === "upcoming" && (
        <a href="/resources" className="text-sm font-medium text-primary-600 hover:text-primary-700 mt-1 inline-block">
          Browse resources to book a session
        </a>
      )}
    </div>
  );
}
