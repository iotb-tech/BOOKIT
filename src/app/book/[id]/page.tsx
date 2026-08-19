import { notFound } from "next/navigation";

import BookingForm from "@/components/booking/BookingForm";
import { createClient } from "@/lib/supabase/server";

type BookingPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function BookingPage({
  params,
}: BookingPageProps) {
  const { id } = await params;

  const supabase = await createClient();

  // Find the resource the user wants to book
  const { data: resource, error } = await supabase
    .from("resources")
    .select("id, name, description")
    .eq("id", id)
    .maybeSingle();

  // Show Next.js 404 page if the resource does not exist
  if (error || !resource) {
    notFound();
  }

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-2xl space-y-6">
        {/* Resource information */}
        <div>
          <h1 className="text-3xl font-bold">
            Book {resource.name}
          </h1>

          {resource.description && (
            <p className="mt-2 text-gray-600">
              {resource.description}
            </p>
          )}
        </div>

        {/* Booking form */}
        <BookingForm resourceId={resource.id} />
      </div>
    </main>
  );
}