import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";
import type { DashboardStats } from "@/types/admin";

export const dynamic = "force-dynamic";

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  const [totalLeads, newLeads, bookingsThisMonth, completedJobs] =
    await Promise.all([
      prisma.lead.count(),
      prisma.lead.count({ where: { status: "NEW" } }),
      prisma.booking.count({
        where: { scheduledAt: { gte: monthStart, lt: monthEnd } },
      }),
      prisma.booking.count({ where: { status: "COMPLETED" } }),
    ]);

  const stats: DashboardStats = {
    totalLeads,
    newLeads,
    bookingsThisMonth,
    completedJobs,
  };

  return NextResponse.json(stats);
}
