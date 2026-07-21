"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import {
  LEAD_STATUSES,
  serviceLabel,
  bedroomLabel,
  type LeadStatus,
  type LeadWithBooking,
} from "@/types/admin";
import { formatDate, formatDateTime, formatPrice } from "@/lib/format";
import StatusBadge from "./StatusBadge";

const inputClasses =
  "h-11 w-full rounded-[7px] border-[1.5px] border-[#E6E4E0] bg-redro-cream px-4 text-sm text-[#111] outline-none focus:border-redro-red";
const labelClasses =
  "font-display mb-1.5 block text-[11px] font-semibold tracking-[0.06em] text-[#444] uppercase";

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-redro-border py-3 last:border-b-0">
      <div className="font-display text-[11px] font-semibold tracking-[0.06em] text-[#999] uppercase">
        {label}
      </div>
      <div className="mt-1 text-sm font-medium text-[#111]">{value}</div>
    </div>
  );
}

export default function LeadDetailClient({ lead }: { lead: LeadWithBooking }) {
  const router = useRouter();
  const fullName = `${lead.firstName} ${lead.lastName}`;

  const [status, setStatus] = useState<LeadStatus>(lead.status);
  const [notes, setNotes] = useState(lead.notes ?? "");
  const [notesSaving, setNotesSaving] = useState(false);
  const [statusSaving, setStatusSaving] = useState(false);

  const [showConvert, setShowConvert] = useState(false);
  // Prefill the booking address from the lead so the admin doesn't retype it.
  const [convert, setConvert] = useState({
    address: lead.address ?? "",
    scheduledAt: "",
    price: "",
  });
  const [converting, setConverting] = useState(false);
  const [error, setError] = useState("");

  async function patch(body: Record<string, unknown>): Promise<boolean> {
    setError("");
    const res = await fetch(`/api/admin/leads/${lead.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      setError(data?.error ?? "Something went wrong.");
      return false;
    }
    return true;
  }

  async function saveStatus(next: LeadStatus) {
    setStatus(next);
    setStatusSaving(true);
    const ok = await patch({ status: next });
    setStatusSaving(false);
    if (ok) router.refresh();
  }

  async function saveNotes() {
    setNotesSaving(true);
    const ok = await patch({ notes });
    setNotesSaving(false);
    if (ok) router.refresh();
  }

  async function handleConvert(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setConverting(true);
    const ok = await patch({
      action: "convert",
      address: convert.address,
      scheduledAt: convert.scheduledAt,
      price: convert.price === "" ? null : convert.price,
    });
    setConverting(false);
    if (ok) {
      setShowConvert(false);
      router.refresh();
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link
          href="/admin/leads"
          className="mb-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#666] hover:text-redro-red"
        >
          <ArrowLeft size={16} />
          Back to leads
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-display text-2xl font-extrabold text-[#111]">
            {fullName}
          </h1>
          <StatusBadge status={status} />
        </div>
        <p className="mt-1 text-sm text-[#666]">
          Received {formatDate(lead.createdAt)}
        </p>
      </div>

      {error && (
        <div className="rounded-[7px] border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
        {/* Main */}
        <div className="flex flex-col gap-6">
          <section className="rounded-[14px] border border-redro-border bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
            <h2 className="font-display mb-2 text-base font-bold text-[#111]">
              Request Details
            </h2>
            <Field label="Name" value={fullName} />
            <Field label="Email" value={lead.email} />
            <Field label="Phone" value={lead.phone} />
            <Field label="Service" value={serviceLabel(lead.serviceType)} />
            <Field label="Address" value={lead.address?.trim() ? lead.address : "—"} />
            <Field label="Preferred Date" value={lead.preferredDate} />
            <Field label="Bedrooms" value={bedroomLabel(lead.bedrooms)} />
            <Field
              label="Message"
              value={lead.message?.trim() ? lead.message : "—"}
            />
          </section>

          <section className="rounded-[14px] border border-redro-border bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
            <h2 className="font-display mb-3 text-base font-bold text-[#111]">
              Internal Notes
            </h2>
            <textarea
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add private notes about this lead…"
              className={`${inputClasses} h-auto resize-none py-2.5`}
            />
            <button
              type="button"
              onClick={saveNotes}
              disabled={notesSaving}
              className="font-display mt-3 rounded-[7px] bg-[#111] px-5 py-2.5 text-[13px] font-bold tracking-[0.05em] text-white uppercase transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {notesSaving ? "Saving…" : "Save Notes"}
            </button>
          </section>

          {!lead.booking && (
            <section className="rounded-[14px] border border-redro-border bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-base font-bold text-[#111]">
                  Convert to Booking
                </h2>
                {!showConvert && (
                  <button
                    type="button"
                    onClick={() => setShowConvert(true)}
                    className="font-display rounded-[7px] bg-redro-red px-5 py-2.5 text-[13px] font-bold tracking-[0.05em] text-white uppercase shadow-[0_6px_20px_rgba(212,31,31,0.25)]"
                  >
                    Convert
                  </button>
                )}
              </div>

              {showConvert && (
                <form onSubmit={handleConvert} className="mt-4">
                  <div className="mb-4">
                    <label htmlFor="cv-address" className={labelClasses}>
                      Address
                    </label>
                    <input
                      id="cv-address"
                      required
                      value={convert.address}
                      onChange={(e) =>
                        setConvert({ ...convert, address: e.target.value })
                      }
                      className={inputClasses}
                    />
                  </div>
                  <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="cv-date" className={labelClasses}>
                        Scheduled Date &amp; Time
                      </label>
                      <input
                        id="cv-date"
                        type="datetime-local"
                        required
                        value={convert.scheduledAt}
                        onChange={(e) =>
                          setConvert({ ...convert, scheduledAt: e.target.value })
                        }
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label htmlFor="cv-price" className={labelClasses}>
                        Price (AUD, optional)
                      </label>
                      <input
                        id="cv-price"
                        type="number"
                        min="0"
                        step="0.01"
                        value={convert.price}
                        onChange={(e) =>
                          setConvert({ ...convert, price: e.target.value })
                        }
                        className={inputClasses}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="submit"
                      disabled={converting}
                      className="font-display rounded-[7px] bg-redro-red px-6 py-3 text-sm font-bold tracking-[0.05em] text-white uppercase shadow-[0_6px_20px_rgba(212,31,31,0.25)] disabled:opacity-60"
                    >
                      {converting ? "Creating…" : "Create Booking"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowConvert(false)}
                      className="text-sm font-medium text-[#666] hover:text-[#111]"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-6">
          <section className="rounded-[14px] border border-redro-border bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
            <h2 className="font-display mb-3 text-base font-bold text-[#111]">
              Status
            </h2>
            <select
              value={status}
              disabled={statusSaving}
              onChange={(e) => saveStatus(e.target.value as LeadStatus)}
              className={`${inputClasses} appearance-none disabled:opacity-60`}
            >
              {LEAD_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s.charAt(0) + s.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
          </section>

          <section className="rounded-[14px] border border-redro-border bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
            <h2 className="font-display mb-3 text-base font-bold text-[#111]">
              Quick Actions
            </h2>
            <div className="flex flex-col gap-2.5">
              <a
                href={`mailto:${lead.email}?subject=${encodeURIComponent(
                  `Your ${serviceLabel(lead.serviceType)} Quote — Redro Cleaning`,
                )}`}
                className="flex items-center gap-2.5 rounded-[7px] bg-redro-cream px-4 py-3 text-sm font-medium text-[#333] hover:bg-redro-tint"
              >
                <Mail size={16} className="text-redro-red" />
                Reply via Email
              </a>
              <a
                href={`tel:${lead.phone}`}
                className="flex items-center gap-2.5 rounded-[7px] bg-redro-cream px-4 py-3 text-sm font-medium text-[#333] hover:bg-redro-tint"
              >
                <Phone size={16} className="text-redro-red" />
                Call {lead.phone}
              </a>
            </div>
          </section>

          {lead.booking && (
            <section className="rounded-[14px] border border-redro-border bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
              <h2 className="font-display mb-3 text-base font-bold text-[#111]">
                Booking
              </h2>
              <div className="flex flex-col gap-1.5 text-sm text-[#444]">
                <div className="flex items-center justify-between">
                  <span className="text-[#999]">Status</span>
                  <StatusBadge status={lead.booking.status} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#999]">Scheduled</span>
                  <span className="font-medium text-[#111]">
                    {formatDateTime(lead.booking.scheduledAt)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#999]">Price</span>
                  <span className="font-medium text-[#111]">
                    {formatPrice(lead.booking.price)}
                  </span>
                </div>
                <div className="mt-1">
                  <span className="text-[#999]">Address</span>
                  <div className="font-medium text-[#111]">
                    {lead.booking.address}
                  </div>
                </div>
              </div>
              <Link
                href="/admin/bookings"
                className="font-display mt-4 inline-block text-[13px] font-bold tracking-[0.04em] text-redro-red uppercase"
              >
                View in bookings →
              </Link>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
