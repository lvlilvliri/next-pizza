import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma-client";

export async function GET(req: NextRequest) {
  try {
    const code = req.nextUrl.searchParams.get("code");

    if (!code) {
      return new Response("Verification code is missing", { status: 400 });
    }

    const verificationCode = await prisma.verificationCode.findFirst({
      where: { code },
    });

    if (!verificationCode) {
      return new Response("Invalid verification code", { status: 400 });
    }

    await prisma.user.update({
      where: { id: verificationCode.userId },
      data: { verified: new Date() },
    });

    await prisma.verificationCode.delete({
      where: { id: verificationCode.id },
    });

    return NextResponse.redirect(new URL("/?verified", req.url));
  } catch (error) {
    console.log("[VERIFY USER]:", error);
    return new Response("Error verifying user", { status: 500 });
  }
}
