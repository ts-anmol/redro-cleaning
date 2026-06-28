import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";
import {
  BOOKING_STATUSES,
  type BookingStatus,
  type Paginated,
} from "@/types/admin";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 10;

export async function GET(request: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { searchParams } = request.nextUrl;
  const statusParam = searchParams.get("status");
  const page = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);

  const where: Prisma.BookingWhereInput = {};
  if (statusParam && BOOKING_STATUSES.includes(statusParam as BookingStatus)) {
    where.status = statusParam as BookingStatus;
  }

  const [total, data] = await Promise.all([
    prisma.booking.count({ where }),
    prisma.booking.findMany({
      where,
      include: { customer: true, lead: true },
      orderBy: { scheduledAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
  ]);

  const result: Paginated<(typeof data)[number]> = {
    data,
    page,
    pageSize: PAGE_SIZE,
    total,
    totalPages: Math.max(1, Math.ceil(total / PAGE_SIZE)),
  };

  return NextResponse.json(result);
}

type NewCustomer = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

type PostBody = {
  customerId?: string | null;
  newCustomer?: NewCustomer | null;
  serviceType?: string;
  address?: string;
  scheduledAt?: string;
  bedrooms?: string;
  price?: number | string | null;
  notes?: string;
};

export async function POST(request: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const body = (await request.json().catch(() => null)) as PostBody | null;

  if (
    !body ||
    !body.serviceType?.trim() ||
    !body.address?.trim() ||
    !body.scheduledAt ||
    !body.bedrooms?.trim()
  ) {
    return NextResponse.json(
      { error: "Service, address, date and bedrooms are required." },
      { status: 400 },
    );
  }

  const scheduledAt = new Date(body.scheduledAt);
  if (Number.isNaN(scheduledAt.getTime())) {
    return NextResponse.json(
      { error: "Invalid scheduled date." },
      { status: 400 },
    );
  }

  let customerId: string | null = body.customerId?.trim() || null;

  if (!customerId && body.newCustomer) {
    const nc = body.newCustomer;
    if (!nc.firstName?.trim() || !nc.lastName?.trim() || !nc.email?.trim()) {
      return NextResponse.json(
        { error: "New customer needs a first name, last name and email." },
        { status: 400 },
      );
    }
    const customer = await prisma.customer.upsert({
      where: { email: nc.email.trim() },
      update: {
        firstName: nc.firstName.trim(),
        lastName: nc.lastName.trim(),
        phone: nc.phone?.trim() ?? "",
        address: body.address.trim(),
      },
      create: {
        firstName: nc.firstName.trim(),
        lastName: nc.lastName.trim(),
        email: nc.email.trim(),
        phone: nc.phone?.trim() ?? "",
        address: body.address.trim(),
      },
    });
    customerId = customer.id;
  }

  const priceValue =
    body.price === null || body.price === undefined || body.price === ""
      ? null
      : Number(body.price);

  const booking = await prisma.booking.create({
    data: {
      customerId,
      serviceType: body.serviceType.trim(),
      scheduledAt,
      address: body.address.trim(),
      bedrooms: body.bedrooms.trim(),
      price: priceValue,
      notes: body.notes?.trim() || null,
      status: "SCHEDULED",
    },
    include: { customer: true, lead: true },
  });

  return NextResponse.json(booking, { status: 201 });
}
