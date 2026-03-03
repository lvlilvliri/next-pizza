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
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ products });
}

export async function POST(req: NextRequest) {
  await requireAdmin();
  const body = await req.json();
  const { name, price, categoryId, imageUrl } = body;

  if (!name || (!price && price !== 0) || !categoryId) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // build variant data array regardless of whether price is single or list
  const variantData = Array.isArray(price)
    ? price.map((p: any) => ({ price: Number(p) }))
    : [{ price: Number(price) }];

  const product = await prisma.product.create({
    data: {
      name,
      imageUrl: imageUrl || "",
      category: { connect: { id: Number(categoryId) } },
      variants: { create: variantData },
    },
  });

  return NextResponse.json({ product });
}
