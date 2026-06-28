export default function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-redro-red px-5 py-14 sm:px-8 lg:px-20 lg:py-18">
      <div className="pointer-events-none absolute -top-20 -left-20 h-90 w-90 rounded-full bg-white opacity-[0.04]" />
      <div className="pointer-events-none absolute -right-15 -bottom-15 h-70 w-70 rounded-full bg-white opacity-[0.04]" />

      <div className="relative z-10 mx-auto flex max-w-[1280px] flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-4">
        <div>
          <h2 className="font-display mb-3 text-[clamp(2rem,7vw,46px)] leading-[1.1] font-extrabold tracking-[-0.02em] text-white lg:text-[46px] lg:leading-[1.05]">
            Ready for a spotless home?
          </h2>
          <p className="text-base text-white/75 sm:text-lg">
            Book online in 2 minutes. Same-day appointments available across Sydney.
          </p>
        </div>
        <div className="flex w-full shrink-0 flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
          <a
            href="#contact"
            className="font-display rounded-[5px] bg-white px-9 py-4.5 text-center text-sm font-bold tracking-[0.05em] text-redro-red whitespace-nowrap uppercase"
          >
            Book Online Now
          </a>
          <a
            href="tel:+61404504303"
            className="font-display rounded-[5px] border-2 border-white/50 px-7 py-4 text-center text-sm font-bold tracking-[0.04em] text-white whitespace-nowrap uppercase"
          >
            +61 404 504 303
          </a>
        </div>
      </div>
    </section>
  );
}
