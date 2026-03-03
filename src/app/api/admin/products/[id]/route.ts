import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../prisma/prisma-client";
import { getUserSession } from "@/lib/get-user-session";
import { connect } from "http2";

async function requireAdmin() {
  const session = await getUserSession();
  if (!session || session.role !== "ADMIN") {
    const res = NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    throw res;
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await requireAdmin();
  const id = Number((await params).id);
  const product = await prisma.product.findUnique({
    where: { id },
    include: { variants: { select: { price: true } } },
  });

  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ product });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await requireAdmin();
  const id = Number((await params).id);
  const body = await req.json();
  const { name, price, categoryId, imageUrl } = body;

  // if price is an array, we'll wipe existing variants and recreate to match order
  if (Array.isArray(price)) {
    // update basic fields first
    await prisma.product.update({
      where: { id },
      data: {
        name,
        imageUrl: imageUrl || "",
        category: categoryId
          ? { connect: { id: Number(categoryId) } }
          : undefined,
      },
    });

    // remove old variants and add new ones
    await prisma.productVariant.deleteMany({ where: { productId: id } });
    if (price.length) {
      await prisma.productVariant.createMany({
        data: price.map((p: any) => ({
          price: Number(p),
          productId: id,
        })),
      });
    }

    const product = await prisma.product.findUnique({ where: { id } });
    return NextResponse.json({ product });
  }

  const product = await prisma.product.update({
    where: { id },
    data: {
      name,
      variants: price
        ? { updateMany: { where: {}, data: { price: Number(price) } } }
        : undefined,
      imageUrl: imageUrl || "",
      category: categoryId
        ? { connect: { id: Number(categoryId) } }
        : undefined,
    },
  });

  return NextResponse.json({ product });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await requireAdmin();
  const id = Number((await params).id);
  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
