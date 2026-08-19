import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="bg-white px-6 py-16 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl bg-primary-600 px-6 py-14 text-center shadow-xl sm:px-12 lg:px-16">
          
          {/* Decorative background */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-purple-400/20 blur-3xl" />

          {/* Content */}
          <div className="relative z-10 mx-auto max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-purple-100">
              Start learning today
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to make learning easier?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-purple-100 sm:text-lg">
              Find a mentor, join a study group and book your next learning
              session with BookIt.
            </p>

            <div className="mt-8 flex justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-bold text-primary-700 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-lg"
              >
                Get Started
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}