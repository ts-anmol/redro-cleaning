"use client";

import { useState } from "react";
import Image from "next/image";

const LINKS = [
  { label: "Home", href: "#" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({
  phone = "+61 404 504 303",
}: {
  phone?: string;
}) {
  const [open, setOpen] = useState(false);
  const telHref = `tel:${phone.replace(/[^+\d]/g, "")}`;

  return (
    <nav className="sticky top-0 z-[100] flex h-16 items-center justify-between border-b border-[#ECEAE8] bg-white/96 px-5 shadow-[0_1px_0_rgba(0,0,0,0.04),0_4px_20px_rgba(0,0,0,0.04)] backdrop-blur-md sm:px-8 lg:h-20 lg:px-20">
      <Image
        src="/logo.png"
        alt="Redro Cleaning"
        width={210}
        height={70}
        className="h-11 w-auto object-contain lg:h-15"
        priority
      />

      <div className="hidden items-center gap-9 lg:flex">
        {LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="font-display text-sm font-semibold tracking-[0.02em] text-[#333]"
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="hidden items-center gap-5 lg:flex">
        <a href={telHref} className="text-sm font-medium text-[#666] transition-colors hover:text-redro-red">
          {phone}
        </a>
        <a
          href="#contact"
          className="group inline-flex items-center gap-2 rounded-[5px] bg-redro-red px-7 py-3.5 font-display text-[13px] font-bold uppercase tracking-[0.06em] text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#b81b1b] hover:shadow-[0_10px_24px_rgba(212,31,31,0.35)]"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            className="shrink-0 transition-transform duration-200 group-hover:scale-110"
          >
            <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
            <path d="M2 6.5h12" stroke="currentColor" strokeWidth="1.4" />
            <path d="M5 1.5v3M11 1.5v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            <path
              d="M5.5 9.7l1.5 1.5 3-3.2"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Book Online
        </a>
      </div>

      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 items-center justify-center rounded-[7px] border border-[#ECEAE8] text-[#222] lg:hidden"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          {open ? (
            <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          ) : (
            <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          )}
        </svg>
      </button>

      {open && (
        <div className="absolute top-16 right-0 left-0 flex flex-col gap-1 border-b border-[#ECEAE8] bg-white px-5 pt-2 pb-5 shadow-[0_12px_24px_rgba(0,0,0,0.08)] sm:px-8 lg:hidden">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-display rounded-[6px] px-2 py-3 text-[15px] font-semibold tracking-[0.02em] text-[#333] hover:bg-redro-cream"
            >
              {link.label}
            </a>
          ))}
          <a
            href={telHref}
            className="mt-2 px-2 text-sm font-medium text-[#666]"
          >
            {phone}
          </a>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-3 inline-flex items-center justify-center gap-2 rounded-[5px] bg-redro-red px-7 py-3.5 font-display text-[13px] font-bold uppercase tracking-[0.06em] text-white"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0">
              <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
              <path d="M2 6.5h12" stroke="currentColor" strokeWidth="1.4" />
              <path d="M5 1.5v3M11 1.5v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              <path
                d="M5.5 9.7l1.5 1.5 3-3.2"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Book Online
          </a>
        </div>
      )}
    </nav>
  );
}
