import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ResourceList } from "@/components/resources/ResourceList";

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-[#fbfbfd] px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-7xl">

        <Link
          href="/dashboard"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-primary-700"
        >
          <ArrowLeft size={17} />
          Back to Dashboard
        </Link>

        <ResourceList />
      </div>
    </main>
  );
}