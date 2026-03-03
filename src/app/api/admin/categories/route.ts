import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma-client";
import { getUserSession } from "@/lib/get-user-session";

async function requireAdmin() {
  const session = await getUserSession();
  if (!session || session.role !== "ADMIN") {
    const res = NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    throw res;
  }
}

export async function GET(req: NextRequest) {
  await requireAdmin();
  const categories = await prisma.category.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });
  return NextResponse.json({ categories });
}
