// app/resources/[id]/page.tsx
import { ResourceDetails } from '@/components/resources/ResourceDetails'

export default async function ResourceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const {id} = await params
  return <ResourceDetails id={id} />
}