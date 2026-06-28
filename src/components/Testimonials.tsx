import SectionHeading from "./SectionHeading";

const REVIEWS = [
  {
    quote:
      '"Absolutely spotless end of lease clean. The real estate agent was seriously impressed and we got our full bond back without any issues. Will 100% use Redro again!"',
    initial: "S",
    name: "Sarah M.",
    location: "Surry Hills, Sydney",
  },
  {
    quote:
      '"Our move-out clean was incredibly thorough — the agent didn\'t flag a single thing at final inspection. On time, professional and worth every cent."',
    initial: "J",
    name: "James T.",
    location: "Newtown, Sydney",
  },
  {
    quote:
      '"Booked a move-in clean before we settled into our new place and was completely blown away by the results. Every single corner was spotless. Redro is the only cleaning company I\'ll ever use."',
    initial: "P",
    name: "Priya K.",
    location: "Parramatta, Sydney",
  },
];

export default function Testimonials() {
  return (
    <section id="reviews" className="scroll-mt-20 bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-20">
        <SectionHeading
          eyebrow="Reviews"
          title="What Sydney Locals Say"
          className="mb-12 lg:mb-15"
        />
        <div className="-mt-4 mb-12 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 lg:-mt-6 lg:mb-15 lg:gap-4">
          <div className="text-xl text-[#FBBC04]">★★★★★</div>
          <div className="font-display text-base font-semibold text-[#111]">
            4.8
          </div>
          <div className="text-sm text-[#888]">based on</div>
          <div className="font-display text-sm font-semibold text-[#111]">
            500+ Google Reviews
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((review) => (
            <div
              key={review.name}
              className="rounded-[14px] border-t-[3px] border-redro-red bg-redro-cream p-9"
            >
              <div className="mb-4 text-base text-[#FBBC04]">★★★★★</div>
              <p className="mb-6 text-[15px] leading-[1.8] text-[#444]">
                {review.quote}
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-10.5 w-10.5 shrink-0 items-center justify-center rounded-full bg-redro-red">
                  <span className="font-display text-base font-bold text-white">
                    {review.initial}
                  </span>
                </div>
                <div>
                  <div className="font-display text-[15px] font-semibold text-[#111]">
                    {review.name}
                  </div>
                  <div className="mt-1 text-[13px] text-[#AAA]">
                    {review.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-9 text-center">
          <a
            href="#"
            className="font-display text-sm font-semibold tracking-[0.04em] text-redro-red uppercase"
          >
            Read All 500+ Google Reviews →
          </a>
        </div>
      </div>
    </section>
  );
}
