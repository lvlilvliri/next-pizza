import { NextRequest, NextResponse } from "next/server";
import { up, down } from "../../../../../prisma/seed";

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
    await down();
    await up();
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("cron seed error", err);
    return NextResponse.json(
      { error: err.message || "failed" },
      { status: 500 },
    );
  }
}
