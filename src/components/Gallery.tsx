import Image from "next/image";
import SectionHeading from "./SectionHeading";

const ITEMS = [
  {
    state: "Before" as const,
    room: "Kitchen — Bond Clean",
    src: "/before-kitchen.png",
    alt: "Kitchen before a bond clean",
  },
  {
    state: "After" as const,
    room: "Kitchen — Bond Clean",
    src: "/after%20kitchen.png",
    alt: "Spotless kitchen after a bond clean",
  },
  {
    state: "Before" as const,
    room: "Bathroom — Move-In Clean",
    src: "/beforebathroom.png",
    alt: "Bathroom before a move-in clean",
  },
  {
    state: "After" as const,
    room: "Bathroom — Move-In Clean",
    src: "/afterbathroom.png",
    alt: "Sparkling bathroom after a move-in clean",
  },
];

export default function Gallery() {
  return (
    <section className="bg-redro-cream py-16 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-20">
        <SectionHeading
          eyebrow="Our Work"
          title="Before & After"
          subtitle="Real results from real Sydney homes."
          className="mb-12 lg:mb-14"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {ITEMS.map((item) => (
            <div
              key={`${item.room}-${item.state}`}
              className="relative flex h-60 items-end overflow-hidden rounded-xl sm:h-70"
            >
              <Image src={item.src} alt={item.alt} fill className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" />
              <div className="relative z-10 flex w-full items-center justify-between bg-black/72 px-5 py-3.5">
                <span
                  className={`font-display text-xs font-bold tracking-[0.08em] uppercase ${
                    item.state === "Before" ? "text-redro-red" : "text-[#4CAF80]"
                  }`}
                >
                  {item.state}
                </span>
                <span className="text-xs text-white/60">{item.room}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
