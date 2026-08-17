"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { loginSchema } from "@/schemas/authSchema";
import { createClient } from "@/lib/supabase/client";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  // Get the current URL search parameters.
  const searchParams = useSearchParams();


  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-50 px-4">
      <LoginForm />
    </main>
  );
}