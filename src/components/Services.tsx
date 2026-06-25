import SectionHeading from "./SectionHeading";

type Service = {
  number: string;
  title: string;
  description: string;
  tags: string[];
  price: string;
  dark?: boolean;
  popular?: boolean;
};

const SERVICES: Service[] = [
  {
    number: "01",
    title: "Regular House Cleaning",
    description:
      "Weekly or fortnightly cleans that keep your home consistently fresh. All rooms, bathrooms, kitchen and living spaces taken care of.",
    tags: ["Weekly", "Fortnightly", "All rooms"],
    price: "From $120",
  },
  {
    number: "02",
    title: "Apartment Cleaning",
    description:
      "Tailored cleaning packages for apartments and units of all sizes across Sydney. Flexible times to fit your schedule.",
    tags: ["Studios to 4BR", "All Sydney"],
    price: "From $110",
  },
  {
    number: "03",
    title: "Deep Cleaning",
    description:
      "A thorough top-to-bottom clean covering every corner, crevice and surface. Perfect for spring cleans, move-ins and post-renovation.",
    tags: ["Inside appliances", "Baseboards", "Detailed"],
    price: "From $220",
  },
  {
    number: "Popular",
    title: "End of Lease Cleaning",
    description:
      "Guaranteed to get your bond back. Cleaned to real estate inspection standards — or we return and re-clean for free, no questions asked.",
    tags: ["Bond guaranteed", "Free re-clean"],
    price: "From $320",
    dark: true,
    popular: true,
  },
];

function ServiceIcon({ index }: { index: number }) {
  const color = "#D41F1F";
  if (index === 0) {
    return (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <polygon points="13,2 1,13 4,13 4,24 22,24 22,13 25,13" stroke={color} strokeWidth="1.8" strokeLinejoin="round" fill="none" />
        <rect x="9" y="17" width="8" height="7" rx="1" fill={color} opacity=".2" />
        <rect x="9" y="17" width="8" height="7" rx="1" stroke={color} strokeWidth="1.5" />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <rect x="3" y="3" width="20" height="20" rx="2" stroke={color} strokeWidth="1.8" />
        <rect x="7" y="7" width="5" height="5" rx="1" fill={color} opacity=".3" />
        <rect x="14" y="7" width="5" height="5" rx="1" fill={color} opacity=".3" />
        <rect x="7" y="14" width="5" height="5" rx="1" fill={color} opacity=".3" />
        <rect x="14" y="14" width="5" height="5" rx="1" fill={color} opacity=".3" />
      </svg>
    );
  }
  if (index === 2) {
    return (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <circle cx="13" cy="13" r="10" stroke={color} strokeWidth="1.8" />
        <circle cx="13" cy="13" r="5.5" stroke={color} strokeWidth="1.4" strokeDasharray="2.5 2.5" />
        <circle cx="13" cy="13" r="2" fill={color} />
      </svg>
    );
  }
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <rect x="3" y="3" width="20" height="20" rx="2" stroke={color} strokeWidth="1.8" />
      <polyline points="7,13 11,17 19,9" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Services() {
  return (
    <section id="services" className="scroll-mt-20 bg-redro-cream py-24 pb-20">
      <div className="mx-auto max-w-[1280px] px-20">
        <SectionHeading
          eyebrow="What We Do"
          title="Our Cleaning Services"
          subtitle="Professional cleaning for every home and occasion — done right the first time, every time."
          className="mx-auto mb-15 max-w-[520px]"
        />

        <div className="grid grid-cols-2 gap-6">
          {SERVICES.map((service, i) => (
            <div
              key={service.title}
              className={`relative overflow-hidden rounded-[14px] border-t-4 border-redro-red p-10 shadow-[0_2px_8px_rgba(0,0,0,0.06)] ${
                service.dark ? "bg-[#111] shadow-[0_2px_8px_rgba(0,0,0,0.15)]" : "bg-white"
              }`}
            >
              {service.dark && (
                <div className="absolute -right-10 -bottom-10 h-50 w-50 rounded-full bg-redro-red opacity-[0.08]" />
              )}
              <div className="mb-6 flex items-start justify-between">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-full ${
                    service.dark ? "bg-redro-red/20" : "bg-redro-tint"
                  }`}
                >
                  <ServiceIcon index={i} />
                </div>
                <span
                  className={`font-display rounded-full px-2.5 py-1.5 text-[11px] font-bold tracking-[0.08em] uppercase ${
                    service.popular ? "bg-redro-red text-white" : "bg-redro-cream text-[#AAA]"
                  }`}
                >
                  {service.number === "Popular" ? "Popular" : service.number}
                </span>
              </div>
              <h3 className={`font-display mb-3 text-[22px] font-bold ${service.dark ? "text-white" : "text-[#111]"}`}>
                {service.title}
              </h3>
              <p className={`mb-5 text-[15px] leading-[1.75] ${service.dark ? "text-white/65" : "text-[#666]"}`}>
                {service.description}
              </p>
              <div className="mb-6 flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-medium ${
                      service.dark ? "bg-white/10 text-white/80" : "bg-redro-cream text-[#555]"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div
                className={`flex items-center justify-between border-t pt-5 ${
                  service.dark ? "border-white/10" : "border-[#ECEAE8]"
                }`}
              >
                <span className={`font-display text-lg font-bold ${service.dark ? "text-white" : "text-[#111]"}`}>
                  {service.price}
                </span>
                <a href="#contact" className="font-display text-[13px] font-bold tracking-[0.04em] text-redro-red uppercase">
                  Book Now →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
