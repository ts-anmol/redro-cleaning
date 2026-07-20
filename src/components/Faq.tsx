"use client";

import { useState } from "react";
import { FAQS } from "@/data/faqs";

export default function Faq({
  phone = "+61 404 504 303",
  contactEmail = "redrocleaning@gmail.com",
}: {
  phone?: string;
  contactEmail?: string;
}) {
  const [openIndex, setOpenIndex] = useState(0);
  const telHref = `tel:${phone.replace(/[^+\d]/g, "")}`;

  return (
    <section id="faq" className="scroll-mt-20 bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <div className="mb-5 inline-flex items-center gap-3">
              <div className="h-[1.5px] w-7 bg-redro-red" />
              <span className="font-display text-[11px] font-bold tracking-[0.12em] text-redro-red uppercase">
                FAQ
              </span>
            </div>
            <h2 className="font-display mb-5 text-[clamp(1.9rem,6vw,42px)] leading-[1.15] font-extrabold tracking-[-0.02em] text-[#111] lg:text-[42px] lg:leading-[1.1]">
              Common Questions
            </h2>
            <p className="text-base leading-[1.75] text-[#666]">
              Still have questions? We&apos;re happy to help — reach out any time.
            </p>

            <div className="mt-9 flex flex-col gap-3">
              <a href={`mailto:${contactEmail}`} className="flex items-center gap-3.5 rounded-[10px] bg-redro-cream px-5 py-4.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-redro-tint">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <rect x="2" y="5" width="16" height="11" rx="2" stroke="#D41F1F" strokeWidth="1.5" />
                    <polyline points="2,5 10,12 18,5" stroke="#D41F1F" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <div className="font-display text-sm font-semibold text-[#111]">{contactEmail}</div>
                  <div className="mt-1 text-[13px] text-[#AAA]">Email us anytime</div>
                </div>
              </a>
              <a href={telHref} className="flex items-center gap-3.5 rounded-[10px] bg-redro-red px-5 py-4.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/20">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <rect x="5" y="1" width="10" height="18" rx="2" stroke="white" strokeWidth="1.5" />
                    <circle cx="10" cy="15.5" r="1" fill="white" />
                  </svg>
                </div>
                <div>
                  <div className="font-display text-sm font-semibold text-white">{phone}</div>
                  <div className="mt-1 text-[13px] text-white/70">Call or SMS us</div>
                </div>
              </a>
            </div>
          </div>

          <div className="flex flex-col overflow-hidden rounded-xl border border-[#ECEAE8]">
            {FAQS.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={faq.question} className={i < FAQS.length - 1 ? "border-b border-[#ECEAE8]" : ""}>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                    className={`flex w-full items-center justify-between gap-4 px-5 py-5 text-left lg:px-7 lg:py-5.5 ${
                      isOpen ? "bg-[#FFF8F7]" : ""
                    }`}
                  >
                    <span className={`font-display text-[15px] font-semibold ${isOpen ? "text-[#111]" : "text-[#333]"}`}>
                      {faq.question}
                    </span>
                    <span
                      className={`font-display shrink-0 text-[22px] font-bold ${
                        isOpen ? "text-redro-red" : "text-[#CCC]"
                      }`}
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="bg-[#FFFBFB] px-5 py-5 lg:px-7">
                      <p className="text-[15px] leading-[1.7] text-[#555]">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
