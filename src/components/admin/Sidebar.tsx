"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  CalendarDays,
  Users,
  Wrench,
  Settings,
  X,
  type LucideIcon,
} from "lucide-react";
import LogoutButton from "./LogoutButton";

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

const NAV: NavItem[] = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Leads", href: "/admin/leads", icon: Inbox },
  { label: "Bookings", href: "/admin/bookings", icon: CalendarDays },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Services", href: "/admin/services", icon: Wrench },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Sidebar({
  userEmail,
  open,
  onClose,
}: {
  userEmail: string;
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-[#111] px-4 py-6 transition-transform duration-200 ease-out lg:z-40 lg:translate-x-0 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between gap-2 px-3">
        <Link
          href="/admin"
          onClick={onClose}
          className="font-display text-xl font-black tracking-[0.02em]"
        >
          <span className="text-redro-red">REDRO</span>
          <span className="text-white"> CLEANING</span>
        </Link>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="flex h-8 w-8 items-center justify-center rounded-[7px] text-white/60 hover:bg-white/5 hover:text-white lg:hidden"
        >
          <X size={18} />
        </button>
      </div>

      <nav className="mt-9 flex flex-1 flex-col gap-1.5">
        {NAV.map((item) => {
          const active = isActive(pathname, item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 rounded-[7px] px-3 py-2.5 font-display text-sm font-semibold tracking-[0.01em] transition-colors ${
                active
                  ? "bg-redro-red/20 text-redro-red"
                  : "text-white/50 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={18} strokeWidth={2} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-4 border-t border-white/10 pt-4">
        <div className="mb-2 px-3 text-xs text-white/40">Signed in as</div>
        <div className="mb-3 truncate px-3 text-sm font-medium text-white/80">
          {userEmail}
        </div>
        <LogoutButton />
      </div>
    </aside>
  );
}
