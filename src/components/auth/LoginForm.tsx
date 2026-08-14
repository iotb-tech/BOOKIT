"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { login } from "@/lib/auth/actions";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginFormValues) => {
    setServerError(null);
    setIsSubmitting(true);

    const result = await login(values.email, values.password);

    setIsSubmitting(false);

    if (!result.success) {
      setServerError(result.error ?? "Something went wrong. Please try again.");
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-sm">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-neutral-900">Welcome Back 👋</h1>
        <p className="mt-1 text-sm text-neutral-600">Log in to your account</p>
      </div>

      {serverError && (
        <div
          role="alert"
          className="mb-4 rounded-lg border border-error/20 bg-red-50 px-4 py-3 text-sm text-error"
        >
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
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
          <div className="mb-1 flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-neutral-800"
            >
              Password
            </label>
            <a
              href="/forgot-password"
              className="text-sm text-primary-600 hover:underline"
            >
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
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
          {isSubmitting ? "Logging in…" : "Log In"}
        </button>
      </form>

      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-neutral-200" />
        <span className="text-xs text-neutral-400">or continue with</span>
        <div className="h-px flex-1 bg-neutral-200" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          disabled
          title="Coming soon"
          className="flex items-center justify-center gap-2 rounded-lg border border-neutral-200 py-2 text-sm text-neutral-400 cursor-not-allowed"
        >
          Google
        </button>
        <button
          type="button"
          disabled
          title="Coming soon"
          className="flex items-center justify-center gap-2 rounded-lg border border-neutral-200 py-2 text-sm text-neutral-400 cursor-not-allowed"
        >
          GitHub
        </button>
      </div>

      <p className="mt-6 text-center text-sm text-neutral-600">
        Don&apos;t have an account?{" "}
        <a
          href="/signup"
          className="font-medium text-primary-600 hover:underline"
        >
          Sign up
        </a>
      </p>
    </div>
  );
}
