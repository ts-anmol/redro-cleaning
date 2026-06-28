import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import LeadDetailClient from "@/components/admin/LeadDetailClient";

export const dynamic = "force-dynamic";

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lead = await prisma.lead.findUnique({
    where: { id },
    include: { booking: true },
  });

  if (!lead) notFound();

  return <LeadDetailClient lead={lead} />;
}
