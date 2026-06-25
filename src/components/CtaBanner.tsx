export default function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-redro-red px-20 py-18">
      <div className="pointer-events-none absolute -top-20 -left-20 h-90 w-90 rounded-full bg-white opacity-[0.04]" />
      <div className="pointer-events-none absolute -right-15 -bottom-15 h-70 w-70 rounded-full bg-white opacity-[0.04]" />

      <div className="relative z-10 mx-auto flex max-w-[1280px] items-center justify-between">
        <div>
          <h2 className="font-display mb-3 text-[46px] leading-[1.05] font-extrabold tracking-[-0.02em] text-white">
            Ready for a spotless home?
          </h2>
          <p className="text-lg text-white/75">
            Book online in 2 minutes. Same-day appointments available across Sydney.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-4">
          <a
            href="#contact"
            className="font-display rounded-[5px] bg-white px-9 py-4.5 text-sm font-bold tracking-[0.05em] text-redro-red whitespace-nowrap uppercase"
          >
            Book Online Now
          </a>
          <a
            href="tel:+61404504303"
            className="font-display rounded-[5px] border-2 border-white/50 px-7 py-4 text-sm font-bold tracking-[0.04em] text-white whitespace-nowrap uppercase"
          >
            +61 404 504 303
          </a>
        </div>
      </div>
    </section>
  );
}
