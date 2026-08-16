"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signup } from "@/lib/auth/actions";

const signupSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (values: SignupFormValues) => {
    setServerError(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    const fullName =
      `${values.firstName.trim()} ${values.lastName.trim()}`.trim();
    const result = await signup(fullName, values.email, values.password);

    setIsSubmitting(false);

    if (!result.success) {
      setServerError(result.error ?? "Something went wrong. Please try again.");
      return;
    }

    if (result.session) {
      router.push("/dashboard");
      return;
    }

    setSuccessMessage(
      result.message ?? "Account created. Please check your email.",
    );
  };

  return (
    <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-sm">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-neutral-900">
          Create Your Account
        </h1>
        <p className="mt-1 text-sm text-neutral-600">Sign up to get started</p>
      </div>

      {serverError && (
        <div
          role="alert"
          className="mb-4 rounded-lg border border-error/20 bg-red-50 px-4 py-3 text-sm text-error"
        >
          {serverError}
        </div>
      )}

      {successMessage && (
        <div
          role="status"
          className="mb-4 rounded-lg border border-success/20 bg-green-50 px-4 py-3 text-sm text-success"
        >
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="firstName"
              className="mb-1 block text-sm font-medium text-neutral-800"
            >
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              autoComplete="given-name"
              placeholder="John"
              aria-invalid={!!errors.firstName}
              aria-describedby={
                errors.firstName ? "firstName-error" : undefined
              }
              className={`w-full rounded-lg border px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                errors.firstName ? "border-error" : "border-neutral-200"
              }`}
              {...register("firstName")}
            />
            {errors.firstName && (
              <p id="firstName-error" className="mt-1 text-sm text-error">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="mb-1 block text-sm font-medium text-neutral-800"
            >
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              autoComplete="family-name"
              placeholder="Doe"
              aria-invalid={!!errors.lastName}
              aria-describedby={errors.lastName ? "lastName-error" : undefined}
              className={`w-full rounded-lg border px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                errors.lastName ? "border-error" : "border-neutral-200"
              }`}
              {...register("lastName")}
            />
            {errors.lastName && (
              <p id="lastName-error" className="mt-1 text-sm text-error">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-1 block text-sm font-medium text-neutral-800"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`w-full rounded-lg border px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.email ? "border-error" : "border-neutral-200"
            }`}
            {...register("email")}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-sm text-error">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-1 block text-sm font-medium text-neutral-800"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Min. 8 characters"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
              className={`w-full rounded-lg border px-3 py-2 pr-10 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                errors.password ? "border-error" : "border-neutral-200"
              }`}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-sm text-neutral-400 hover:text-neutral-600"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && (
            <p id="password-error" className="mt-1 text-sm text-error">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-primary-600 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Signing up…" : "Sign Up"}
        </button>
      </form>

      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-neutral-200" />
        <span className="text-xs text-neutral-400">or continue with</span>
        <div className="h-px flex-1 bg-neutral-200" />
      </div>

      <p className="mt-6 text-center text-sm text-neutral-600">
        Already have an account?{" "}
        <a
          href="/login"
          className="font-medium text-primary-600 hover:underline"
        >
          Log in
        </a>
      </p>
    </div>
  );
}
