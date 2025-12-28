import { getUserSession } from "@/lib/get-user-session";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma-client";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await getUserSession();
    if (!user) {
      return new NextResponse("You are not logged in", { status: 401 });
    }
    const data = await prisma.user.findUnique({
      where: { id: Number(user.id) },
      select: {
        fullName: true,
        email: true,
        password: false,
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    return new NextResponse("Error fetching user data " + error, {
      status: 500,
    });
  }
}
