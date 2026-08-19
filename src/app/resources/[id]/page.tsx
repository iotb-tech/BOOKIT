import { ResourceDetails } from "@/components/resources/ResourceDetails";

export default async function ResourceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl bg-white px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <ResourceDetails id={id} />
    </main>
  );
}
