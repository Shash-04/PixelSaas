import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "../../../../generated/prisma";
import { v2 as cloudinary } from "cloudinary";
import { filesize } from "filesize";

const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, description, publicId, originalSize, duration } = await request.json();

    // Fetch video resource from Cloudinary
    const resource = await cloudinary.api.resource(publicId, {
      resource_type: "video",
    });

    // Find derived/compressed version (change this logic if your transformation is different)
    const compressedAsset = resource.derived?.[0]; // optionally match transformation here

    const compressedBytes = compressedAsset?.bytes || 0;
    const formattedCompressedSize = filesize(compressedBytes);
    const formattedOriginalSize = filesize(Number(originalSize));

    // Save to DB
    const video = await prisma.video.create({
      data: {
        title,
        description,
        publicId,
        originalSize: String(originalSize),
        compressedSize: String(compressedBytes),
        duration: duration || 0,
        // optionally: formattedOriginalSize, formattedCompressedSize if you have those fields
      },
    });

    return NextResponse.json({
      ...video,
      formattedOriginalSize,
      formattedCompressedSize,
    });
  } catch (error) {
    console.error("Save video metadata failed", error);
    return NextResponse.json({ error: "Failed to save video metadata" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
