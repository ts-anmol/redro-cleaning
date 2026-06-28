/**
 * Optional demo data for verifying the admin dashboard.
 * Run:    npx tsx prisma/demo-seed.ts
 * Remove: npx tsx prisma/demo-seed.ts --clean
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const DEMO_EMAILS = [
  "sarah.m@example.com",
  "james.t@example.com",
  "priya.k@example.com",
];

async function clean() {
  await prisma.booking.deleteMany({ where: { lead: { email: { in: DEMO_EMAILS } } } });
  await prisma.lead.deleteMany({ where: { email: { in: DEMO_EMAILS } } });
  await prisma.customer.deleteMany({ where: { email: { in: DEMO_EMAILS } } });
  console.log("Removed demo records.");
}

async function main() {
  if (process.argv.includes("--clean")) {
    await clean();
    return;
  }

  await clean(); // idempotent re-seed

  const lead1 = await prisma.lead.create({
    data: {
      firstName: "Sarah",
      lastName: "M",
      email: DEMO_EMAILS[0],
      phone: "+61 412 345 678",
      serviceType: "end-of-lease",
      preferredDate: "2026-07-10",
      bedrooms: "3",
      message: "Moving out of a 3-bed in Surry Hills, need bond clean.",
      status: "NEW",
    },
  });

  await prisma.lead.create({
    data: {
      firstName: "James",
      lastName: "T",
      email: DEMO_EMAILS[1],
      phone: "+61 423 111 222",
      serviceType: "move-out",
      preferredDate: "2026-07-14",
      bedrooms: "2",
      status: "QUOTED",
    },
  });

  const customer = await prisma.customer.create({
    data: {
      firstName: "Priya",
      lastName: "K",
      email: DEMO_EMAILS[2],
      phone: "+61 434 999 000",
      address: "12 Phillip St, Parramatta NSW",
    },
  });

  const lead3 = await prisma.lead.create({
    data: {
      firstName: "Priya",
      lastName: "K",
      email: DEMO_EMAILS[2],
      phone: "+61 434 999 000",
      serviceType: "move-in",
      preferredDate: "2026-07-02",
      bedrooms: "4+",
      status: "BOOKED",
    },
  });

  await prisma.booking.create({
    data: {
      leadId: lead3.id,
      customerId: customer.id,
      serviceType: "move-in",
      scheduledAt: new Date("2026-07-02T09:30:00"),
      address: "12 Phillip St, Parramatta NSW",
      bedrooms: "4+",
      price: 420,
      status: "SCHEDULED",
    },
  });

  console.log(`Seeded demo data (lead ${lead1.id.slice(0, 6)}… + 2 more, 1 booking).`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
