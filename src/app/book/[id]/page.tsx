import BookingForm from "@/components/booking/BookingForm";

export default async function BookPage({
  params,
  searchParams,
}: {
  params: Promise<{
    id: string;
  }>;

  searchParams: Promise<{
    slot?:
      | string
      | string[];
  }>;
}) {
  const { id } =
    await params;

  const query =
    await searchParams;

  const slotId =
    Array.isArray(
      query.slot
    )
      ? query.slot[0]
      : query.slot;

  return (
    <main className="min-h-screen bg-[#fbfbfd] px-4 py-8 sm:px-6 lg:px-8">
      <BookingForm
        resourceId={id}
        slotId={slotId}
      />
    </main>
  );
}