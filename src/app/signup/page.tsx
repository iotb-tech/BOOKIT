"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signupSchema } from "@/schemas/authSchema";
import { signup } from "@/lib/auth/actions";

export default function SignupPage() {
  const router = useRouter();

  // Stores the information entered into the signup form
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Stores validation or Supabase authentication errors
  const [error, setError] = useState("");

  // Shows a loading state while the signup request is processing
  const [loading, setLoading] = useState(false);

  async function handleSignup(
    e: React.FormEvent<HTMLFormElement>
  ) {
    // Prevent the browser from refreshing the page
    e.preventDefault();

    // Clear any previous error message
    setError("");

    // Validate the form data before sending it to Supabase
    const result = signupSchema.safeParse({
      fullName,
      email,
      password,
    });

    // Stop if the form data fails validation
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setLoading(true);

    // Send the validated information to the existing signup function
    const response = await signup(
      result.data.fullName,
      result.data.email,
      result.data.password
    );

    // Display an error returned by the signup function
    if (!response.success) {
      setError(response.error);
      setLoading(false);
      return;
    }

    // Account creation was successful
    router.push("/login");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <form
        onSubmit={handleSignup}
        className="w-full max-w-md space-y-5"
      >
        <h1 className="text-3xl font-bold text-center">
          Create Account
        </h1>

        <div>
          <label htmlFor="fullName" className="block mb-2">
            Full Name
          </label>

          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
            className="w-full rounded border p-3"
          />
        </div>

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
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </form>
    </main>
  );
}