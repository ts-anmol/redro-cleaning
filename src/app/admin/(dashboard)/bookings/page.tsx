import Link from "next/link";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import BookingsTable from "@/components/admin/BookingsTable";

export const dynamic = "force-dynamic";

export default async function BookingsPage() {
  const bookings = await prisma.booking.findMany({
    orderBy: { scheduledAt: "desc" },
    include: { customer: true, lead: true },
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-[#111]">
            Bookings
          </h1>
          <p className="mt-1 text-sm text-[#666]">
            Scheduled jobs across all customers.
          </p>
        </div>
        <Link
          href="/admin/bookings/new"
          className="font-display inline-flex shrink-0 items-center gap-2 rounded-[7px] bg-redro-red px-6 py-3 text-sm font-bold tracking-[0.05em] text-white uppercase shadow-[0_6px_20px_rgba(212,31,31,0.25)] transition-opacity hover:opacity-95"
        >
          <Plus size={16} strokeWidth={2.5} />
          New Booking
        </Link>
      </div>
      <BookingsTable bookings={bookings} />
    </div>
  );
}
