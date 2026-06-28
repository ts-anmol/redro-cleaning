import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const SERVICES = [
  {
    key: "end-of-lease",
    title: "End of Lease Cleaning",
    price: "From $250",
    description:
      "Our top-rated end-of-lease cleaning offers a 7-day 100% bond back guarantee. We follow the full real estate inspection checklist to ensure your property is left spotless and meets every landlord and property manager standard.",
    isAddon: false,
  },
  {
    key: "move-in",
    title: "Move-In Cleaning",
    price: "Get a Quote",
    description:
      "Make your new house a home with our professional move-in cleaning. We sanitise and thoroughly clean your new space so you can move in with confidence and complete peace of mind.",
    isAddon: false,
  },
  {
    key: "move-out",
    title: "Move-Out Cleaning",
    price: "Get a Quote",
    description:
      "Leave your old place in pristine condition with our professional move-out cleaning. Designed to satisfy real estate agents at the final inspection and help you secure a full bond refund, stress-free.",
    isAddon: false,
  },
  {
    key: "carpet-steam",
    title: "Carpet Steam Cleaning",
    price: "From $89",
    description:
      "Hot-water extraction for all carpeted areas. Removes deep stains, odours & allergens for a fresh finish.",
    isAddon: true,
  },
  {
    key: "driveway-wash",
    title: "Pressure Driveway Wash",
    price: "From $120",
    description:
      "High-pressure clean to lift oil stains, dirt build-up & tyre marks — restoring curb appeal.",
    isAddon: true,
  },
  {
    key: "balcony",
    title: "Balcony Deep Clean",
    price: "From $69",
    description:
      "Full wash-down of balcony floors, railings, glass panels & drainage. Move-in ready.",
    isAddon: true,
  },
];

async function main() {
  for (const service of SERVICES) {
    await prisma.serviceConfig.upsert({
      where: { key: service.key },
      update: {
        title: service.title,
        price: service.price,
        description: service.description,
        isAddon: service.isAddon,
      },
      create: service,
    });
  }
  console.log(`Seeded ${SERVICES.length} service configs.`);

  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: { id: "singleton" },
  });
  console.log("Seeded site settings singleton.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
