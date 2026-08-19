export function BookingListSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="border border-neutral-200 rounded-lg p-4 animate-pulse flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-neutral-200 shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-1/3 bg-neutral-200 rounded" />
            <div className="h-3 w-1/4 bg-neutral-200 rounded" />
          </div>
          <div className="h-6 w-20 bg-neutral-200 rounded-full" />
        </div>
      ))}
    </div>
  );
}
