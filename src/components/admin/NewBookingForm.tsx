"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SERVICE_OPTIONS, BEDROOM_OPTIONS } from "@/types/admin";

const inputClasses =
  "h-11 w-full rounded-[7px] border-[1.5px] border-[#E6E4E0] bg-redro-cream px-4 text-sm text-[#111] outline-none focus:border-redro-red";
const labelClasses =
  "font-display mb-1.5 block text-[11px] font-semibold tracking-[0.06em] text-[#444] uppercase";

type CustomerOption = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

const NEW_CUSTOMER = "__new__";

export default function NewBookingForm({
  customers,
}: {
  customers: CustomerOption[];
}) {
  const router = useRouter();
  const [customerId, setCustomerId] = useState<string>(
    customers[0]?.id ?? NEW_CUSTOMER,
  );
  const [newCustomer, setNewCustomer] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [form, setForm] = useState({
    serviceType: "",
    address: "",
    scheduledAt: "",
    bedrooms: "",
    price: "",
    notes: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isNew = customerId === NEW_CUSTOMER;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const payload = {
      customerId: isNew ? null : customerId,
      newCustomer: isNew ? newCustomer : null,
      serviceType: form.serviceType,
      address: form.address,
      scheduledAt: form.scheduledAt,
      bedrooms: form.bedrooms,
      price: form.price === "" ? null : form.price,
      notes: form.notes,
    };

    const res = await fetch("/api/admin/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as {
        error?: string;
      } | null;
      setError(data?.error ?? "Could not create booking.");
      return;
    }

    router.push("/admin/bookings");
    router.refresh();
  }

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

      <div className="mb-4">
        <label htmlFor="customer" className={labelClasses}>
          Customer
        </label>
        <select
          id="customer"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          className={`${inputClasses} appearance-none`}
        >
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.firstName} {c.lastName} ({c.email})
            </option>
          ))}
          <option value={NEW_CUSTOMER}>+ New customer</option>
        </select>
      </div>

      {isNew && (
        <div className="mb-4 grid grid-cols-1 gap-4 rounded-[10px] bg-redro-cream p-4 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className={labelClasses}>
              First Name
            </label>
            <input
              id="firstName"
              required={isNew}
              value={newCustomer.firstName}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, firstName: e.target.value })
              }
              className={`${inputClasses} bg-white`}
            />
          </div>
          <div>
            <label htmlFor="lastName" className={labelClasses}>
              Last Name
            </label>
            <input
              id="lastName"
              required={isNew}
              value={newCustomer.lastName}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, lastName: e.target.value })
              }
              className={`${inputClasses} bg-white`}
            />
          </div>
          <div>
            <label htmlFor="newEmail" className={labelClasses}>
              Email
            </label>
            <input
              id="newEmail"
              type="email"
              required={isNew}
              value={newCustomer.email}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, email: e.target.value })
              }
              className={`${inputClasses} bg-white`}
            />
          </div>
          <div>
            <label htmlFor="newPhone" className={labelClasses}>
              Phone
            </label>
            <input
              id="newPhone"
              type="tel"
              value={newCustomer.phone}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, phone: e.target.value })
              }
              className={`${inputClasses} bg-white`}
            />
          </div>
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="serviceType" className={labelClasses}>
          Service Type
        </label>
        <select
          id="serviceType"
          required
          value={form.serviceType}
          onChange={(e) => setForm({ ...form, serviceType: e.target.value })}
          className={`${inputClasses} appearance-none`}
        >
          <option value="" disabled>
            Select a service…
          </option>
          {SERVICE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="address" className={labelClasses}>
          Address
        </label>
        <input
          id="address"
          required
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          className={inputClasses}
        />
      </div>

      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="scheduledAt" className={labelClasses}>
            Scheduled Date &amp; Time
          </label>
          <input
            id="scheduledAt"
            type="datetime-local"
            required
            value={form.scheduledAt}
            onChange={(e) => setForm({ ...form, scheduledAt: e.target.value })}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="bedrooms" className={labelClasses}>
            Bedrooms
          </label>
          <select
            id="bedrooms"
            required
            value={form.bedrooms}
            onChange={(e) => setForm({ ...form, bedrooms: e.target.value })}
            className={`${inputClasses} appearance-none`}
          >
            <option value="" disabled>
              Select…
            </option>
            {BEDROOM_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="price" className={labelClasses}>
          Price (AUD, optional)
        </label>
        <input
          id="price"
          type="number"
          min="0"
          step="0.01"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className={inputClasses}
        />
      </div>

      <div className="mb-6">
        <label htmlFor="notes" className={labelClasses}>
          Notes (optional)
        </label>
        <textarea
          id="notes"
          rows={3}
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className={`${inputClasses} h-auto resize-none py-2.5`}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="font-display rounded-[7px] bg-redro-red px-6 py-3 text-sm font-bold tracking-[0.05em] text-white uppercase shadow-[0_6px_20px_rgba(212,31,31,0.25)] transition-opacity hover:opacity-95 disabled:opacity-60"
      >
        {loading ? "Creating…" : "Create Booking"}
      </button>
    </form>
  );
}
