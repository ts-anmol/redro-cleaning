const STATS = [
  { value: "6+", label: "Years Serving", sub: "Sydney" },
  { value: "2,400+", label: "Homes Cleaned", sub: "Since 2018" },
  { value: "100%", label: "Bond Back Rate", sub: "Guaranteed" },
  { value: "5.0★", label: "Google Rating", sub: "500+ Reviews" },
  { value: "98%", label: "Satisfaction", sub: "Rate" },
];

export default function Stats() {
  return (
    <section className="bg-white py-18">
      <div className="mx-auto max-w-[1280px] px-20">
        <div className="flex overflow-hidden rounded-[14px] border border-redro-border">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex-1 px-7 py-9 text-center ${
                i < STATS.length - 1 ? "border-r border-redro-border" : ""
              }`}
            >
              <div className="font-display mb-2 text-[40px] font-black text-redro-red">{stat.value}</div>
              <div className="font-display mb-1 text-[13px] font-semibold text-[#111]">{stat.label}</div>
              <div className="text-xs text-[#AAA]">{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
