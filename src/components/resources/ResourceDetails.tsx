'use client'
import Link from 'next/link'
import { useResource } from '@/hooks/useResource'
import { ResourceDetailSkeleton } from './ResourceDetailSkeleton'
import { ResourceError } from './ResourceError'
import { StatusBadge } from './StatusBadge'

export function ResourceDetails({ id }: { id: string }) {
  const { resource, isLoading, isError, refetch } = useResource(id)

  if (isLoading) return <ResourceDetailSkeleton />
  if (isError || !resource) return <ResourceError onRetry={() => refetch()} />

  const isBookable = resource.status === 'available'
  const initial = (resource.owner_name ?? resource.name).charAt(0).toUpperCase()

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 flex flex-col gap-6 md:grid md:grid-cols-3">
      <div className="md:col-span-2 md:order-1 bg-white border border-neutral-200 rounded-lg p-5">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary-100 text-primary-700 text-xl font-semibold flex items-center justify-center shrink-0">
            {initial}
          </div>
          <div className="min-w-0">
            <h1 className="text-lg font-semibold sm:text-xl text-neutral-900 truncate">
              {resource.name}
            </h1>
            {resource.type && (
              <p className="text-sm text-neutral-600">{resource.type}</p>
            )}
            {resource.owner_name && (
              <p className="text-sm text-neutral-600">with {resource.owner_name}</p>
            )}
          </div>
        </div>

        <p className="text-base text-neutral-800 mt-4">{resource.description}</p>

        {resource.skills && resource.skills.length > 0 && (
          <div className="flex gap-2 mt-4 flex-wrap">
            {resource.skills.map((skill) => (
              <span
                key={skill}
                className="text-sm bg-primary-50 text-primary-700 px-2 py-1 rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white border border-neutral-200 rounded-lg p-4 md:order-2 md:sticky md:top-6 md:h-fit">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium text-neutral-900">Session details</p>
          <StatusBadge status={resource.status} />
        </div>

        {resource.duration_minutes && (
          <p className="text-sm text-neutral-600">
            Duration: {resource.duration_minutes} min
          </p>
        )}

     {isBookable ? (
  <Link
    href={`/book/${resource.id}`}
    className="mt-4 block w-full text-center bg-primary-600 text-white text-sm font-medium py-3 rounded-lg hover:bg-primary-700 transition-colors"
  >
    Book Now
  </Link>
) : (
  <button
    disabled
    className="mt-4 block w-full text-center bg-neutral-200 text-neutral-400 text-sm font-medium py-3 rounded-lg cursor-not-allowed"
  >
    {resource.status === 'maintenance' ? 'Under Maintenance' : 'Currently Unavailable'}
  </button>
)}
      </div>
    </div>
  )
}