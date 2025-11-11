export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma-client";
import { updateCartTotalAmount } from "@/lib";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = Number(idParam);
    const data = (await req.json()) as { quantity: number };
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Cart token not found" },
        { status: 404 }
      );
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: id,
      },
    });

    if (!cartItem) {
      return NextResponse.json(
        { message: "Cart item not found" },
        { status: 404 }
      );
    }

    await prisma.cartItem.update({
      where: {
        id: id,
      },
      data: {
        quantity: data.quantity,
      },
    });

    const updatedCart = await updateCartTotalAmount(token);

    return NextResponse.json(updatedCart);
  } catch (error) {
    console.log("[CART_PATCH] Server error", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = Number(idParam);
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Cart token not found" },
        { status: 404 }
      );
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: id,
      },
    });

    if (!cartItem) {
      return NextResponse.json(
        { message: "Cart item not found" },
        { status: 404 }
      );
    }

    await prisma.cartItem.delete({
      where: {
        id: id,
      },
    });

    const updatedCart = await updateCartTotalAmount(token);

    return NextResponse.json(updatedCart);
  } catch (error) {
    console.log("[CART_DELETE] Server error", error);
    return NextResponse.json(
      { message: "Can not delete cart item, something went wrong" },
      { status: 500 }
    );
  }
}
