"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { loginSchema } from "@/schemas/authSchema";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {

const searchParams = useSearchParams();

// Get the page the user originally wanted to visit.
const redirectTo = searchParams.get("redirectTo") || "/my-bookings";


  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");

    const result = loginSchema.safeParse({
      email,
      password,
    });

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setLoading(true);

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email: result.data.email,
      password: result.data.password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

     // Send the user back to the page they originally requested.
    router.push(redirectTo); 
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md space-y-5"
      >
        <h1 className="text-3xl font-bold text-center">
          Login
        </h1>

        <div>
          <label htmlFor="email" className="block mb-2">
            Email
          </label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full rounded border p-3"
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-2">
            Password
          </label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full rounded border p-3"
          />
        </div>

        {error && (
          <p className="text-red-600 text-sm">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-black p-3 text-white"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </main>
  );
}