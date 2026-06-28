import type { ServiceConfig } from "@/types/admin";
import SectionHeading from "./SectionHeading";

type PriceItem = {
  key: string;
  label: string;
  price: string;
};

const ITEMS: PriceItem[] = [
  { key: "end-of-lease", label: "End of Lease", price: "From $250" },
  { key: "move-in", label: "Move-In Cleaning", price: "Get a Quote" },
  { key: "move-out", label: "Move-Out Cleaning", price: "Get a Quote" },
  { key: "carpet-steam", label: "Carpet Steam Cleaning", price: "From $89" },
  { key: "driveway-wash", label: "Pressure Driveway Wash", price: "From $120" },
  { key: "balcony", label: "Balcony Deep Clean", price: "From $69" },
];

export default function Pricing({
  services = [],
}: {
  services?: ServiceConfig[];
}) {
  const byKey = new Map(services.map((c) => [c.key, c]));
  const visibleItems = ITEMS.filter((item) => {
    const db = byKey.get(item.key);
    return !db || db.isActive;
  }).map((item) => {
    const db = byKey.get(item.key);
    return db ? { ...item, price: db.price } : item;
  });

  // Append services added via the admin dashboard (not in the built-in list).
  const knownKeys = new Set(ITEMS.map((i) => i.key));
  const extraItems = services
    .filter((s) => s.isActive && !knownKeys.has(s.key))
    .map((s) => ({ key: s.key, label: s.title, price: s.price }));
  const allItems = [...visibleItems, ...extraItems];

  return (
    <section id="pricing" className="scroll-mt-20 bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-20">
        <SectionHeading
          eyebrow="Transparent Pricing"
          title="Honest Starting Prices"
          subtitle="Every property is different, so here's a ballpark for each service. Tell us about your place and we'll confirm an exact, no-obligation quote."
          className="mx-auto mb-10 max-w-[560px] lg:mb-15"
        />

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[14px] border border-redro-border bg-redro-border sm:grid-cols-3 lg:grid-cols-6">
          {allItems.map((item) => (
            <div key={item.label} className="bg-white px-5 py-7 text-center lg:py-9">
              <div className="font-display mb-2 text-[20px] font-black text-redro-red lg:text-[22px]">{item.price}</div>
              <div className="text-[13px] font-medium text-[#666]">{item.label}</div>
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
