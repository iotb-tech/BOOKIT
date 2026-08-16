import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-slate-950 text-white">

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-10 md:grid-cols-4 lg:px-8">

        <div>
          <h3 className="text-xl font-bold">
            BookIt
          </h3>

          <p className="mt-4 max-w-xs text-sm leading-6 text-slate-400">
            A simple way to discover mentors, join study groups
            and book learning sessions.
          </p>
        </div>

        <div>
          <h4 className="font-semibold">
            Platform
          </h4>

          <div className="mt-4 space-y-3 text-sm text-slate-400">
            <Link className="block hover:text-white" href="/resources">
              Resources
            </Link>

            <Link className="block hover:text-white" href="/my-bookings">
              My Bookings
            </Link>
          </div>
        </div>

        <div>
          <h4 className="font-semibold">
            Account
          </h4>

          <div className="mt-4 space-y-3 text-sm text-slate-400">
            <Link className="block hover:text-white" href="/login">
              Log in
            </Link>

            <Link className="block hover:text-white" href="/signup">
              Sign up
            </Link>
          </div>
        </div>

        <div>
          <h4 className="font-semibold">
            BookIt
          </h4>

          <p className="mt-4 text-sm leading-6 text-slate-400">
            Connect. Book. Learn. Grow.
          </p>
        </div>

      </div>

      <div className="border-t border-slate-800 px-6 py-6 text-center text-sm text-slate-500">
        © 2026 BookIt. All rights reserved.
      </div>

    </footer>
  );
}