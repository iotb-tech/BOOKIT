export function ResourceListSkeleton() {
  return (
    <div className=" bg-white grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="border border-neutral-200 rounded-lg p-4 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-neutral-200" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-2/3 bg-neutral-200 rounded" />
              <div className="h-3 w-1/2 bg-neutral-200 rounded" />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="h-3 w-full bg-neutral-200 rounded" />
            <div className="h-3 w-4/5 bg-neutral-200 rounded" />
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="h-3 w-24 bg-neutral-200 rounded" />
            <div className="h-3 w-20 bg-neutral-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  )
}