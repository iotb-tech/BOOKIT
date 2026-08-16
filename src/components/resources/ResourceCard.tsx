// components/resources/ResourceCard.tsx
import Link from 'next/link'
import { Resource } from '@/types/resource'
import { StatusBadge } from './StatusBadge'

export function ResourceCard({ resource }: { resource: Resource }) {
  const initial = (resource.owner_name ?? resource.name).charAt(0).toUpperCase()

  return (
    <Link
      href={`/resources/${resource.id}`}
      className="block border border-neutral-200 rounded-lg p-4 active:bg-neutral-50 md:hover:shadow-sm transition-shadow"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold flex items-center justify-center shrink-0">
            {initial}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">{resource.name}</p>
            {resource.type && (
              <p className="text-sm text-neutral-600 truncate">{resource.type}</p>
            )}
          </div>
        </div>
        <StatusBadge status={resource.status} />
      </div>

      <p className="text-sm text-neutral-600 mt-3 line-clamp-2">
        {resource.description}
      </p>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-sm text-neutral-600">
        {resource.owner_name && <span>with {resource.owner_name}</span>}
        {resource.duration_minutes && <span>{resource.duration_minutes} min</span>}
      </div>
    </Link>
  )
}