import { NextResponse, NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "../../../../generated/prisma";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, description, publicId, originalSize, compressedSize, duration } = await request.json();

    // Make sure we're getting the compressed size from the video-upload route
    const video = await prisma.video.create({
      data: {
        title,
        description,
        publicId,
        originalSize: String(originalSize),
        compressedSize: String(compressedSize), // Using compressedSize parameter instead of bytes
        duration: duration || 0,
      },
    });

    return NextResponse.json(video);
  } catch (error) {
    console.log("Save video metadata failed", error);
    return NextResponse.json({ error: "Failed to save video metadata" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}