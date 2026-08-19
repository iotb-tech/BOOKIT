import Link from "next/link";

import {
  CalendarCheck2,
  MessageSquare,
  Search,
  Sparkles,
} from "lucide-react";

import AppShell from "@/components/layout/AppShell";
import PageBadge from "@/components/ui/PageBadge";

export default function MessagesPage() {
  return (
    <AppShell>
      <main className="px-6 py-8 sm:px-8 lg:px-12 lg:py-10">
        <div className="mx-auto max-w-6xl">

          {/* =========================================
              PAGE HEADER
          ========================================= */}

          <div>
            <PageBadge label="Messages" />

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-800">
              Stay connected around your sessions
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Messaging will make it easier to communicate with mentors
              and study-group members directly from BookIt.
            </p>
          </div>

          {/* =========================================
              COMING SOON
          ========================================= */}

          <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_2px_12px_rgba(15,23,42,0.03)]">

            <div className="flex flex-col items-center px-6 py-16 text-center sm:px-10">

              {/* Icon */}
              <div className="relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-primary-700">
                  <MessageSquare
                    size={28}
                    strokeWidth={1.8}
                  />
                </div>

                <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                  <Sparkles
                    size={14}
                  />
                </span>
              </div>

              {/* Coming soon */}
              <span className="mt-6 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-700">
                Coming Soon
              </span>

              <h2 className="mt-4 text-xl font-semibold text-slate-800">
                BookIt Messaging
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
                Soon, you&apos;ll be able to communicate with mentors and
                fellow study-group members about confirmed sessions without
                leaving BookIt.
              </p>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                For now, you can manage your confirmed sessions from My
                Bookings or find another mentor or study group.
              </p>

              {/* Actions */}
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">

                <Link
                  href="/my-bookings"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700"
                >
                  <CalendarCheck2
                    size={17}
                  />
                  View My Bookings
                </Link>

                <Link
                  href="/resources"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-600 transition hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700"
                >
                  <Search
                    size={17}
                  />
                  Find a Session
                </Link>

              </div>
            </div>
          </section>
        </div>
      </main>
    </AppShell>
  );
}