import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";
import type { CustomerListItem, Paginated } from "@/types/admin";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 10;

export async function GET(request: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { searchParams } = request.nextUrl;
  const page = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);

  const [total, customers] = await Promise.all([
    prisma.customer.count(),
    prisma.customer.findMany({
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      include: {
        _count: { select: { bookings: true } },
        bookings: { orderBy: { scheduledAt: "desc" }, take: 1 },
      },
    }),
  ]);

  const data: CustomerListItem[] = customers.map((customer) => {
    const { _count, bookings, ...rest } = customer;
    return {
      ...rest,
      bookingCount: _count.bookings,
      lastBookingAt: bookings[0]?.scheduledAt.toISOString() ?? null,
    };
  });

  const result: Paginated<CustomerListItem> = {
    data,
    page,
    pageSize: PAGE_SIZE,
    total,
    totalPages: Math.max(1, Math.ceil(total / PAGE_SIZE)),
  };

  return NextResponse.json(result);
}
