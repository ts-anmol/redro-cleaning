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

type AddOn = {
  title: string;
  description: string;
  price: string;
};

const SERVICES: Service[] = [
  {
    number: "Popular",
    title: "End of Lease Cleaning",
    description:
      "Our top-rated end-of-lease cleaning offers a 7-day 100% bond back guarantee. We follow the full real estate inspection checklist to ensure your property is left spotless and meets every landlord and property manager standard.",
    tags: ["100% Bond Back Guarantee", "Real Estate Grade Standard"],
    price: "Packages from $250",
    dark: true,
    popular: true,
  },
  {
    number: "01",
    title: "Move-In Cleaning",
    description:
      "Make your new house a home with our professional move-in cleaning. We sanitise and thoroughly clean your new space so you can move in with confidence and complete peace of mind.",
    tags: ["Satisfaction Guaranteed", "Open 7 Days"],
    price: "Get a Quote",
  },
  {
    number: "02",
    title: "Move-Out Cleaning",
    description:
      "Leave your old place in pristine condition with our professional move-out cleaning. Designed to satisfy real estate agents at the final inspection and help you secure a full bond refund, stress-free.",
    tags: ["Bond-Ready Results", "Open 7 Days"],
    price: "Get a Quote",
  },
];

const ADDONS: AddOn[] = [
  {
    title: "Carpet Steam Cleaning",
    description:
      "Hot-water extraction for all carpeted areas. Removes deep stains, odours & allergens for a fresh finish.",
    price: "From $89",
  },
  {
    title: "Pressure Driveway Wash",
    description:
      "High-pressure clean to lift oil stains, dirt build-up & tyre marks — restoring curb appeal.",
    price: "From $120",
  },
  {
    title: "Balcony Deep Clean",
    description:
      "Full wash-down of balcony floors, railings, glass panels & drainage. Move-in ready.",
    price: "From $69",
  },
];

function ServiceIcon({ index }: { index: number }) {
  const color = "#D41F1F";
  if (index === 0) {
    return (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <polygon points="13,2 1,13 4,13 4,24 22,24 22,13 25,13" stroke={color} strokeWidth="1.8" strokeLinejoin="round" fill="none" />
        <rect x="9" y="17" width="8" height="7" rx="1" fill={color} opacity=".2" />
        <rect x="9" y="17" width="8" height="7" rx="1" stroke={color} strokeWidth="1.5" />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <rect x="3" y="8" width="20" height="14" rx="1.5" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M3 8l10-5 10 5" stroke={color} strokeWidth="1.8" strokeLinejoin="round" fill="none" />
        <path d="M9 22v-6h8v6" stroke={color} strokeWidth="1.5" />
      </svg>
    );
  }
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="20" height="20" rx="2" stroke={color} strokeWidth="1.8" />
      <polyline points="7,13 11,17 19,9" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AddOnIcon({ index }: { index: number }) {
  const color = "#D41F1F";
  if (index === 0) {
    return (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path
          d="M2 16c1.5 1.5 3 1.5 4.5 0s3-1.5 4.5 0 3 1.5 4.5 0 3-1.5 4.5 0"
          stroke={color}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M2 11c1.5 1.5 3 1.5 4.5 0s3-1.5 4.5 0 3 1.5 4.5 0 3-1.5 4.5 0"
          stroke={color}
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity=".5"
        />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M4 20l5-13h4l5 13" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11 7V2M8 4l3-2 3 2" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="16" height="11" rx="1.5" stroke={color} strokeWidth="1.6" />
      <path d="M3 7h16M7 14v6M15 14v6M5 20h12" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
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
          subtitle="Professional end of lease, move-in & move-out cleaning — done to real estate inspection standards, every time."
          className="mx-auto mb-15 max-w-[560px]"
        />

        <div className="grid grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <div
              key={service.title}
              className={`relative overflow-hidden rounded-[14px] border-t-4 border-redro-red p-9 shadow-[0_2px_8px_rgba(0,0,0,0.06)] ${
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
              <h3 className={`font-display mb-3 text-[20px] font-bold ${service.dark ? "text-white" : "text-[#111]"}`}>
                {service.title}
              </h3>
              <p className={`mb-5 text-[14px] leading-[1.7] ${service.dark ? "text-white/65" : "text-[#666]"}`}>
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
                <span className={`font-display text-base font-bold ${service.dark ? "text-white" : "text-[#111]"}`}>
                  {service.price}
                </span>
                <a href="#contact" className="font-display text-[13px] font-bold tracking-[0.04em] text-redro-red uppercase">
                  Book Now →
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h3 className="font-display mb-2 text-center text-2xl font-bold text-[#111]">Add-On Services</h3>
          <p className="mb-10 text-center text-sm text-[#888]">Extend any clean with an add-on for a truly spotless finish.</p>

          <div className="grid grid-cols-3 gap-6">
            {ADDONS.map((addon, i) => (
              <div
                key={addon.title}
                className="flex items-start gap-4 rounded-[14px] border border-[#ECEAE8] bg-white p-7"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-redro-tint">
                  <AddOnIcon index={i} />
                </div>
                <div>
                  <h4 className="font-display mb-1.5 text-base font-bold text-[#111]">{addon.title}</h4>
                  <p className="mb-3 text-[13px] leading-[1.6] text-[#666]">{addon.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-sm font-bold text-redro-red">{addon.price}</span>
                    <a href="#contact" className="font-display text-[11px] font-bold tracking-[0.04em] text-[#888] uppercase">
                      Add →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
