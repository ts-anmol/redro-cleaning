import { NextResponse } from "next/server";
import { auth } from "./auth";

/**
 * Returns a 401 response if there is no authenticated admin session,
 * otherwise `null`. Usage:
 *
 *   const unauthorized = await requireAdmin();
 *   if (unauthorized) return unauthorized;
 */
export async function requireAdmin(): Promise<NextResponse | null> {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
