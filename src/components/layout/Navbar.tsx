"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { CalendarDays } from "lucide-react";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClient();

    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <nav className="flex items-center justify-between p-4 border-b text-white bg-primary-600">
      <Link href="/" className="flex items-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 text-white">
            <CalendarDays size={24} />
          </div>
          <span className="text-xl font-bold text-white">
            BookIt
          </span>
      </Link>

      <div className="flex items-center gap-4">
        <Link href="/">Home</Link>
        <Link href="/resources">Resources</Link>

        {user ? (
          <>
            <Link href="/my-bookings">My Bookings</Link>

            <button
              onClick={async () => {
                const supabase = createClient();
                await supabase.auth.signOut();
                setUser(null);
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}