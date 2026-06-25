"use client";

import { useState } from "react";

const inputClasses =
  "h-12.5 w-full rounded-[7px] border-[1.5px] border-[#E6E4E0] bg-redro-cream px-4 text-sm text-[#111] outline-none focus:border-redro-red";
const labelClasses =
  "font-display mb-2 block text-[11px] font-semibold tracking-[0.06em] text-[#444] uppercase";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="contact" className="scroll-mt-20 bg-redro-cream py-24">
      <div className="mx-auto max-w-[1280px] px-20">
        <div className="overflow-hidden rounded-[20px] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.07)]">
          <div className="grid grid-cols-[1fr_1.5fr]">
            <div className="flex flex-col justify-between bg-[#111] p-14">
              <div>
                <div className="font-display mb-4 text-[11px] font-bold tracking-[0.12em] text-redro-red uppercase">
                  Book a Clean
                </div>
                <h2 className="font-display mb-5 text-[36px] leading-[1.15] font-extrabold tracking-[-0.02em] text-white">
                  Get Your Free Quote
                </h2>
                <p className="mb-10 text-[15px] leading-[1.75] text-white/55">
                  Fill out the form and we&apos;ll respond within 2 hours with a competitive, no-obligation quote.
                </p>
                <div className="mb-10 flex flex-col gap-5">
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-redro-red/20">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <rect x="2" y="5" width="14" height="9.5" rx="1.5" stroke="#D41F1F" strokeWidth="1.4" />
                        <polyline points="2,5 9,11 16,5" stroke="#D41F1F" strokeWidth="1.4" strokeLinecap="round" />
                      </svg>
                    </div>
                    <span className="text-sm text-white/60">info@redrocleaning.com.au</span>
                  </div>
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-redro-red/20">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <rect x="4.5" y="1" width="9" height="16" rx="1.5" stroke="#D41F1F" strokeWidth="1.4" />
                        <circle cx="9" cy="14" r=".8" fill="#D41F1F" />
                      </svg>
                    </div>
                    <a href="tel:+61404504303" className="text-sm text-white/60 transition-colors hover:text-white">
                      +61 404 504 303
                    </a>
                  </div>
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-redro-red/20">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <circle cx="9" cy="7.5" r="3.5" stroke="#D41F1F" strokeWidth="1.4" />
                        <path d="M3 17c0-4 2.7-7.5 6-7.5s6 3.5 6 7.5" stroke="#D41F1F" strokeWidth="1.4" strokeLinecap="round" />
                      </svg>
                    </div>
                    <span className="text-sm text-white/60">Serving all of Sydney, NSW</span>
                  </div>
                </div>
              </div>
              <div className="flex h-40 items-center justify-center rounded-[10px] border border-white/6 bg-[#1a1a1a]">
                <div className="text-center text-[11px] leading-relaxed text-[#555]" style={{ fontFamily: "'Courier New', monospace" }}>
                  [Google Maps embed]
                  <br />
                  Sydney service area
                </div>
              </div>
            </div>

            <div className="p-14">
              {submitted ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <h3 className="font-display mb-3 text-2xl font-bold text-[#111]">Thanks — request received!</h3>
                  <p className="text-[15px] text-[#666]">We&apos;ll be in touch within 2 hours with your free quote.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-5 grid grid-cols-2 gap-5">
                    <div>
                      <label className={labelClasses}>First Name</label>
                      <input required type="text" name="firstName" className={inputClasses} />
                    </div>
                    <div>
                      <label className={labelClasses}>Last Name</label>
                      <input required type="text" name="lastName" className={inputClasses} />
                    </div>
                  </div>
                  <div className="mb-5 grid grid-cols-2 gap-5">
                    <div>
                      <label className={labelClasses}>Email</label>
                      <input required type="email" name="email" className={inputClasses} />
                    </div>
                    <div>
                      <label className={labelClasses}>Phone</label>
                      <input required type="tel" name="phone" className={inputClasses} />
                    </div>
                  </div>
                  <div className="mb-5">
                    <label className={labelClasses}>Service Type</label>
                    <select required name="serviceType" defaultValue="" className={`${inputClasses} appearance-none text-[#444]`}>
                      <option value="" disabled className="text-[#C0BCB6]">
                        Select a service…
                      </option>
                      <option value="regular">Regular House Cleaning</option>
                      <option value="apartment">Apartment Cleaning</option>
                      <option value="deep">Deep Cleaning</option>
                      <option value="end-of-lease">End of Lease Cleaning</option>
                    </select>
                  </div>
                  <div className="mb-5 grid grid-cols-2 gap-5">
                    <div>
                      <label className={labelClasses}>Preferred Date</label>
                      <input required type="date" name="preferredDate" className={inputClasses} />
                    </div>
                    <div>
                      <label className={labelClasses}>Bedrooms</label>
                      <select required name="bedrooms" defaultValue="" className={`${inputClasses} appearance-none text-[#444]`}>
                        <option value="" disabled className="text-[#C0BCB6]">
                          Select…
                        </option>
                        <option value="studio">Studio</option>
                        <option value="1">1 Bedroom</option>
                        <option value="2">2 Bedrooms</option>
                        <option value="3">3 Bedrooms</option>
                        <option value="4+">4+ Bedrooms</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-7">
                    <label className={labelClasses}>Message (optional)</label>
                    <textarea name="message" rows={3} className={`${inputClasses} h-25 resize-none py-3`} />
                  </div>
                  <button
                    type="submit"
                    className="font-display block w-full rounded-[7px] bg-redro-red py-4.5 text-sm font-bold tracking-[0.06em] text-white uppercase shadow-[0_6px_20px_rgba(212,31,31,0.25)]"
                  >
                    Get My Free Quote
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
