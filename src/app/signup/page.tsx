import Link from "next/link";
import { CalendarCheck2 } from "lucide-react";
import SignupForm from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#faf9ff] px-5 py-7">
      <div className="pointer-events-none absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-primary-100/70" />
      <div className="pointer-events-none absolute -right-32 top-16 h-80 w-80 rounded-full bg-primary-50" />
      <Link href="/" className="relative z-10 mx-auto flex max-w-7xl items-center gap-2.5 text-[#2b2451]">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white"><CalendarCheck2 size={18} /></span>
        <span className="text-lg font-bold">BookIt</span>
      </Link>
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-88px)] w-full max-w-[450px] items-center justify-center py-5">
        <SignupForm />
      </div>
    </main>
  );
}
