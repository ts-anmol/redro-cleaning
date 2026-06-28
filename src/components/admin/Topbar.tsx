"use client";

import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

const TITLES: { match: (p: string) => boolean; title: string }[] = [
  { match: (p) => p === "/admin", title: "Overview" },
  { match: (p) => p.startsWith("/admin/leads"), title: "Leads" },
  { match: (p) => p === "/admin/bookings/new", title: "New Booking" },
  { match: (p) => p.startsWith("/admin/bookings"), title: "Bookings" },
  { match: (p) => p.startsWith("/admin/customers"), title: "Customers" },
  { match: (p) => p.startsWith("/admin/services"), title: "Services" },
  { match: (p) => p.startsWith("/admin/settings"), title: "Settings" },
];

function titleFor(pathname: string): string {
  return TITLES.find((t) => t.match(pathname))?.title ?? "Admin";
}

export default function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const pathname = usePathname();
  const today = new Date().toLocaleDateString("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-redro-border bg-white px-4 sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open menu"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[7px] border border-redro-border text-[#333] lg:hidden"
        >
          <Menu size={18} />
        </button>
        <h1 className="font-display truncate text-lg font-bold text-[#111]">
          {titleFor(pathname)}
        </h1>
      </div>
      <div className="shrink-0 text-xs text-[#888] sm:text-sm">{today}</div>
    </header>
  );
}
