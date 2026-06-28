const STATS = [
  { value: "6+", label: "Years Serving", sub: "Sydney" },
  { value: "2,400+", label: "Homes Cleaned", sub: "Since 2018" },
  { value: "100%", label: "Bond Back Rate", sub: "Guaranteed" },
  { value: "5.0★", label: "Google Rating", sub: "500+ Reviews" },
  { value: "98%", label: "Satisfaction", sub: "Rate" },
];

export default function Stats() {
  return (
    <section className="bg-white py-12 lg:py-18">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-20">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[14px] border border-redro-border bg-redro-border lg:grid-cols-5">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`bg-white px-5 py-7 text-center lg:px-7 lg:py-9 lg:col-span-1 ${
                i === STATS.length - 1 ? "col-span-2" : ""
              }`}
            >
              <div className="font-display mb-2 text-[32px] font-black text-redro-red lg:text-[40px]">{stat.value}</div>
              <div className="font-display mb-1 text-[13px] font-semibold text-[#111]">{stat.label}</div>
              <div className="text-xs text-[#AAA]">{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
