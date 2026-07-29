import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";

export const dynamic = "force-dynamic";

const SINGLETON_ID = "singleton";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** `adminEmail` accepts a comma-separated list; every address must be valid. */
function isValidRecipientList(value: string): boolean {
  const addresses = value
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);
  return addresses.length > 0 && addresses.every((a) => EMAIL_PATTERN.test(a));
}

async function getOrCreateSettings() {
  return prisma.siteSettings.upsert({
    where: { id: SINGLETON_ID },
    update: {},
    create: { id: SINGLETON_ID },
  });
}

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const settings = await getOrCreateSettings();
  return NextResponse.json(settings);
}

type PatchBody = {
  adminEmail?: string;
  businessName?: string;
  phone?: string;
  emailFrom?: string;
  contactEmail?: string;
};

export async function PATCH(request: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const body = (await request.json().catch(() => null)) as PatchBody | null;
  if (!body) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const data: PatchBody = {};
  if (typeof body.adminEmail === "string") {
    if (!isValidRecipientList(body.adminEmail)) {
      return NextResponse.json(
        { error: "Enter one or more valid email addresses, separated by commas." },
        { status: 400 },
      );
    }
    data.adminEmail = body.adminEmail;
  }
  if (typeof body.businessName === "string")
    data.businessName = body.businessName;
  if (typeof body.phone === "string") data.phone = body.phone;
  if (typeof body.emailFrom === "string") data.emailFrom = body.emailFrom;
  if (typeof body.contactEmail === "string")
    data.contactEmail = body.contactEmail;

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: "Nothing to update." }, { status: 400 });
  }

  await getOrCreateSettings();
  const updated = await prisma.siteSettings.update({
    where: { id: SINGLETON_ID },
    data,
  });

  // Phone / contact email show on the public homepage — refresh it.
  revalidatePath("/");

  return NextResponse.json(updated);
}
