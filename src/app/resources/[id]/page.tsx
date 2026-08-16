// app/resources/[id]/page.tsx
import { ResourceDetails } from '@/components/resources/ResourceDetails'

export default function ResourceDetailPage({
  params,
}: {
  params: { id: string }
}) {
  return <ResourceDetails id={params.id} />
}