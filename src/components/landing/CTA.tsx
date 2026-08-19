import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="px-6 py-10">

      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl px-8 py-16 text-center text-white shadow-2xl shadow-primary-200">

        <h2 className="text-3xl font-bold sm:text-4xl">
          Ready to make learning easier?
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-primary-100">
          Find a mentor, join a study group and book your
          next learning session with BookIt.
        </p>

        <Link
          href="/signup"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-primary-700 transition hover:bg-primary-50"
        >
          Get Started
          <ArrowRight size={18} />
        </Link>

      </div>

    </section>
  );
}