import AppShell from "@/components/layout/AppShell";
import PageBadge from "@/components/ui/PageBadge";
import { getCurrentUser } from "@/lib/auth/actions";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  const fullName =
    (user?.user_metadata?.full_name as string | undefined) ||
    user?.email?.split("@")[0] ||
    "BookIt User";

  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <AppShell>
      <main className="px-6 py-8 sm:px-8 lg:px-12 lg:py-10">
        <div className="mx-auto max-w-6xl">

          {/* Page Header */}
          <div>
            <PageBadge label="Profile" />

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-800">
              Your BookIt profile
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              View and manage your BookIt account information.
            </p>
          </div>

          {/* Profile Card */}
          <section className="mt-8 max-w-xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-5">

              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary-100 text-base font-semibold text-primary-700">
                {initials}
              </div>

              <div>
                <p className="text-lg font-semibold text-slate-800">
                  {fullName}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {user?.email}
                </p>
              </div>

            </div>
          </section>

        </div>
      </main>
    </AppShell>
  );
}