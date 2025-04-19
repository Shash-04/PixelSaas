// pages/api/save-video.js or app/api/save-video/route.js
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "../../../../generated/prisma";

const prisma = new PrismaClient();

export async function POST(request : NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, description, publicId, originalSize, bytes, duration } = await request.json();

    const video = await prisma.video.create({
      data: {
        title,
        description,
        publicId,
        originalSize: String(originalSize),
        compressedSize: String(bytes),
        duration: duration || 0, // If you store the userId in your video model
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