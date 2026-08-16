interface ResourceErrorProps {
  onRetry: () => void
  message?: string
}

export function ResourceError({ onRetry, message }: ResourceErrorProps) {
  return (
    <div className=" bg-white text-center py-12 border border-neutral-200 rounded-lg">
      <p className="text-base text-error">
        {message ?? "Couldn't load resources. Please try again."}
      </p>
      <button
        onClick={onRetry}
        className="mt-3 text-sm font-medium text-primary-600 hover:text-primary-700"
      >
        Retry
      </button>
    </div>
  )
}