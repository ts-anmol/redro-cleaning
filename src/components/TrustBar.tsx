const ITEMS = [
  { icon: "check", label: "100% Bond Back Guarantee" },
  { icon: "shield", label: "Insured & Police-Checked" },
  { icon: "check", label: "Eco-Friendly Products" },
  { icon: "star", label: "5★ Rated on Google" },
  { icon: "check", label: "Same-Day Booking Available" },
];

function Icon({ name }: { name: string }) {
  if (name === "shield") {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="3" y="3" width="12" height="12" rx="2" stroke="rgba(255,255,255,.5)" strokeWidth="1.4" />
        <polyline points="5.5,9 8,11.5 12.5,6.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === "star") {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <polygon
          points="9,2 11,6.5 16,6.5 12,10 13.5,15.5 9,12.5 4.5,15.5 6,10 2,6.5 7,6.5"
          stroke="rgba(255,255,255,.5)"
          strokeWidth="1.4"
          fill="none"
        />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7.5" stroke="rgba(255,255,255,.5)" strokeWidth="1.4" />
      <polyline points="5,9 8,12 13,6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function TrustBar() {
  return (
    <div
      className="bg-redro-red px-5 pt-5.5 pb-10.5 sm:px-8 lg:px-20"
      style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 22px), 0 100%)" }}
    >
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-center gap-x-6 gap-y-3 lg:justify-between lg:gap-0">
        {ITEMS.map((item) => (
          <div key={item.label} className="flex items-center gap-2.5 text-white">
            <Icon name={item.icon} />
            <span className="font-display text-[13px] font-semibold tracking-[0.04em]">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
