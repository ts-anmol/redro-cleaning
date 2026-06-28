import Image from "next/image";

const VALUES = [
  {
    label: "Reliable",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="7.5" stroke="#D41F1F" strokeWidth="1.5" />
        <polyline points="5,9 8,12 13,6" stroke="#D41F1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Guaranteed",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="3" y="3" width="12" height="12" rx="2" stroke="#D41F1F" strokeWidth="1.5" />
        <polyline points="5.5,9 8,11.5 12.5,6.5" stroke="#D41F1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Eco-Friendly",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="6" r="3" stroke="#D41F1F" strokeWidth="1.5" />
        <path d="M3 15c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#D41F1F" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 bg-redro-cream py-16 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-20">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <div className="relative h-[300px] overflow-hidden rounded-[20px] shadow-[0_12px_40px_rgba(0,0,0,0.08)] sm:h-[400px] lg:h-[460px]">
            <Image
              src="/team.png"
              alt="Redro Cleaning team smiling in a bright home"
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 50vw, 560px"
            />
          </div>

          <div>
            <div className="mb-5 inline-flex items-center gap-3">
              <div className="h-[1.5px] w-7 bg-redro-red" />
              <span className="font-display text-[11px] font-bold tracking-[0.12em] text-redro-red uppercase">
                About Redro
              </span>
            </div>
            <h2 className="font-display mb-5 text-[clamp(1.9rem,6vw,42px)] leading-[1.15] font-extrabold tracking-[-0.02em] text-[#111] lg:text-[42px] lg:leading-[1.1]">
              Trusted by Sydney Families Since 2018
            </h2>
            <p className="mb-4 text-base leading-[1.8] text-[#555]">
              Redro Cleaning was built on a simple belief: everyone deserves to come
              home to a clean, fresh space. Based in Sydney, our team of trained,
              police-checked cleaners has helped over 2,400 families across the city.
            </p>
            <p className="mb-9 text-base leading-[1.8] text-[#555]">
              We use only eco-friendly, hospital-grade products that are safe for
              children, pets and the environment — because we care about your family
              as much as we care about clean.
            </p>

            <div className="mb-9 grid grid-cols-3 gap-4">
              {VALUES.map((value) => (
                <div key={value.label} className="rounded-[10px] bg-white p-5 text-center shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
                  <div className="mx-auto mb-2.5 flex h-10 w-10 items-center justify-center rounded-full bg-redro-tint">
                    {value.icon}
                  </div>
                  <div className="font-display text-[13px] font-bold text-[#111]">{value.label}</div>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="font-display inline-block rounded-[5px] bg-[#111] px-8 py-4 text-[13px] font-bold tracking-[0.05em] text-white uppercase"
            >
              Meet the Team
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
