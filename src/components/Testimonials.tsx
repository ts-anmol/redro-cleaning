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
      '"I\'ve used Redro for weekly house cleans for over 6 months now. They\'re always on time, always thorough and always professional. My house has genuinely never looked better."',
    initial: "J",
    name: "James T.",
    location: "Newtown, Sydney",
  },
  {
    quote:
      '"Booked a deep clean before we moved in and was completely blown away by the results. Every single corner was spotless. Redro is the only cleaning company I\'ll ever use."',
    initial: "P",
    name: "Priya K.",
    location: "Parramatta, Sydney",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-[1280px] px-20">
        <SectionHeading eyebrow="Reviews" title="What Sydney Locals Say" className="mb-15" />
        <div className="-mt-6 mb-15 flex items-center justify-center gap-4">
          <div className="text-xl text-[#FBBC04]">★★★★★</div>
          <div className="font-display text-base font-semibold text-[#111]">5.0</div>
          <div className="text-sm text-[#888]">based on</div>
          <div className="font-display text-sm font-semibold text-[#111]">500+ Google Reviews</div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {REVIEWS.map((review) => (
            <div key={review.name} className="rounded-[14px] border-t-[3px] border-redro-red bg-redro-cream p-9">
              <div className="mb-4 text-base text-[#FBBC04]">★★★★★</div>
              <p className="mb-6 text-[15px] leading-[1.8] text-[#444]">{review.quote}</p>
              <div className="flex items-center gap-3">
                <div className="flex h-10.5 w-10.5 shrink-0 items-center justify-center rounded-full bg-redro-red">
                  <span className="font-display text-base font-bold text-white">{review.initial}</span>
                </div>
                <div>
                  <div className="font-display text-[15px] font-semibold text-[#111]">{review.name}</div>
                  <div className="mt-1 text-[13px] text-[#AAA]">{review.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-9 text-center">
          <a href="#" className="font-display text-sm font-semibold tracking-[0.04em] text-redro-red uppercase">
            Read All 500+ Google Reviews →
          </a>
        </div>
      </div>
    </section>
  );
}
