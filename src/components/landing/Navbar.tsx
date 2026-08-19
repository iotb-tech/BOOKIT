import Link from "next/link";
import { CalendarDays } from "lucide-react";

import MobileMenu from "./MobileMenu";

export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-neutral-200 bg-white/95 backdrop-blur-md">

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600 text-white">
            <CalendarDays size={20} />
          </div>

          <span className="text-xl font-bold text-primary-700">
            BookIt
          </span>
        </Link>


        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <div className="flex justify-between items-center gap-6">
          <a
            href="#features"
            className="text-sm font-medium text-neutral-600 transition hover:text-primary-600"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="text-sm font-medium text-neutral-600 transition hover:text-primary-600"
          >
            How It Works
          </a>

          <Link
            href="/resources"
            className="text-sm font-medium text-neutral-600 transition hover:text-primary-600"
          >
            Resources
          </Link>

          <a
            href="#about"
            className="text-sm font-medium text-neutral-600 transition hover:text-primary-600"
          >
            About
          </a>
        </div>

        {/* Authentication */}
        <div className="flex items-center  justify-between gap-3">
          <Link
            href="/login"
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-indigo-600 hover:text-indigo-600"
          >
            Log in
          </Link>

          <Link
            href="/signup"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            Sign up
          </Link>
        </div>
        </nav>

  
        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <MobileMenu />
      </div>
      </div>

    </header>
  );
}