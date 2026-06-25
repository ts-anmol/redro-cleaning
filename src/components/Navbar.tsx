import Image from "next/image";

const LINKS = [
  { label: "Home", href: "#" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-[100] flex h-20 items-center justify-between border-b border-[#ECEAE8] bg-white/96 px-20 shadow-[0_1px_0_rgba(0,0,0,0.04),0_4px_20px_rgba(0,0,0,0.04)] backdrop-blur-md">
      <Image src="/logo.png" alt="Redro Cleaning" width={210} height={70} className="h-15 w-auto object-contain" priority />

      <div className="flex items-center gap-9">
        {LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="font-display text-sm font-semibold tracking-[0.02em] text-[#333]"
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-5">
        <a href="tel:+61404504303" className="text-sm font-medium text-[#666] transition-colors hover:text-redro-red">
          +61 404 504 303
        </a>
        <a
          href="#contact"
          className="group inline-flex items-center gap-2 rounded-[5px] bg-redro-red px-7 py-3.5 font-display text-[13px] font-bold uppercase tracking-[0.06em] text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#b81b1b] hover:shadow-[0_10px_24px_rgba(212,31,31,0.35)]"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            className="shrink-0 transition-transform duration-200 group-hover:scale-110"
          >
            <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
            <path d="M2 6.5h12" stroke="currentColor" strokeWidth="1.4" />
            <path d="M5 1.5v3M11 1.5v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            <path
              d="M5.5 9.7l1.5 1.5 3-3.2"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Book Online
        </a>
      </div>
    </nav>
  );
}
