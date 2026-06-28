"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import type { ServiceConfig } from "@/types/admin";

const inputClasses =
  "h-11 w-full rounded-[7px] border-[1.5px] border-[#E6E4E0] bg-redro-cream px-4 text-sm text-[#111] outline-none focus:border-redro-red";
const labelClasses =
  "font-display mb-1.5 block text-[11px] font-semibold tracking-[0.06em] text-[#444] uppercase";

function Toggle({
  checked,
  disabled,
  onChange,
}: {
  checked: boolean;
  disabled?: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors disabled:opacity-60 ${
        checked ? "bg-redro-red" : "bg-[#d8d6d2]"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

function ServiceCard({ service }: { service: ServiceConfig }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    title: service.title,
    price: service.price,
    description: service.description,
  });
  const [isActive, setIsActive] = useState(service.isActive);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function patch(body: Record<string, unknown>): Promise<boolean> {
    setError("");
    const res = await fetch(`/api/admin/services/${service.key}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      setError(data?.error ?? "Could not save.");
      return false;
    }
    return true;
  }

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    const ok = await patch(form);
    setSaving(false);
    if (ok) {
      setEditing(false);
      router.refresh();
    }
  }

  async function toggleActive() {
    const next = !isActive;
    setIsActive(next);
    const ok = await patch({ isActive: next });
    if (ok) router.refresh();
    else setIsActive(!next);
  }

  return (
    <div className="rounded-[14px] border-t-4 border-redro-red bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
      {error && (
        <div className="mb-4 rounded-[7px] border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
          {error}
        </div>
      )}

      {editing ? (
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <div>
            <label className={labelClasses}>Title</label>
            <input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className={inputClasses}
            />
          </div>
          <div>
            <label className={labelClasses}>Price</label>
            <input
              required
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className={inputClasses}
            />
          </div>
          <div>
            <label className={labelClasses}>Description</label>
            <textarea
              rows={4}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className={`${inputClasses} h-auto resize-none py-2.5`}
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={saving}
              className="font-display rounded-[7px] bg-redro-red px-5 py-2.5 text-[13px] font-bold tracking-[0.05em] text-white uppercase shadow-[0_6px_20px_rgba(212,31,31,0.25)] disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save"}
            </button>
            <button
              type="button"
              onClick={() => {
                setEditing(false);
                setForm({
                  title: service.title,
                  price: service.price,
                  description: service.description,
                });
                setError("");
              }}
              className="text-sm font-medium text-[#666] hover:text-[#111]"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="mb-3 flex items-start justify-between gap-3">
            <h3 className="font-display text-lg font-bold text-[#111]">
              {service.title}
            </h3>
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="font-display shrink-0 text-[13px] font-bold tracking-[0.04em] text-redro-red uppercase"
            >
              Edit
            </button>
          </div>
          <div className="font-display mb-3 text-base font-bold text-redro-red">
            {service.price}
          </div>
          <p className="mb-5 text-sm leading-[1.7] text-[#666]">
            {service.description}
          </p>
          <div className="flex items-center justify-between gap-3 border-t border-redro-border pt-4">
            <span className="text-sm font-medium text-[#444]">
              {isActive ? "Active" : "Inactive"}
            </span>
            <Toggle checked={isActive} onChange={toggleActive} />
          </div>
        </>
      )}
    </div>
  );
}

function NewServiceCard({
  isAddon,
  onCreated,
  onCancel,
}: {
  isAddon: boolean;
  onCreated: () => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState({ title: "", price: "", description: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const res = await fetch("/api/admin/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, isAddon }),
    });
    setSaving(false);
    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      setError(data?.error ?? "Could not create service.");
      return;
    }
    onCreated();
  }

  return (
    <div className="rounded-[14px] border-2 border-dashed border-redro-red/40 bg-white p-6">
      <h3 className="font-display mb-4 text-lg font-bold text-[#111]">
        New {isAddon ? "Add-On" : "Service"}
      </h3>
      {error && (
        <div className="mb-4 rounded-[7px] border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
          {error}
        </div>
      )}
      <form onSubmit={handleCreate} className="flex flex-col gap-4">
        <div>
          <label className={labelClasses}>Title</label>
          <input
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="e.g. Oven Deep Clean"
            className={inputClasses}
          />
        </div>
        <div>
          <label className={labelClasses}>Price</label>
          <input
            required
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            placeholder="e.g. From $49"
            className={inputClasses}
          />
        </div>
        <div>
          <label className={labelClasses}>Description</label>
          <textarea
            required
            rows={4}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Short description shown on the website."
            className={`${inputClasses} h-auto resize-none py-2.5`}
          />
        </div>
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="font-display rounded-[7px] bg-redro-red px-5 py-2.5 text-[13px] font-bold tracking-[0.05em] text-white uppercase shadow-[0_6px_20px_rgba(212,31,31,0.25)] disabled:opacity-60"
          >
            {saving ? "Creating…" : "Create"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="text-sm font-medium text-[#666] hover:text-[#111]"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default function ServicesManager({
  title,
  services,
  isAddon,
}: {
  title: string;
  services: ServiceConfig[];
  isAddon: boolean;
}) {
  const router = useRouter();
  const [adding, setAdding] = useState(false);

  return (
    <section>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="font-display text-lg font-bold text-[#111]">{title}</h2>
        {!adding && (
          <button
            type="button"
            onClick={() => setAdding(true)}
            className="font-display inline-flex items-center gap-1.5 rounded-[7px] bg-redro-red px-4 py-2 text-[13px] font-bold tracking-[0.04em] text-white uppercase shadow-[0_6px_20px_rgba(212,31,31,0.25)] transition-opacity hover:opacity-95"
          >
            <Plus size={15} strokeWidth={2.5} />
            Add {isAddon ? "Add-On" : "Service"}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {adding && (
          <NewServiceCard
            isAddon={isAddon}
            onCreated={() => {
              setAdding(false);
              router.refresh();
            }}
            onCancel={() => setAdding(false)}
          />
        )}
        {services.map((service) => (
          <ServiceCard key={service.key} service={service} />
        ))}
        {services.length === 0 && !adding && (
          <p className="text-sm text-[#888]">
            No {isAddon ? "add-ons" : "services"} yet. Click “Add” to create one.
          </p>
        )}
      </div>
    </section>
  );
}
