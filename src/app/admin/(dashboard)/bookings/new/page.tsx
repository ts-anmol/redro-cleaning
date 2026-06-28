import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import NewBookingForm from "@/components/admin/NewBookingForm";

export const dynamic = "force-dynamic";

export default async function NewBookingPage() {
  const customers = await prisma.customer.findMany({
    orderBy: { firstName: "asc" },
    select: { id: true, firstName: true, lastName: true, email: true },
  });

  return (
    <div className="flex max-w-3xl flex-col gap-6">
      <div>
        <Link
          href="/admin/bookings"
          className="mb-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#666] hover:text-redro-red"
        >
          <ArrowLeft size={16} />
          Back to bookings
        </Link>
        <h1 className="font-display text-2xl font-extrabold text-[#111]">
          Create Booking
        </h1>
        <p className="mt-1 text-sm text-[#666]">
          Schedule a job for an existing or new customer.
        </p>
      </div>
      <NewBookingForm customers={customers} />
    </div>
  );
}
