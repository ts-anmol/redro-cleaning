const SERVICE_LINKS = ["Regular Cleaning", "Apartment Cleaning", "Deep Cleaning", "End of Lease"];
const COMPANY_LINKS = ["About Us", "Reviews", "FAQ", "Contact"];

export default function Footer() {
  return (
    <footer className="bg-[#111] px-20 pt-16">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-[2.2fr_1fr_1fr_1.2fr] gap-15 border-b border-white/8 pb-13">
          <div>
            <div className="font-display mb-2 text-2xl font-black tracking-[0.02em]">
              <span className="text-redro-red">REDRO</span>
              <span className="text-white"> CLEANING</span>
            </div>
            <div className="font-display mb-6 text-[13px] tracking-[0.06em] text-white/30 uppercase">
              Making Spaces Spotless
            </div>
            <p className="mb-7 max-w-70 text-sm leading-[1.8] text-white/45">
              Professional cleaning services across Sydney. Trusted by over 2,400
              families since 2018.
            </p>
            <div className="mb-7 flex gap-2.5">
              <div className="flex h-9.5 w-9.5 items-center justify-center rounded-[7px] bg-white/8">
                <span className="font-display text-[13px] font-bold text-white/55">f</span>
              </div>
              <div className="flex h-9.5 w-9.5 items-center justify-center rounded-[7px] bg-white/8">
                <span className="font-display text-[11px] font-semibold text-white/55">in</span>
              </div>
              <div className="flex h-9.5 w-9.5 items-center justify-center rounded-[7px] bg-white/8">
                <span className="font-display text-[11px] font-semibold text-white/55">ig</span>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3.5 py-2.5">
              <div className="flex gap-0.5 text-[13px] text-[#FBBC04]">★★★★★</div>
              <span className="text-xs font-medium text-white/50">5.0 · 500+ Google Reviews</span>
            </div>
          </div>

          <div>
            <div className="font-display mb-5.5 text-[11px] font-bold tracking-[0.1em] text-redro-red uppercase">
              Services
            </div>
            <div className="flex flex-col gap-3.5">
              {SERVICE_LINKS.map((link) => (
                <a key={link} href="#services" className="text-sm text-white/50">
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="font-display mb-5.5 text-[11px] font-bold tracking-[0.1em] text-redro-red uppercase">
              Company
            </div>
            <div className="flex flex-col gap-3.5">
              {COMPANY_LINKS.map((link) => (
                <a key={link} href="#" className="text-sm text-white/50">
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="font-display mb-5.5 text-[11px] font-bold tracking-[0.1em] text-redro-red uppercase">
              Get in Touch
            </div>
            <div className="flex flex-col gap-3.5">
              <a href="mailto:info@redrocleaning.com.au" className="text-sm leading-[1.4] text-white/50">
                info@redrocleaning.com.au
              </a>
              <a href="tel:+61404504303" className="text-sm leading-[1.4] text-white/50 transition-colors hover:text-white">
                +61 404 504 303
              </a>
              <span className="text-sm leading-[1.4] text-white/50">Sydney, NSW, Australia</span>
              <a
                href="#contact"
                className="font-display mt-2 inline-block rounded-[5px] bg-redro-red px-5 py-3 text-xs font-bold tracking-[0.05em] text-white uppercase"
              >
                Book Online
              </a>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between py-5.5">
          <span className="text-xs text-white/25">
            © 2026 Redro Cleaning Pty Ltd. ABN: 00 000 000 000. All rights reserved.
          </span>
          <div className="flex gap-7">
            <a href="#" className="text-xs text-white/25">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-white/25">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
