export function ResourceDetailSkeleton() {
  return (
    <div className="p-4 sm:p-6 flex flex-col gap-6 md:grid md:grid-cols-3 animate-pulse">
      <div className="md:col-span-2">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-neutral-200" />
          <div className="space-y-2">
            <div className="h-4 w-40 bg-neutral-200 rounded" />
            <div className="h-3 w-28 bg-neutral-200 rounded" />
            <div className="h-3 w-24 bg-neutral-200 rounded" />
          </div>
        </div>
        <div className="mt-6 space-y-2">
          <div className="h-3 w-full bg-neutral-200 rounded" />
          <div className="h-3 w-full bg-neutral-200 rounded" />
          <div className="h-3 w-3/4 bg-neutral-200 rounded" />
        </div>
        <div className="flex gap-2 mt-4">
          <div className="h-6 w-16 bg-neutral-200 rounded" />
          <div className="h-6 w-16 bg-neutral-200 rounded" />
          <div className="h-6 w-16 bg-neutral-200 rounded" />
        </div>
      </div>
      <div className="border border-neutral-200 rounded-lg p-4">
        <div className="h-3 w-32 bg-neutral-200 rounded mb-4" />
        <div className="h-3 w-24 bg-neutral-200 rounded mb-4" />
        <div className="h-10 w-full bg-neutral-200 rounded" />
      </div>
    </div>
  )
}