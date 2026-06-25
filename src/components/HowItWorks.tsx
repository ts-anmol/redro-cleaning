import Image from "next/image";
import SectionHeading from "./SectionHeading";

const STEPS = [
  {
    number: "1",
    title: "Book Online",
    description:
      "Choose your service, pick a date and time. Takes just 2 minutes. Instant confirmation by SMS and email.",
    image: "/howitworks-step1.png",
    alt: "Booking a home cleaning service online from a phone",
  },
  {
    number: "2",
    title: "We Arrive On Time",
    description:
      "Our insured, police-checked cleaners arrive at your door on time, fully equipped and ready to deliver exceptional results.",
    image: "/howitworks-step2.png",
    alt: "Professional cleaner arriving at a front door with cleaning supplies",
  },
  {
    number: "3",
    title: "Enjoy Spotless Results",
    description:
      "Sit back and enjoy your freshly cleaned space. Not happy? We'll come back and re-clean for free — guaranteed.",
    image: "/howitworks-step3.png",
    alt: "Relaxing in a spotless freshly cleaned living room",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-redro-cream py-24">
      <div className="mx-auto max-w-[1280px] px-20">
        <SectionHeading
          eyebrow="Simple Process"
          title="How It Works"
          subtitle="Three simple steps to a spotless home."
          className="mb-16"
        />

        <div className="grid grid-cols-3 gap-8">
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              className="relative rounded-[14px] bg-white p-10 shadow-[0_2px_8px_rgba(0,0,0,0.05)]"
            >
              {i < STEPS.length - 1 && (
                <>
                  <div
                    className="absolute top-21 left-[calc(50%+44px)] z-10 h-0.5 w-[calc(100%-56px)]"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(90deg, #D41F1F 0, #D41F1F 8px, transparent 8px, transparent 18px)",
                    }}
                  />
                  <div className="absolute top-21 -right-8 z-20 h-0.5 w-8 bg-redro-cream" />
                </>
              )}
              <div className="mx-auto mb-7 flex h-22 w-22 items-center justify-center rounded-full bg-redro-red">
                <span className="font-display text-[32px] font-black text-white">
                  {step.number}
                </span>
              </div>
              <div className="relative mb-6 h-45 overflow-hidden rounded-lg">
                <Image
                  src={step.image}
                  alt={step.alt}
                  fill
                  className="object-cover"
                  sizes="33vw"
                />
              </div>
              <h3 className="font-display mb-2.5 text-xl font-bold text-[#111]">
                {step.title}
              </h3>
              <p className="text-[15px] leading-[1.7] text-[#666]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
