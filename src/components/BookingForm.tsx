"use client";

import { useState } from "react";
import type { ServiceConfig } from "@/types/admin";

const inputClasses =
  "h-11 w-full rounded-[7px] border-[1.5px] border-[#E6E4E0] bg-redro-cream px-4 text-sm text-[#111] outline-none focus:border-redro-red";
const labelClasses =
  "font-display mb-1.5 block text-[11px] font-semibold tracking-[0.06em] text-[#444] uppercase";

const DEFAULT_SERVICE_OPTIONS = [
  { key: "end-of-lease", label: "End of Lease Cleaning" },
  { key: "move-in", label: "Move-In Cleaning" },
  { key: "move-out", label: "Move-Out Cleaning" },
  { key: "carpet-steam", label: "Carpet Steam Cleaning" },
  { key: "driveway-wash", label: "Pressure Driveway Wash" },
  { key: "balcony", label: "Balcony Deep Clean" },
];

export default function BookingForm({
  services = [],
  idPrefix,
}: {
  services?: ServiceConfig[];
  idPrefix: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const byKey = new Map(services.map((service) => [service.key, service]));
  const knownKeys = new Set(DEFAULT_SERVICE_OPTIONS.map((option) => option.key));
  const serviceOptions = [
    ...DEFAULT_SERVICE_OPTIONS.filter((option) => {
      const configuredService = byKey.get(option.key);
      return !configuredService || configuredService.isActive;
    }).map((option) => ({
      value: option.key,
      label: byKey.get(option.key)?.title ?? option.label,
    })),
    ...services
      .filter((service) => service.isActive && !knownKeys.has(service.key))
      .map((service) => ({ value: service.key, label: service.title })),
  ];

  const fieldId = (name: string) => `${idPrefix}-${name}`;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const data = Object.fromEntries(new FormData(event.currentTarget).entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Request failed");

      setSubmitted(true);

      type Gtag = (command: string, ...args: unknown[]) => void;
      const gtag = (window as unknown as { gtag?: Gtag }).gtag;
      gtag?.("event", "conversion", {
        send_to: "AW-18298008775/2e5ECJalnswcEMfplZVE",
      });
    } catch {
      setError(
        "Something went wrong sending your request. Please call or email us directly.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center text-center">
        <h3 className="font-display mb-3 text-2xl font-bold text-[#111]">
          Thanks — request received!
        </h3>
        <p className="text-[15px] text-[#666]">
          We&apos;ll be in touch within 1 hour with your free quote.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3.5 grid grid-cols-2 gap-4">
        <div>
          <label htmlFor={fieldId("firstName")} className={labelClasses}>
            First Name
          </label>
          <input required type="text" id={fieldId("firstName")} name="firstName" autoComplete="given-name" className={inputClasses} />
        </div>
        <div>
          <label htmlFor={fieldId("lastName")} className={labelClasses}>
            Last Name
          </label>
          <input required type="text" id={fieldId("lastName")} name="lastName" autoComplete="family-name" className={inputClasses} />
        </div>
      </div>
      <div className="mb-3.5 grid grid-cols-2 gap-4">
        <div>
          <label htmlFor={fieldId("email")} className={labelClasses}>Email</label>
          <input required type="email" id={fieldId("email")} name="email" autoComplete="email" className={inputClasses} />
        </div>
        <div>
          <label htmlFor={fieldId("phone")} className={labelClasses}>Phone</label>
          <input required type="tel" id={fieldId("phone")} name="phone" autoComplete="tel" className={inputClasses} />
        </div>
      </div>
      <div className="mb-3.5">
        <label htmlFor={fieldId("serviceType")} className={labelClasses}>Service Type</label>
        <select required id={fieldId("serviceType")} name="serviceType" defaultValue="" className={`${inputClasses} appearance-none text-[#444]`}>
          <option value="" disabled>Select a service…</option>
          {serviceOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
      <div className="mb-3.5">
        <label htmlFor={fieldId("address")} className={labelClasses}>Property Address</label>
        <input required type="text" id={fieldId("address")} name="address" autoComplete="street-address" placeholder="e.g. 12 Phillip St, Parramatta NSW 2150" className={inputClasses} />
      </div>
      <div className="mb-3.5 grid grid-cols-2 gap-4">
        <div>
          <label htmlFor={fieldId("preferredDate")} className={labelClasses}>Preferred Date</label>
          <input required type="date" id={fieldId("preferredDate")} name="preferredDate" className={inputClasses} />
        </div>
        <div>
          <label htmlFor={fieldId("bedrooms")} className={labelClasses}>Bedrooms</label>
          <select required id={fieldId("bedrooms")} name="bedrooms" defaultValue="" className={`${inputClasses} appearance-none text-[#444]`}>
            <option value="" disabled>Select…</option>
            <option value="studio">Studio</option>
            <option value="1">1 Bedroom</option>
            <option value="2">2 Bedrooms</option>
            <option value="3">3 Bedrooms</option>
            <option value="4+">4+ Bedrooms</option>
          </select>
        </div>
      </div>
      <div className="mb-5">
        <label htmlFor={fieldId("message")} className={labelClasses}>Message (optional)</label>
        <textarea id={fieldId("message")} name="message" rows={2} className={`${inputClasses} h-16 resize-none py-2.5`} />
      </div>
      {error && <p className="mb-4 text-sm font-medium text-redro-red">{error}</p>}
      <button type="submit" disabled={isSubmitting} className="font-display block w-full rounded-[7px] bg-redro-red py-3.5 text-sm font-bold tracking-[0.06em] text-white uppercase shadow-[0_6px_20px_rgba(212,31,31,0.25)] transition-colors hover:bg-[#b81b1b] disabled:cursor-not-allowed disabled:opacity-60">
        {isSubmitting ? "Sending…" : "Get My Free Quote"}
      </button>
    </form>
  );
}
