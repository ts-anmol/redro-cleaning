import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ key: string }> };

type PatchBody = {
  title?: string;
  price?: string;
  description?: string;
  isActive?: boolean;
};

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { key } = await params;
  const body = (await request.json().catch(() => null)) as PatchBody | null;
  if (!body) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const data: PatchBody = {};
  if (typeof body.title === "string") data.title = body.title;
  if (typeof body.price === "string") data.price = body.price;
  if (typeof body.description === "string") data.description = body.description;
  if (typeof body.isActive === "boolean") data.isActive = body.isActive;

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: "Nothing to update." }, { status: 400 });
  }

  const existing = await prisma.serviceConfig.findUnique({ where: { key } });
  if (!existing) {
    return NextResponse.json({ error: "Service not found" }, { status: 404 });
  }

  const updated = await prisma.serviceConfig.update({ where: { key }, data });

  // Refresh the public homepage so toggles / edits show up immediately.
  revalidatePath("/");

  return NextResponse.json(updated);
}
