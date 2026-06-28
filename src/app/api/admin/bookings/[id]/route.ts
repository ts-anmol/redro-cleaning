import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";
import { BOOKING_STATUSES, type BookingStatus } from "@/types/admin";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: RouteContext) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: { customer: true, lead: true },
  });

  if (!booking) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }

  return NextResponse.json(booking);
}

type PatchBody = {
  serviceType?: string;
  address?: string;
  scheduledAt?: string;
  bedrooms?: string;
  status?: string;
  price?: number | string | null;
  notes?: string;
};

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const body = (await request.json().catch(() => null)) as PatchBody | null;
  if (!body) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const data: {
    serviceType?: string;
    address?: string;
    scheduledAt?: Date;
    bedrooms?: string;
    status?: BookingStatus;
    price?: number | null;
    notes?: string | null;
  } = {};

  if (typeof body.serviceType === "string") data.serviceType = body.serviceType;
  if (typeof body.address === "string") data.address = body.address;
  if (typeof body.bedrooms === "string") data.bedrooms = body.bedrooms;
  if (typeof body.notes === "string") data.notes = body.notes || null;

  if (body.scheduledAt) {
    const scheduledAt = new Date(body.scheduledAt);
    if (Number.isNaN(scheduledAt.getTime())) {
      return NextResponse.json({ error: "Invalid date." }, { status: 400 });
    }
    data.scheduledAt = scheduledAt;
  }

  if (typeof body.status === "string") {
    if (!BOOKING_STATUSES.includes(body.status as BookingStatus)) {
      return NextResponse.json({ error: "Invalid status." }, { status: 400 });
    }
    data.status = body.status as BookingStatus;
  }

  if (body.price !== undefined) {
    data.price =
      body.price === null || body.price === ""
        ? null
        : Number(body.price);
  }

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: "Nothing to update." }, { status: 400 });
  }

  const updated = await prisma.booking.update({
    where: { id },
    data,
    include: { customer: true, lead: true },
  });

  return NextResponse.json(updated);
}
