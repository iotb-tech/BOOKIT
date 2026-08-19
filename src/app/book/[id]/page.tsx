import BookingForm from "@/components/booking/BookingForm";

export default async function BookPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <main className="min-h-screen bg-white"><BookingForm resourceId={id} /></main>;
}
