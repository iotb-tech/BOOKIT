import Link from "next/link";
import { CalendarCheck2, Mail } from "lucide-react";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* =================================================
              BRAND
          ================================================= */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 text-white">
                <CalendarCheck2 size={20} />
              </span>

              <span className="text-xl font-bold">
                BookIt
              </span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-400">
              A simple way to discover mentors, join study groups
              and book learning sessions that help you grow.
            </p>

            {/* Contact */}
            <a
              href="mailto:hello@bookit.com"
              className="mt-5 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
            >
              <Mail size={16} />
              hello@bookit.com
            </a>
          </div>

          {/* =================================================
              EXPLORE
          ================================================= */}
          <div>
            <h4 className="text-sm font-semibold text-white">
              Explore
            </h4>

            <div className="mt-4 space-y-3 text-sm">
              <Link
                href="/#features"
                className="block text-slate-400 transition hover:text-white"
              >
                Features
              </Link>

              <Link
                href="/#how-it-works"
                className="block text-slate-400 transition hover:text-white"
              >
                How It Works
              </Link>

              <Link
                href="/resources"
                className="block text-slate-400 transition hover:text-white"
              >
                Resources
              </Link>

              <Link
                href="/#about"
                className="block text-slate-400 transition hover:text-white"
              >
                About
              </Link>
            </div>
          </div>

          {/* =================================================
              PLATFORM
          ================================================= */}
          <div>
            <h4 className="text-sm font-semibold text-white">
              Platform
            </h4>

            <div className="mt-4 space-y-3 text-sm">
              <Link
                href="/dashboard"
                className="block text-slate-400 transition hover:text-white"
              >
                Dashboard
              </Link>

              <Link
                href="/my-bookings"
                className="block text-slate-400 transition hover:text-white"
              >
                My Bookings
              </Link>

              <Link
                href="/messages"
                className="block text-slate-400 transition hover:text-white"
              >
                Messages
              </Link>

              <Link
                href="/profile"
                className="block text-slate-400 transition hover:text-white"
              >
                Profile
              </Link>
            </div>
          </div>

          {/* =================================================
              ACCOUNT
          ================================================= */}
          <div>
            <h4 className="text-sm font-semibold text-white">
              Account
            </h4>

            <div className="mt-4 space-y-3 text-sm">
              <Link
                href="/login"
                className="block text-slate-400 transition hover:text-white"
              >
                Log in
              </Link>

              <Link
                href="/signup"
                className="block text-slate-400 transition hover:text-white"
              >
                Create account
              </Link>

              <Link
                href="/settings"
                className="block text-slate-400 transition hover:text-white"
              >
                Settings
              </Link>
            </div>

            {/* Tagline */}
            <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <p className="text-sm font-semibold text-white">
                Connect. Book. Learn. Grow.
              </p>

              <p className="mt-2 text-xs leading-5 text-slate-400">
                Make every learning session count with BookIt.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =================================================
          BOTTOM FOOTER
      ================================================= */}
      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>
            © {currentYear} BookIt. All rights reserved.
          </p>

          <p>
            Built for better learning connections.
          </p>
        </div>
      </div>
    </footer>
  );
}