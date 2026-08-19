import AppShell from "@/components/layout/AppShell";
import PageBadge from "@/components/ui/PageBadge";
import { ShieldCheck } from "lucide-react";

export default function SettingsPage() {
  return (
    <AppShell>
      <main className="px-6 py-8 sm:px-8 lg:px-12 lg:py-10">
        <div className="mx-auto max-w-6xl">

          {/* Page Header */}
          <div>
            <PageBadge label="Settings" />

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-800">
              Manage your account
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Manage your BookIt preferences, authentication and security.
            </p>
          </div>

          {/* Settings Card */}
          <section className="mt-8 max-w-xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                <ShieldCheck size={21} />
              </div>

              <div>
                <h2 className="text-base font-semibold text-slate-800">
                  Account settings
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Authentication, session security and sign-in providers are
                  securely managed through your BookIt account.
                </p>
              </div>

            </div>

          </section>

        </div>
      </main>
    </AppShell>
  );
}