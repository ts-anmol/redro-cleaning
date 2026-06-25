import Image from "next/image";

const STATS = [
  { value: "2,400+", label: "Homes Cleaned", accent: false },
  { value: "100%", label: "Bond Back Rate", accent: true },
  { value: "6+ yrs", label: "In Sydney", accent: false },
  { value: "<4 hr", label: "Avg Response", accent: false },
];

export default function Hero() {
  return (
    <section className="relative flex min-h-[620px] items-center overflow-hidden bg-[#FDFCFA] px-20">
      <div className="pointer-events-none absolute -top-30 -right-30 h-[600px] w-[600px] rounded-full bg-redro-red opacity-[0.06]" />
      <div className="pointer-events-none absolute right-45 -bottom-25 h-[340px] w-[340px] rounded-full bg-redro-red opacity-[0.04]" />
      <div className="pointer-events-none absolute top-15 right-15 h-40 w-40 rounded-full bg-redro-red opacity-[0.04]" />

      <div className="relative z-10 flex-[0_0_52%] py-20">
        <div className="mb-7 inline-flex items-center gap-2.5 rounded-lg bg-white px-4 py-2.5 shadow-[0_2px_10px_rgba(0,0,0,0.08)]">
          <span className="font-display text-xs font-bold tracking-[0.02em] text-[#4285F4]">Google</span>
          <span className="text-[13px] text-[#FBBC04]">★★★★★</span>
          <span className="text-[13px] text-[#666]">Rated 5.0 · 500+ reviews</span>
        </div>

        <h1 className="font-display mb-5 text-[68px] leading-[1.0] font-black tracking-[-0.03em] text-[#111]">
          We Clean.
          <br />
          <span className="text-redro-red italic">You Relax.</span>
        </h1>

        <p className="mb-9 max-w-[480px] text-lg leading-[1.75] text-[#555]">
          Professional house &amp; apartment cleaning across Sydney. Regular cleans,
          deep cleans, end of lease — spotless results backed by our 100% guarantee.
        </p>

        <div className="mb-13 flex items-center gap-3.5">
          <a
            href="#contact"
            className="font-display group inline-flex items-center gap-2.5 rounded-[5px] bg-redro-red px-9 py-4.5 text-sm font-bold tracking-[0.05em] text-white uppercase shadow-[0_6px_20px_rgba(212,31,31,0.3)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#b81b1b] hover:shadow-[0_10px_28px_rgba(212,31,31,0.4)]"
          >
            <svg
              width="16"
              height="16"
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
          <a
            href="#contact"
            className="font-display group inline-flex items-center gap-2.5 rounded-[5px] border-2 border-[#222] bg-white px-7 py-4 text-sm font-bold tracking-[0.05em] text-[#222] uppercase transition-all duration-200 hover:-translate-y-0.5 hover:border-redro-red hover:bg-redro-red hover:text-white hover:shadow-[0_10px_24px_rgba(212,31,31,0.25)]"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="shrink-0 transition-transform duration-200 group-hover:rotate-6"
            >
              <path
                d="M1.5 1.5h5.6L14 7.9 8.4 13.5 1.5 6.6V1.5z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
              <circle cx="4.5" cy="4.5" r="1" fill="currentColor" />
            </svg>
            Free Quote
          </a>
        </div>

        <div className="flex items-stretch overflow-hidden rounded-[10px] border border-redro-border bg-white">
          {STATS.map((stat, i) => (
            <div key={stat.label} className="flex flex-1 items-center">
              {i > 0 && <div className="h-full w-px bg-redro-border" />}
              <div className="flex-1 px-7 py-5 text-center">
                <div
                  className={`font-display mb-1.5 text-[32px] font-black ${
                    stat.accent ? "text-redro-red" : "text-[#111]"
                  }`}
                >
                  {stat.value}
                </div>
                <div className="text-xs font-medium tracking-[0.02em] text-[#999]">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 flex flex-[0_0_48%] items-center self-stretch py-10 pl-16">
        <div className="relative h-[480px] w-full overflow-hidden rounded-[20px] shadow-[0_20px_60px_rgba(0,0,0,0.1)]">
          <Image
            src="/heroimage.png"
            alt="Professional cleaner in a bright freshly cleaned living room"
            fill
            className="object-cover"
            sizes="48vw"
            priority
          />
        </div>
      </div>
    </section>
  );
}
