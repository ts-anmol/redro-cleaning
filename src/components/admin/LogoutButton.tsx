"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { useState } from "react";

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);

  return (
    <button
      type="button"
      disabled={loading}
      onClick={async () => {
        setLoading(true);
        await signOut({ callbackUrl: "/admin/login" });
      }}
      className="flex w-full items-center gap-2.5 rounded-[7px] px-3 py-2.5 text-sm font-medium text-white/50 transition-colors hover:bg-white/5 hover:text-white disabled:opacity-60"
    >
      <LogOut size={18} strokeWidth={2} />
      {loading ? "Signing out…" : "Log out"}
    </button>
  );
}
