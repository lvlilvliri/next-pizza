import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getUserSession } from "@/lib/get-user-session";
import { v2 as cloudinary } from "cloudinary";

async function requireAdmin() {
  const session = await getUserSession();
  if (!session || session.role !== "ADMIN") {
    const res = NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    throw res;
  }
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: NextRequest) {
  await requireAdmin();
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const result = await new Promise<any>((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        {
          folder: "uploads",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      );

      upload.end(buffer);
    });

    return NextResponse.json({
      url: result.secure_url,
    });
  } catch (err) {
    console.error("upload error", err);
    return NextResponse.json({ error: "Unable to upload" }, { status: 500 });
  }
}
