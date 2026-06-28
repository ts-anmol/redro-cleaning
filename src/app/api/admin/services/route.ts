import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const services = await prisma.serviceConfig.findMany({
    orderBy: [{ isAddon: "asc" }, { key: "asc" }],
  });

  return NextResponse.json(services);
}

function slugify(value: string): string {
  return (
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "service"
  );
}

type PostBody = {
  title?: string;
  price?: string;
  description?: string;
  isAddon?: boolean;
};

export async function POST(request: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const body = (await request.json().catch(() => null)) as PostBody | null;

  if (
    !body ||
    !body.title?.trim() ||
    !body.price?.trim() ||
    !body.description?.trim()
  ) {
    return NextResponse.json(
      { error: "Title, price and description are required." },
      { status: 400 },
    );
  }

  // Generate a unique key from the title.
  const base = slugify(body.title);
  let key = base;
  let n = 2;
  while (await prisma.serviceConfig.findUnique({ where: { key } })) {
    key = `${base}-${n}`;
    n += 1;
  }

  const service = await prisma.serviceConfig.create({
    data: {
      key,
      title: body.title.trim(),
      price: body.price.trim(),
      description: body.description.trim(),
      isAddon: Boolean(body.isAddon),
      isActive: true,
    },
  });

  // Show it on the public site immediately.
  revalidatePath("/");

  return NextResponse.json(service, { status: 201 });
}
