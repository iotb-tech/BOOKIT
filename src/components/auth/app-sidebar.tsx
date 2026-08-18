 "use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  // ArrowLeft,
  CalendarDays,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
  UserRound,
  Users,
  X
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const items = [
  // { href: "javascript:history.back()", label: "back", icon: ArrowLeft },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/resources", label: "Resources", icon: Users },
  { href: "/my-bookings", label: "My Bookings", icon: CalendarDays },
  { href: "#", label: "Messages", icon: MessageSquare },
  { href: "#", label: "Profile", icon: UserRound },
  { href: "#", label: "Settings", icon: Settings }
];

export function AppSidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await createClient().auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <aside className="flex min-h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white p-4">
      <div className="mb-8 flex items-center justify-between px-2">
        <Link href="/" className="flex items-center gap-2 font-bold text-[#20236f]">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#20236f] text-white">
            <CalendarDays size={17} />
          </span>
          BookIt
        </Link>
        {onClose && (
          <button onClick={onClose} className="md:hidden">
            <X size={20} />
          </button>
        )}
      </div>

      <nav className="space-y-1">
        {items.map(({ href, label, icon: Icon }) => {
          const active = href !== "#" && (pathname === href || pathname.startsWith(`${href}/`));
          return (
            <Link
              key={label}
              href={href}
              onClick={onClose}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${
                active
                  ? "bg-[#eef0ff] font-semibold text-[#20236f]"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Icon size={17} />
              {label}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={logout}
        className="mt-auto flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50"
      >
        <LogOut size={17} />
        Log out
      </button>
    </aside>
  );
}