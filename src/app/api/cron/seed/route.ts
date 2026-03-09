import { NextRequest, NextResponse } from "next/server";
import { up, down, main } from "../../../../../prisma/seed";
import { prisma } from "../../../../../prisma/prisma-client";

const SECRET = process.env.CRON_SECRET;

export async function GET(req: NextRequest) {
  if (SECRET) {
    const url = new URL(req.url);
    const key = url.searchParams.get("secret");
    if (key !== SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    await main()
      .then(async () => {
        await prisma.$disconnect();
      })
      .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
      });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("cron seed error", err);
    return NextResponse.json(
      { error: err.message || "failed" },
      { status: 500 },
    );
  }
}
