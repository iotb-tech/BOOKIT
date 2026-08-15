// components/resources/ResourceList.tsx
'use client'
import { useState, useMemo } from 'react'
import { useResources } from '@/lib/resources/hooks'
import { ResourceCard } from './ResourceCard'
import { ResourceListSkeleton } from './ResourceListSkeleton'
import { ResourceError } from './ResourceError'
import { ResourceEmpty } from './ResourceEmpty'
import { ResourceStatus } from '@/types/resource'

const FILTERS: { label: string; value: ResourceStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Available', value: 'available' },
  { label: 'Limited', value: 'limited' },
  { label: 'Unavailable', value: 'unavailable' },
]

export function ResourceList() {
  const { data, isLoading, isError, refetch } = useResources()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<ResourceStatus | 'all'>('all')

  const filtered = useMemo(() => {
    if (!data) return []
    return data.filter((r) => {
      const matchesSearch =
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        (r.owner_name ?? '').toLowerCase().includes(search.toLowerCase()) ||
        (r.type ?? '').toLowerCase().includes(search.toLowerCase())
      const matchesStatus = statusFilter === 'all' || r.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [data, search, statusFilter])

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl font-bold sm:text-3xl">All Resources</h1>
      <p className="text-sm text-neutral-600 mt-1">
        Find mentors or study groups and book a time that works for you.
      </p>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search resources, mentors, or study groups..."
        className="mt-4 w-full sm:max-w-md border border-neutral-200 rounded px-3 py-2.5 text-sm"
      />

      <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setStatusFilter(f.value)}
            className={`text-sm px-3 py-1.5 rounded-full whitespace-nowrap border ${
              statusFilter === f.value
                ? 'bg-primary-600 text-white border-primary-600'
                : 'border-neutral-200 text-neutral-600'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {isLoading && <ResourceListSkeleton />}
        {isError && <ResourceError onRetry={() => refetch()} />}
        {!isLoading && !isError && filtered.length === 0 && (
          <ResourceEmpty searchTerm={search} />
        )}
        {!isLoading && !isError && filtered.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {filtered.map((r) => (
              <ResourceCard key={r.id} resource={r} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}