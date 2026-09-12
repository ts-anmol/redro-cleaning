import BookingForm from "@/components/BookingForm";
import type { ServiceConfig } from "@/types/admin";

export default function Contact({
  services = [],
  phone = "+61 404 504 303",
  contactEmail = "contact@redrocleaning.com",
}: {
  services?: ServiceConfig[];
  phone?: string;
  contactEmail?: string;
}) {
  const telHref = `tel:${phone.replace(/[^+\d]/g, "")}`;

  return (
    <section id="contact" className="scroll-mt-10 bg-redro-cream py-16">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-20">
        <div className="overflow-hidden rounded-[20px] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.07)]">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr]">
            <div className="flex flex-col justify-between bg-[#111] p-7 sm:p-10">
              <div>
                <div className="font-display mb-3 text-[11px] font-bold tracking-[0.12em] text-redro-red uppercase">
                  Book a Clean
                </div>
                <h2 className="font-display mb-4 text-[28px] leading-[1.15] font-extrabold tracking-[-0.02em] text-white">
                  Get Your Free Quote
                </h2>
                <p className="mb-6 text-[14px] leading-[1.6] text-white/55">
                  Fill out the form and we&apos;ll respond within 1 hour with a
                  competitive, no-obligation quote.
                </p>
                <div className="mb-6 flex flex-col gap-3.5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-redro-red/20">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        aria-hidden="true"
                      >
                        <rect
                          x="2"
                          y="5"
                          width="14"
                          height="9.5"
                          rx="1.5"
                          stroke="#D41F1F"
                          strokeWidth="1.4"
                        />
                        <polyline
                          points="2,5 9,11 16,5"
                          stroke="#D41F1F"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <span className="text-sm text-white/60">
                      {contactEmail}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-redro-red/20">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        aria-hidden="true"
                      >
                        <rect
                          x="4.5"
                          y="1"
                          width="9"
                          height="16"
                          rx="1.5"
                          stroke="#D41F1F"
                          strokeWidth="1.4"
                        />
                        <circle cx="9" cy="14" r=".8" fill="#D41F1F" />
                      </svg>
                    </div>
                    <a
                      href={telHref}
                      className="text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-redro-red/20">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        aria-hidden="true"
                      >
                        <circle
                          cx="9"
                          cy="7.5"
                          r="3.5"
                          stroke="#D41F1F"
                          strokeWidth="1.4"
                        />
                        <path
                          d="M3 17c0-4 2.7-7.5 6-7.5s6 3.5 6 7.5"
                          stroke="#D41F1F"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <span className="text-sm text-white/60">
                      Serving all of Sydney, NSW
                    </span>
                  </div>
                </div>
              </div>
              {/* <div className="flex h-28 items-center justify-center rounded-[10px] border border-white/6 bg-[#1a1a1a]">
                <div
                  className="text-center text-[11px] leading-relaxed text-[#555]"
                  style={{ fontFamily: "'Courier New', monospace" }}
                >
                  [Google Maps embed]
                  <br />
                  Sydney service area
                </div>
              </div> */}
            </div>

            <div className="p-7 sm:p-10">
              <BookingForm services={services} idPrefix="contact" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
