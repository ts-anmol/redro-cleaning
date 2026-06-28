"use client";

import { useState } from "react";

const FAQS = [
  {
    question: "What's covered in an end of lease clean?",
    answer:
      "We work through the full real estate inspection checklist — every room, the kitchen, bathrooms, inside cupboards, skirting boards and fixtures — so the property is ready for your final walkthrough.",
  },
  {
    question: "Do you offer a bond back guarantee?",
    answer:
      "Yes. If your property manager or landlord isn't satisfied with the result, we'll return within 72 hours and re-clean the affected areas completely free of charge, no questions asked.",
  },
  {
    question: "Are your cleaners insured and background-checked?",
    answer:
      "Every cleaner on our team is fully insured and police-checked before they ever step into your home, so you can have complete peace of mind.",
  },
  {
    question: "Which parts of Sydney do you service?",
    answer:
      "We cover 51+ suburbs across Greater Sydney — the CBD, Inner West, Eastern Suburbs, North Shore, Western Sydney, South Sydney, Parramatta, Northern Beaches and the Hills District.",
  },
  {
    question: "Do you bring your own supplies and equipment?",
    answer:
      "Yes — our cleaners turn up fully equipped with everything needed for the job, so there's nothing for you to organise beforehand.",
  },
  {
    question: "What cleaning products do you use?",
    answer:
      "We use eco-friendly, hospital-grade products that are safe for children, pets and the environment, without compromising on cleaning power.",
  },
  {
    question: "How long does a typical clean take?",
    answer:
      "It depends on the size and condition of the property — add-ons like carpet steam cleaning or a balcony clean usually take under 2 hours, while a full end of lease, move-in or move-out clean typically runs 4–8 hours. We'll confirm a timeframe when you book.",
  },
  {
    question: "Do I need to be home during the clean?",
    answer:
      "Not at all. Many customers provide access instructions and head out — our insured, police-checked cleaners can let themselves in and lock up afterwards.",
  },
  {
    question: "How do I reschedule or cancel?",
    answer:
      "You can reschedule or cancel any booking free of charge up to 24 hours before your scheduled clean by calling or emailing us.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

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
              <a href="mailto:info@redrocleaning.com.au" className="flex items-center gap-3.5 rounded-[10px] bg-redro-cream px-5 py-4.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-redro-tint">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <rect x="2" y="5" width="16" height="11" rx="2" stroke="#D41F1F" strokeWidth="1.5" />
                    <polyline points="2,5 10,12 18,5" stroke="#D41F1F" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <div className="font-display text-sm font-semibold text-[#111]">info@redrocleaning.com.au</div>
                  <div className="mt-1 text-[13px] text-[#AAA]">Email us anytime</div>
                </div>
              </a>
              <a href="tel:+61404504303" className="flex items-center gap-3.5 rounded-[10px] bg-redro-red px-5 py-4.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/20">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <rect x="5" y="1" width="10" height="18" rx="2" stroke="white" strokeWidth="1.5" />
                    <circle cx="10" cy="15.5" r="1" fill="white" />
                  </svg>
                </div>
                <div>
                  <div className="font-display text-sm font-semibold text-white">+61 404 504 303</div>
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
