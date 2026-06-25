import SectionHeading from "./SectionHeading";

type Tier = {
  label: string;
  price: string;
  caption: string;
  features: { text: string; included: boolean }[];
  cta: string;
  popular?: boolean;
};

const TIERS: Tier[] = [
  {
    label: "Essential",
    price: "$120",
    caption: "2–3 bedroom home",
    features: [
      { text: "All rooms + bathrooms", included: true },
      { text: "Vacuum & mop floors", included: true },
      { text: "Kitchen & benchtops", included: true },
      { text: "Inside oven / fridge", included: false },
      { text: "Bond guarantee", included: false },
    ],
    cta: "Get a Quote",
  },
  {
    label: "⭐ Most Popular",
    price: "$220",
    caption: "3–4 bedroom home",
    features: [
      { text: "Everything in Essential", included: true },
      { text: "Inside oven & fridge", included: true },
      { text: "Skirting boards & doors", included: true },
      { text: "Blind dusting", included: true },
      { text: "Bond guarantee", included: false },
    ],
    cta: "Book Now",
    popular: true,
  },
  {
    label: "Bond Clean",
    price: "$320",
    caption: "Any size property",
    features: [
      { text: "Complete deep clean", included: true },
      { text: "Oven, fridge, dishwasher", included: true },
      { text: "Walls & light fittings", included: true },
      { text: "100% Bond guarantee", included: true },
      { text: "Free re-clean if needed", included: true },
    ],
    cta: "Get a Quote",
  },
];

function FeatureIcon({ included, popular }: { included: boolean; popular?: boolean }) {
  if (included) {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16">
        <circle cx="8" cy="8" r="7" fill={popular ? "rgba(255,255,255,.2)" : "#FFF0EF"} />
        <polyline
          points="4.5,8 7,10.5 11.5,5.5"
          stroke={popular ? "#fff" : "#D41F1F"}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 16 16">
      <circle cx="8" cy="8" r="7" fill={popular ? "rgba(255,255,255,.08)" : "#F0F0EE"} />
      <line x1="5.5" y1="5.5" x2="10.5" y2="10.5" stroke={popular ? "rgba(255,255,255,.3)" : "#CCC"} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="10.5" y1="5.5" x2="5.5" y2="10.5" stroke={popular ? "rgba(255,255,255,.3)" : "#CCC"} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-20 bg-white py-24">
      <div className="mx-auto max-w-[1280px] px-20">
        <SectionHeading
          eyebrow="Transparent Pricing"
          title="Clear, Honest Packages"
          subtitle="No hidden fees. No surprises. Just great cleaning at a fair price."
          className="mx-auto mb-15 max-w-[480px]"
        />

        <div className="grid grid-cols-3 items-start gap-6">
          {TIERS.map((tier) => (
            <div
              key={tier.label}
              className={`rounded-[14px] p-10 ${
                tier.popular
                  ? "-translate-y-4 bg-redro-red shadow-[0_16px_48px_rgba(212,31,31,0.28)]"
                  : "bg-redro-cream"
              }`}
            >
              <div
                className={`font-display mb-5 text-xs font-bold tracking-[0.08em] uppercase ${
                  tier.popular ? "text-white/70" : "text-[#AAA]"
                }`}
              >
                {tier.label}
              </div>
              <div className={`font-display mb-1.5 text-[54px] font-black ${tier.popular ? "text-white" : "text-[#111]"}`}>
                {tier.price}
                <span className={`text-lg font-medium ${tier.popular ? "text-white/60" : "text-[#AAA]"}`}>+</span>
              </div>
              <div className={`mb-7 text-sm ${tier.popular ? "text-white/60" : "text-[#AAA]"}`}>{tier.caption}</div>
              <div className={`mb-7 h-px ${tier.popular ? "bg-white/20" : "bg-[#E0DED8]"}`} />
              <ul className="mb-9 flex flex-col gap-3.5">
                {tier.features.map((feature) => (
                  <li
                    key={feature.text}
                    className={`flex items-center gap-2.5 text-[15px] ${
                      tier.popular
                        ? feature.included
                          ? "text-white/90"
                          : "text-white/50"
                        : feature.included
                          ? "text-[#444]"
                          : "text-[#CCC]"
                    }`}
                  >
                    <FeatureIcon included={feature.included} popular={tier.popular} />
                    {feature.text}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`font-display block rounded-[7px] py-4 text-center text-[13px] font-bold tracking-[0.05em] uppercase ${
                  tier.popular
                    ? "bg-white text-redro-red"
                    : "border-2 border-redro-red text-redro-red"
                }`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>

        <p className="mt-7 text-center text-sm text-[#AAA]">
          All prices are indicative. Final quote depends on property size and condition.{" "}
          <a href="#contact" className="text-redro-red">
            Get your exact quote →
          </a>
        </p>
      </div>
    </section>
  );
}
