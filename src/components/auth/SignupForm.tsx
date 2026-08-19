"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupPageSchema, type SignupPageFormValues } from "@/schemas/authSchema";
import { signup } from "@/lib/auth/actions";
import SocialAuthButtons from "./SocialAuthButtons";

export default function SignupForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupPageFormValues>({
    resolver: zodResolver(signupPageSchema),
    defaultValues: { firstName: "", lastName: "", email: "", password: "" },
  });

  const onSubmit = async (values: SignupPageFormValues) => {
    setServerError(null);
    setSuccessMessage(null);
    const fullName = `${values.firstName.trim()} ${values.lastName.trim()}`.trim();
    const result = await signup(fullName, values.email, values.password);

    if (!result.success) {
      setServerError(result.error ?? "Unable to create your account.");
      return;
    }
    if (result.session) {
      router.replace("/dashboard");
      router.refresh();
      return;
    }
    setSuccessMessage(result.message ?? "Account created. Please check your email.");
  };

  const inputClass = "h-10 w-full rounded-md border border-neutral-200 px-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-primary-400 focus:ring-2 focus:ring-primary-100";

  return (
    <div className="w-full rounded-lg border border-neutral-100 bg-white p-7 shadow-card sm:p-8">
      <div className="mb-5 text-center">
        <h1 className="text-2xl font-extrabold tracking-tight text-[#1d1b2f]">Create Your Account</h1>
        <p className="mt-1 text-xs text-neutral-500">Sign up to get started</p>
      </div>

      {serverError && <div role="alert" className="mb-4 rounded-md border border-red-100 bg-red-50 px-3 py-2 text-xs text-error">{serverError}</div>}
      {successMessage && <div role="status" className="mb-4 rounded-md border border-green-100 bg-green-50 px-3 py-2 text-xs text-success">{successMessage}</div>}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-3.5">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="firstName" className="mb-1.5 block text-xs font-semibold text-neutral-800">First Name</label>
            <input id="firstName" autoComplete="given-name" placeholder="John" className={inputClass} {...register("firstName")} />
            {errors.firstName && <p className="mt-1 text-xs text-error">{errors.firstName.message}</p>}
          </div>
          <div>
            <label htmlFor="lastName" className="mb-1.5 block text-xs font-semibold text-neutral-800">Last Name</label>
            <input id="lastName" autoComplete="family-name" placeholder="Doe" className={inputClass} {...register("lastName")} />
            {errors.lastName && <p className="mt-1 text-xs text-error">{errors.lastName.message}</p>}
          </div>
        </div>
        <div>
          <label htmlFor="signup-email" className="mb-1.5 block text-xs font-semibold text-neutral-800">Email</label>
          <input id="signup-email" type="email" autoComplete="email" placeholder="you@example.com" className={inputClass} {...register("email")} />
          {errors.email && <p className="mt-1 text-xs text-error">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="signup-password" className="mb-1.5 block text-xs font-semibold text-neutral-800">Password</label>
          <div className="relative">
            <input id="signup-password" type={showPassword ? "text" : "password"} autoComplete="new-password" placeholder="Min. 8 characters" className={`${inputClass} pr-10`} {...register("password")} />
            <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-neutral-400 hover:text-neutral-700" aria-label={showPassword ? "Hide password" : "Show password"}>
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
          {errors.password && <p className="mt-1 text-xs text-error">{errors.password.message}</p>}
        </div>
        <button type="submit" disabled={isSubmitting} className="h-10 w-full rounded-md bg-primary-600 text-xs font-bold text-white shadow-sm transition hover:bg-primary-700 disabled:cursor-wait disabled:opacity-60">
          {isSubmitting ? "Signing up…" : "Sign Up"}
        </button>
      </form>

      <div className="my-4 flex items-center gap-3">
        <div className="h-px flex-1 bg-neutral-200" />
        <span className="text-[10px] text-neutral-400">or continue with</span>
        <div className="h-px flex-1 bg-neutral-200" />
      </div>
      <SocialAuthButtons />
      <p className="mt-5 text-center text-xs text-neutral-500">Already have an account? <Link href="/login" className="font-semibold text-primary-700 hover:underline">Log in</Link></p>
    </div>
  );
}
