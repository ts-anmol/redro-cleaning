import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import CustomerDetailClient from "@/components/admin/CustomerDetailClient";

export const dynamic = "force-dynamic";

export default async function CustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const customer = await prisma.customer.findUnique({
    where: { id },
    include: { bookings: { orderBy: { scheduledAt: "desc" } } },
  });

  if (!customer) notFound();

  return <CustomerDetailClient customer={customer} />;
}
