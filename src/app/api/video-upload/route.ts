import { v2 as cloudinary } from "cloudinary";
import { NextResponse, NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "../../../../generated/prisma";

const prisma = new PrismaClient()

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryUploadResult {
    public_id: string,
    bytes: number;
    duration?: number;
    [key: string]: any
}

export async function POST(request: NextRequest) {
    try {
        const { userId } = await auth()
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const formData = await request.formData();
        const file = formData.get("file") as File | null;
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;

        if (!file) {
            return NextResponse.json({ error: "File not found" }, { status: 400 })
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const originalSize = buffer.length;

        const result = await new Promise<CloudinaryUploadResult>(
            (resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { 
                        resource_type: "video",
                        folder: "video-uploads",
                        transformation: [
                            {quality: "auto", fetch_format: "mp4"},
                        ]
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result as CloudinaryUploadResult);
                    }
                )
                uploadStream.end(buffer)
            }
        )

        console.log("Cloudinary result:", result);
        
        const video = await prisma.video.create({
            data: {
                title,
                description,
                publicId: result.public_id,
                originalSize: String(originalSize),
                compressedSize: String(result.bytes), // This is the compressed size from Cloudinary
                duration: result.duration || 0
            }
        })   
        return NextResponse.json({
            ...video,
            cloudinaryBytes: result.bytes,
            originalBytes: originalSize
        })
    } catch (error) {
        console.log("Video Upload failed", error)
        return NextResponse.json({ error: "Upload Video failed" }, { status: 500 })
    }
    finally{
        await prisma.$disconnect()
    }    
}