"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="rounded-lg p-2 text-neutral-800 transition hover:bg-neutral-100"
      >
        {open ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* Mobile Menu */}
      {open && (
        <>
          {/* Background overlay */}
          <button
            type="button"
            aria-label="Close menu"
            onClick={closeMenu}
            className="fixed inset-0 top-20 z-40 bg-black/20"
          />

          {/* Menu panel */}
          <div className="absolute left-0 right-0 top-20 z-50 border-t border-neutral-200 bg-white px-6 py-6 shadow-lg">

            <nav className="flex flex-col">

              <a
                href="#features"
                onClick={closeMenu}
                className="border-b border-neutral-100 py-4 text-sm font-medium text-neutral-800 transition hover:text-primary-600"
              >
                Features
              </a>

              <a
                href="#how-it-works"
                onClick={closeMenu}
                className="border-b border-neutral-100 py-4 text-sm font-medium text-neutral-800 transition hover:text-primary-600"
              >
                How It Works
              </a>

              <Link
                href="/resources"
                onClick={closeMenu}
                className="border-b border-neutral-100 py-4 text-sm font-medium text-neutral-800 transition hover:text-primary-600"
              >
                Resources
              </Link>

              <a
                href="#about"
                onClick={closeMenu}
                className="border-b border-neutral-100 py-4 text-sm font-medium text-neutral-800 transition hover:text-primary-600"
              >
                About
              </a>

              {/* Auth buttons */}
              <div className="mt-5 flex flex-col gap-3">

                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-center text-sm font-semibold text-neutral-800 transition hover:border-primary-500 hover:text-primary-600"
                >
                  Log in
                </Link>

                <Link
                  href="/signup"
                  onClick={closeMenu}
                  className="w-full rounded-lg bg-primary-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-primary-700"
                >
                  Sign up
                </Link>

              </div>

            </nav>

          </div>
        </>
      )}
    </div>
  );
}