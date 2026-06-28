"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { SiteSettings } from "@/types/admin";

const inputClasses =
  "h-11 w-full rounded-[7px] border-[1.5px] border-[#E6E4E0] bg-redro-cream px-4 text-sm text-[#111] outline-none focus:border-redro-red";
const labelClasses =
  "font-display mb-1.5 block text-[11px] font-semibold tracking-[0.06em] text-[#444] uppercase";

export default function SettingsForm({ settings }: { settings: SiteSettings }) {
  const router = useRouter();
  const [form, setForm] = useState({
    adminEmail: settings.adminEmail,
    contactEmail: settings.contactEmail,
    phone: settings.phone,
    businessName: settings.businessName,
    emailFrom: settings.emailFrom,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSaved(false);

    const res = await fetch("/api/admin/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setSaving(false);
    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      setError(data?.error ?? "Could not save settings.");
      return;
    }
    setSaved(true);
    router.refresh();
  }

  const fields: {
    id: keyof typeof form;
    label: string;
    type?: string;
    hint?: string;
  }[] = [
    {
      id: "adminEmail",
      label: "Admin Notification Email",
      type: "email",
      hint: "Where new quote requests are sent.",
    },
    {
      id: "contactEmail",
      label: "Public Contact Email",
      type: "email",
      hint: "Shown to visitors on the website.",
    },
    {
      id: "phone",
      label: "Business Phone",
      hint: "Shown on the website and used for call/SMS links.",
    },
    { id: "businessName", label: "Business Name" },
    {
      id: "emailFrom",
      label: '"From" Email Address',
      hint: "The sender address on outgoing emails.",
    },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[14px] border border-redro-border bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
    >
      {error && (
        <div className="mb-5 rounded-[7px] border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      )}
      {saved && (
        <div className="mb-5 rounded-[7px] border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          Settings saved.
        </div>
      )}

      <div className="flex flex-col gap-4">
        {fields.map((field) => (
          <div key={field.id}>
            <label htmlFor={field.id} className={labelClasses}>
              {field.label}
            </label>
            <input
              id={field.id}
              type={field.type ?? "text"}
              required
              value={form[field.id]}
              onChange={(e) => {
                setForm({ ...form, [field.id]: e.target.value });
                setSaved(false);
              }}
              className={inputClasses}
            />
            {field.hint && (
              <p className="mt-1.5 text-xs text-[#999]">{field.hint}</p>
            )}
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={saving}
        className="font-display mt-6 rounded-[7px] bg-redro-red px-6 py-3 text-sm font-bold tracking-[0.05em] text-white uppercase shadow-[0_6px_20px_rgba(212,31,31,0.25)] transition-opacity hover:opacity-95 disabled:opacity-60"
      >
        {saving ? "Saving…" : "Save Changes"}
      </button>
    </form>
  );
}
