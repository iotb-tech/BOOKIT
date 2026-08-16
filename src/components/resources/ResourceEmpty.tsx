interface ResourceEmptyProps {
  searchTerm?: string
}

export function ResourceEmpty({ searchTerm }: ResourceEmptyProps) {
  return (
    <div className="text-center py-12 border border-neutral-200 rounded-lg">
      <p className="text-base text-neutral-600">
        {searchTerm
          ? `No resources match "${searchTerm}".`
          : 'No resources found yet.'}
      </p>
      {searchTerm && (
        <p className="text-sm text-neutral-400 mt-1">Try a different search term.</p>
      )}
    </div>
  )
}