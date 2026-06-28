import SectionHeading from "./SectionHeading";

type PriceItem = {
  label: string;
  price: string;
};

const ITEMS: PriceItem[] = [
  { label: "End of Lease", price: "From $250" },
  { label: "Move-In Cleaning", price: "Get a Quote" },
  { label: "Move-Out Cleaning", price: "Get a Quote" },
  { label: "Carpet Steam Cleaning", price: "From $89" },
  { label: "Pressure Driveway Wash", price: "From $120" },
  { label: "Balcony Deep Clean", price: "From $69" },
];

export default function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-20 bg-white py-24">
      <div className="mx-auto max-w-[1280px] px-20">
        <SectionHeading
          eyebrow="Transparent Pricing"
          title="Honest Starting Prices"
          subtitle="Every property is different, so here's a ballpark for each service. Tell us about your place and we'll confirm an exact, no-obligation quote."
          className="mx-auto mb-15 max-w-[560px]"
        />

        <div className="flex overflow-hidden rounded-[14px] border border-redro-border">
          {ITEMS.map((item, i) => (
            <div key={item.label} className="flex flex-1 items-center">
              {i > 0 && <div className="h-full w-px bg-redro-border" />}
              <div className="flex-1 px-5 py-9 text-center">
                <div className="font-display mb-2 text-[22px] font-black text-redro-red">{item.price}</div>
                <div className="text-[13px] font-medium text-[#666]">{item.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-9 text-center">
          <a
            href="#contact"
            className="font-display inline-block rounded-[7px] bg-redro-red px-10 py-4.5 text-sm font-bold tracking-[0.05em] text-white uppercase shadow-[0_6px_20px_rgba(212,31,31,0.25)]"
          >
            Get Your Exact Quote
          </a>
          <p className="mt-5 text-sm text-[#AAA]">
            All prices are indicative. Final quote depends on property size and condition.
          </p>
        </div>
      </div>
    </section>
  );
}
