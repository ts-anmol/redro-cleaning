import { prisma } from "@/lib/prisma";
import CustomersTable from "@/components/admin/CustomersTable";
import type { CustomerListItem } from "@/types/admin";

export const dynamic = "force-dynamic";

export default async function CustomersPage() {
  const customers = await prisma.customer.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { bookings: true } },
      bookings: { orderBy: { scheduledAt: "desc" }, take: 1 },
    },
  });

  const data: CustomerListItem[] = customers.map((customer) => {
    const { _count, bookings, ...rest } = customer;
    return {
      ...rest,
      bookingCount: _count.bookings,
      lastBookingAt: bookings[0]?.scheduledAt.toISOString() ?? null,
    };
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-[#111]">
          Customers
        </h1>
        <p className="mt-1 text-sm text-[#666]">
          Everyone who has booked or been converted from a lead.
        </p>
      </div>
      <CustomersTable customers={data} />
    </div>
  );
}
