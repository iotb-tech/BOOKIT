 "use client";

import { Menu } from "lucide-react";
import { useState } from "react";
import { AppSidebar } from "./app-sidebar";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#fafbff]">
      <div className="hidden md:fixed md:inset-y-0 md:flex">
        <AppSidebar />
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
          <div className="relative z-10">
            <AppSidebar onClose={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      <main className="min-h-screen md:ml-64">
        <div className="flex h-14 items-center border-b border-slate-200 bg-white px-4 md:hidden">
          <button onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu />
          </button>
          <span className="ml-3 font-bold text-[#20236f]">BookIt</span>
        </div>
        {children}
      </main>
    </div>
  );
}