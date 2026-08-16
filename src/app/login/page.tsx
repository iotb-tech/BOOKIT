"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { loginSchema } from "@/schemas/authSchema";
import { createClient } from "@/lib/supabase/client";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  // Get the current URL search parameters.
  const searchParams = useSearchParams();

  // Get the page the user originally wanted to visit.
  const redirectTo =
    searchParams.get("redirectTo") || "/my-bookings";

  // Used to redirect the user after successful login.
  const router = useRouter();

  // Store the values entered in the login form.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Store authentication errors.
  const [error, setError] = useState("");

  // Track whether the login request is in progress.
  const [loading, setLoading] = useState(false);

  async function handleLogin(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    // Clear any previous error.
    setError("");

    // Validate the email and password before sending them to Supabase.
    const result = loginSchema.safeParse({
      email,
      password,
    });

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setLoading(true);

    // Create the Supabase browser client.
    const supabase = createClient();

    // Attempt to sign the user in.
    const { error } = await supabase.auth.signInWithPassword({
      email: result.data.email,
      password: result.data.password,
    });

    // Display the Supabase error if login fails.
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
    <main className="flex min-h-screen items-center justify-center bg-neutral-50 px-4">
      <LoginForm />
    </main>
  );
}