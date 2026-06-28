import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";
import { LEAD_STATUSES, type LeadStatus } from "@/types/admin";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: RouteContext) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const lead = await prisma.lead.findUnique({
    where: { id },
    include: { booking: true },
  });

  if (!lead) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  return NextResponse.json(lead);
}

type PatchBody = {
  action?: "update" | "convert";
  status?: string;
  notes?: string;
  // convert fields
  address?: string;
  scheduledAt?: string;
  price?: number | string | null;
};

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const body = (await request.json().catch(() => null)) as PatchBody | null;

  if (!body) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const lead = await prisma.lead.findUnique({
    where: { id },
    include: { booking: true },
  });

  if (!lead) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  // ---- Convert to booking ----
  if (body.action === "convert") {
    if (lead.booking) {
      return NextResponse.json(
        { error: "Lead already has a booking." },
        { status: 409 },
      );
    }
    if (!body.address?.trim() || !body.scheduledAt) {
      return NextResponse.json(
        { error: "Address and scheduled date are required." },
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

    const priceValue =
      body.price === null || body.price === undefined || body.price === ""
        ? null
        : Number(body.price);

    // Upsert a customer record from the lead so the customers list stays in sync.
    const customer = await prisma.customer.upsert({
      where: { email: lead.email },
      update: {
        firstName: lead.firstName,
        lastName: lead.lastName,
        phone: lead.phone,
        address: body.address.trim(),
      },
      create: {
        firstName: lead.firstName,
        lastName: lead.lastName,
        email: lead.email,
        phone: lead.phone,
        address: body.address.trim(),
      },
    });

    const booking = await prisma.booking.create({
      data: {
        leadId: lead.id,
        customerId: customer.id,
        serviceType: lead.serviceType,
        scheduledAt,
        address: body.address.trim(),
        bedrooms: lead.bedrooms,
        price: priceValue,
        status: "SCHEDULED",
      },
    });

    await prisma.lead.update({
      where: { id: lead.id },
      data: { status: "BOOKED" },
    });

    return NextResponse.json({ booking, customerId: customer.id });
  }

  // ---- Simple update (status / notes) ----
  const data: { status?: LeadStatus; notes?: string } = {};

  if (typeof body.status === "string") {
    if (!LEAD_STATUSES.includes(body.status as LeadStatus)) {
      return NextResponse.json({ error: "Invalid status." }, { status: 400 });
    }
    data.status = body.status as LeadStatus;
  }

  if (typeof body.notes === "string") {
    data.notes = body.notes;
  }

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: "Nothing to update." }, { status: 400 });
  }

  const updated = await prisma.lead.update({
    where: { id },
    data,
    include: { booking: true },
  });

  return NextResponse.json(updated);
}
