import Link from "next/link";

import { CalendarDays } from "lucide-react";

import SignupForm from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fbfaff]">
      {/* Decorative circles */}
      <div
        aria-hidden="true"
        className="absolute -right-24 top-16 h-72 w-72 rounded-full bg-primary-50"
      />

      <div
        aria-hidden="true"
        className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-primary-100/60"
      />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8 lg:px-8">
        {/* Brand */}
        <Link
          href="/"
          className="inline-flex w-fit items-center gap-2"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 text-white">
            <CalendarDays size={20} />
          </span>

          <span className="text-xl font-bold text-slate-800">
            BookIt
          </span>
        </Link>

        {/* Signup */}
        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-md">
            <SignupForm />
          </div>
        </div>
      </div>
    </main>
  );
}