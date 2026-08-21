"use client";

import Link from "next/link";

import { useState } from "react";

import {
  Eye,
  EyeOff,
} from "lucide-react";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  signupPageSchema,
  type SignupPageFormValues,
} from "@/schemas/authSchema";

import { signup } from "@/lib/auth/actions";

import SocialAuthButtons from "./SocialAuthButtons";

export default function SignupForm() {
  const router = useRouter();

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    serverError,
    setServerError,
  ] = useState<string | null>(
    null
  );

  const [
    successMessage,
    setSuccessMessage,
  ] = useState<string | null>(
    null
  );

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } =
    useForm<SignupPageFormValues>({
      resolver: zodResolver(
        signupPageSchema
      ),

      defaultValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
    });

  /* =======================================================
     SUBMIT
  ======================================================= */

  const onSubmit = async (
    values: SignupPageFormValues
  ) => {
    setServerError(null);
    setSuccessMessage(null);

    const fullName =
      `${values.firstName.trim()} ${values.lastName.trim()}`.trim();

    const result = await signup(
      fullName,
      values.email,
      values.password
    );

    if (!result.success) {
      setServerError(
        result.error ??
          "Unable to create your account. Please try again."
      );

      return;
    }

    if (result.session) {
      router.replace(
        "/dashboard"
      );

      router.refresh();

      return;
    }

    setSuccessMessage(
      result.message ??
        "Account created. Please check your email."
    );
  };

  /* =======================================================
     INPUT STYLE
  ======================================================= */

  const inputClass =
    "h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-primary-400 focus:ring-2 focus:ring-primary-100";

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_8px_30px_rgba(15,23,42,0.06)] sm:p-8">
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight text-slate-800">
          Create Your Account
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Sign up to get started
        </p>
      </div>

      {/* =================================================
          SERVER ERROR
      ================================================= */}

      {serverError && (
        <div
          role="alert"
          className="mt-6 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600"
        >
          {serverError}
        </div>
      )}

      {/* =================================================
          SUCCESS
      ================================================= */}

      {successMessage && (
        <div
          role="status"
          className="mt-6 rounded-lg border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-700"
        >
          {successMessage}
        </div>
      )}

      {/* =================================================
          FORM
      ================================================= */}

      <form
        onSubmit={handleSubmit(
          onSubmit
        )}
        noValidate
        className="mt-7 space-y-5"
      >
        {/* ===============================================
            NAME
        =============================================== */}

        <div className="grid gap-4 sm:grid-cols-2">
          {/* FIRST NAME */}

          <div>
            <label
              htmlFor="firstName"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              First Name
            </label>

            <input
              id="firstName"
              type="text"
              autoComplete="given-name"
              placeholder="John"
              aria-invalid={Boolean(
                errors.firstName
              )}
              className={
                inputClass
              }
              {...register(
                "firstName"
              )}
            />

            {errors.firstName && (
              <p className="mt-1.5 text-xs font-medium text-red-500">
                {
                  errors
                    .firstName
                    .message
                }
              </p>
            )}
          </div>

          {/* LAST NAME */}

          <div>
            <label
              htmlFor="lastName"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Last Name
            </label>

            <input
              id="lastName"
              type="text"
              autoComplete="family-name"
              placeholder="Doe"
              aria-invalid={Boolean(
                errors.lastName
              )}
              className={
                inputClass
              }
              {...register(
                "lastName"
              )}
            />

            {errors.lastName && (
              <p className="mt-1.5 text-xs font-medium text-red-500">
                {
                  errors
                    .lastName
                    .message
                }
              </p>
            )}
          </div>
        </div>

        {/* ===============================================
            EMAIL
        =============================================== */}

        <div>
          <label
            htmlFor="signup-email"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Email
          </label>

          <input
            id="signup-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={Boolean(
              errors.email
            )}
            className={
              inputClass
            }
            {...register(
              "email"
            )}
          />

          {errors.email && (
            <p className="mt-1.5 text-xs font-medium text-red-500">
              {
                errors.email
                  .message
              }
            </p>
          )}
        </div>

        {/* ===============================================
            PASSWORD
        =============================================== */}

        <div>
          <label
            htmlFor="signup-password"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Password
          </label>

          <div className="relative">
            <input
              id="signup-password"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              autoComplete="new-password"
              placeholder="Min. 8 characters"
              aria-invalid={Boolean(
                errors.password
              )}
              className={`${inputClass} pr-11`}
              {...register(
                "password"
              )}
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  (
                    value
                  ) => !value
                )
              }
              className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-slate-400 transition hover:text-slate-700"
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showPassword ? (
                <EyeOff
                  size={17}
                />
              ) : (
                <Eye
                  size={17}
                />
              )}
            </button>
          </div>

          {errors.password && (
            <p className="mt-1.5 text-xs font-medium text-red-500">
              {
                errors
                  .password
                  .message
              }
            </p>
          )}
        </div>

        {/* ===============================================
            SIGNUP BUTTON
        =============================================== */}

        <button
          type="submit"
          disabled={
            isSubmitting
          }
          className="flex h-11 w-full items-center justify-center rounded-lg bg-primary-600 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700 disabled:cursor-wait disabled:opacity-60"
        >
          {isSubmitting
            ? "Signing up..."
            : "Sign Up"}
        </button>
      </form>

      {/* =================================================
          DIVIDER
      ================================================= */}

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-slate-200" />

        <span className="whitespace-nowrap text-xs text-slate-400">
          or continue with
        </span>

        <div className="h-px flex-1 bg-slate-200" />
      </div>

      {/* =================================================
          SOCIAL AUTH
      ================================================= */}

      <SocialAuthButtons />

      {/* =================================================
          LOGIN LINK
      ================================================= */}

      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an
        account?{" "}

        <Link
          href="/login"
          className="font-semibold text-primary-700 transition hover:text-primary-800 hover:underline"
        >
          Log in
        </Link>
      </p>
    </div>
  );
}