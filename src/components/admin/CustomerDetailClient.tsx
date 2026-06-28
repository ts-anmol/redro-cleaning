"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { serviceLabel, type CustomerWithBookings } from "@/types/admin";
import { formatDateTime, formatPrice } from "@/lib/format";
import StatusBadge from "./StatusBadge";
import { TD_CLASS, TH_CLASS } from "./tablePrimitives";

const inputClasses =
  "h-11 w-full rounded-[7px] border-[1.5px] border-[#E6E4E0] bg-redro-cream px-4 text-sm text-[#111] outline-none focus:border-redro-red";
const labelClasses =
  "font-display mb-1.5 block text-[11px] font-semibold tracking-[0.06em] text-[#444] uppercase";

export default function CustomerDetailClient({
  customer,
}: {
  customer: CustomerWithBookings;
}) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    firstName: customer.firstName,
    lastName: customer.lastName,
    email: customer.email,
    phone: customer.phone,
    address: customer.address ?? "",
    notes: customer.notes ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const res = await fetch(`/api/admin/customers/${customer.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      setError(data?.error ?? "Could not save changes.");
      return;
    }
    setEditing(false);
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link
          href="/admin/customers"
          className="mb-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#666] hover:text-redro-red"
        >
          <ArrowLeft size={16} />
          Back to customers
        </Link>
        <h1 className="font-display text-2xl font-extrabold text-[#111]">
          {customer.firstName} {customer.lastName}
        </h1>
        <p className="mt-1 text-sm text-[#666]">
          {customer.bookings.length} booking
          {customer.bookings.length === 1 ? "" : "s"} on record
        </p>
      </div>

      {error && (
        <div className="rounded-[7px] border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.6fr]">
        {/* Info card */}
        <section className="rounded-[14px] border border-redro-border bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-base font-bold text-[#111]">
              Customer Info
            </h2>
            {!editing && (
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="font-display text-[13px] font-bold tracking-[0.04em] text-redro-red uppercase"
              >
                Edit
              </button>
            )}
          </div>

          {editing ? (
            <form onSubmit={handleSave} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="firstName" className={labelClasses}>
                    First Name
                  </label>
                  <input
                    id="firstName"
                    required
                    value={form.firstName}
                    onChange={(e) =>
                      setForm({ ...form, firstName: e.target.value })
                    }
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className={labelClasses}>
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    required
                    value={form.lastName}
                    onChange={(e) =>
                      setForm({ ...form, lastName: e.target.value })
                    }
                    className={inputClasses}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className={labelClasses}>
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClasses}
                />
              </div>
              <div>
                <label htmlFor="phone" className={labelClasses}>
                  Phone
                </label>
                <input
                  id="phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={inputClasses}
                />
              </div>
              <div>
                <label htmlFor="address" className={labelClasses}>
                  Address
                </label>
                <input
                  id="address"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className={inputClasses}
                />
              </div>
              <div>
                <label htmlFor="notes" className={labelClasses}>
                  Notes
                </label>
                <textarea
                  id="notes"
                  rows={3}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className={`${inputClasses} h-auto resize-none py-2.5`}
                />
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="font-display rounded-[7px] bg-redro-red px-6 py-3 text-sm font-bold tracking-[0.05em] text-white uppercase shadow-[0_6px_20px_rgba(212,31,31,0.25)] disabled:opacity-60"
                >
                  {saving ? "Saving…" : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditing(false);
                    setError("");
                  }}
                  className="text-sm font-medium text-[#666] hover:text-[#111]"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <dl className="flex flex-col">
              {[
                ["Email", customer.email],
                ["Phone", customer.phone || "—"],
                ["Address", customer.address || "—"],
                ["Notes", customer.notes || "—"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="border-b border-redro-border py-3 last:border-b-0"
                >
                  <dt className="font-display text-[11px] font-semibold tracking-[0.06em] text-[#999] uppercase">
                    {label}
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-[#111]">{value}</dd>
                </div>
              ))}
            </dl>
          )}
        </section>

        {/* Bookings history */}
        <section className="overflow-hidden rounded-[14px] border border-redro-border bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
          <div className="border-b border-redro-border px-6 py-4">
            <h2 className="font-display text-base font-bold text-[#111]">
              Booking History
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-redro-border bg-redro-cream">
                  <th className={TH_CLASS}>Service</th>
                  <th className={TH_CLASS}>Scheduled</th>
                  <th className={TH_CLASS}>Price</th>
                  <th className={TH_CLASS}>Status</th>
                </tr>
              </thead>
              <tbody>
                {customer.bookings.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-10 text-center text-sm text-[#999]">
                      No bookings yet.
                    </td>
                  </tr>
                ) : (
                  customer.bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-redro-cream/60">
                      <td className={TD_CLASS}>
                        {serviceLabel(booking.serviceType)}
                      </td>
                      <td className={TD_CLASS}>
                        {formatDateTime(booking.scheduledAt)}
                      </td>
                      <td className={TD_CLASS}>{formatPrice(booking.price)}</td>
                      <td className={TD_CLASS}>
                        <StatusBadge status={booking.status} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
