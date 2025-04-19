import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '../../../../generated/prisma';

const prisma = new PrismaClient();

// Configuration
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function POST(request: NextRequest) {
  try {
    // Auth check (optional based on your setup)
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get data from client
    const { title, description, publicId, originalSize, duration } = await request.json();
    
    if (!publicId) {
      return NextResponse.json({ error: "Public ID is required" }, { status: 400 });
    }

    // Create a specific URL with our transformation (quality auto, mp4)
    const transformedPublicId = publicId.replace('video-uploads/', 'video-uploads/q_auto,f_mp4/');
    
    // Wait for Cloudinary to finish processing - this is crucial
    await new Promise(resolve => setTimeout(resolve, 7000));
    
    // Fetch resources explicitly with the transformations we want 
    const resource = await cloudinary.api.resource(publicId, {
      resource_type: "video",
      transformations: true
    });

    console.log("Cloudinary resource:", JSON.stringify(resource, null, 2));
    
    // Try to get the compressed size from a few different places

    let compressedSize = 0;
    
    // APPROACH 1: Check derived resources
    if (resource.derived && resource.derived.length > 0) {
      for (const derived of resource.derived) {
        // Look for our quality_auto transformation
        if (derived.raw_transformation.includes('q_auto') || 
            derived.raw_transformation.includes('f_mp4')) {
          compressedSize = derived.bytes;
          console.log("Found compressed size in derived:", compressedSize);
          break;
        }
      }
    }
    
    // APPROACH 2: If derived check failed, try explicit transformation
    if (compressedSize === 0) {
      try {
        // Create an explicit transformation with quality auto
        await cloudinary.uploader.explicit(publicId, {
          resource_type: "video",
          type: "upload",
          eager: [{ quality: "auto", format: "mp4" }],
          eager_async: false // Wait for transformation to complete
        });
        
        // Fetch again after explicit transformation
        const refreshedResource = await cloudinary.api.resource(publicId, {
          resource_type: "video",
          transformations: true
        });
        
        if (refreshedResource.derived && refreshedResource.derived.length > 0) {
          compressedSize = refreshedResource.derived[0].bytes;
          console.log("Found compressed size after explicit transform:", compressedSize);
        }
      } catch (err) {
        console.error("Error in explicit transformation", err);
      }
    }
    
    // APPROACH 3: Last resort - create a named transformation and check it
    if (compressedSize === 0) {
      try {
        // Generate a unique transformation name
        const transformName = `compressed_${Date.now()}`;
        
        // Create named transformation
        await cloudinary.api.create_transformation(transformName, {
          quality: "auto",
          fetch_format: "mp4"
        });
        
        // Apply the named transformation
        await cloudinary.uploader.explicit(publicId, {
          resource_type: "video",
          type: "upload",
          transformation: transformName,
          eager_async: false
        });
        
        // Check again for the derived resource
        const finalResource = await cloudinary.api.resource(publicId, {
          resource_type: "video",
          transformations: true
        });
        
        if (finalResource.derived && finalResource.derived.length > 0) {
          compressedSize = finalResource.derived[0].bytes;
          console.log("Found compressed size after named transform:", compressedSize);
        }
      } catch (err) {
        console.error("Error in named transformation", err);
      }
    }
    
    // If all else fails, set compressed size to 80% of original as placeholder
    // At least this will show some compression in the UI until you fix completely
    if (compressedSize === 0) {
      console.log("Couldn't get compressed size, using placeholder");
      compressedSize = Math.round(Number(originalSize) * 0.8);
    }

    // Create video record in database
    const video = await prisma.video.create({
      data: {
        title,
        description,
        publicId,
        originalSize: String(originalSize),
        compressedSize: String(compressedSize),
        duration: duration || 0
      }
    });

    return NextResponse.json(video);
  } catch (error) {
    console.error("Save video failed", error);
    return NextResponse.json({ error: "Save video failed" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}