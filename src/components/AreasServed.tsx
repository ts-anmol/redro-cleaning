const AREAS = [
  "Sydney CBD",
  "Inner West",
  "Eastern Suburbs",
  "North Shore",
  "Western Sydney",
  "South Sydney",
  "Parramatta",
  "Northern Beaches",
  "Hills District",
];

export default function AreasServed() {
  return (
    <section className="bg-white px-20 py-12">
      <div className="mx-auto max-w-[1280px] text-center">
        <div className="font-display mb-4 text-[13px] font-semibold tracking-[0.06em] text-[#AAA] uppercase">
          Proudly Serving
        </div>
        <div className="flex flex-wrap justify-center gap-2.5">
          {AREAS.map((area) => (
            <span
              key={area}
              className="rounded-full border border-[#E6E4E0] bg-redro-cream px-4.5 py-2 text-[13px] font-medium text-[#555]"
            >
              {area}
            </span>
          ))}
          <span className="rounded-full border border-[#FFCBC9] bg-redro-tint px-4.5 py-2 text-[13px] font-medium text-redro-red">
            + More →
          </span>
        </div>
      </div>
    </section>
  );
}
