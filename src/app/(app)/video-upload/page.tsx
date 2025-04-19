"use client"
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

function VideoUpload() {
    const [file, setFile] = useState<File | null>(null)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [isUploading, setIsUploading] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)

    const router = useRouter()

    const MAX_FILE_SIZE = 70 * 1024 * 1024

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!file) return;  

        if (file.size > MAX_FILE_SIZE) {
            alert("File size too large")
            return;
        }

        setIsUploading(true)
        
        try {
            // Step 1: Get upload signature from backend
            const { data: signData } = await axios.get("/api/get-signature")
            
            // Step 2: Prepare form data for Cloudinary
            const cloudinaryFormData = new FormData()
            cloudinaryFormData.append("file", file)
            cloudinaryFormData.append("api_key", signData.apiKey)
            cloudinaryFormData.append("timestamp", signData.timestamp.toString())
            cloudinaryFormData.append("signature", signData.signature)
            cloudinaryFormData.append("folder", "video-uploads")
            
            // Step 3: Upload directly to Cloudinary
            const uploadResponse = await axios.post(
                `https://api.cloudinary.com/v1_1/${signData.cloudName}/video/upload`,
                cloudinaryFormData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / (progressEvent.total || file.size)
                        )
                        setUploadProgress(percentCompleted)
                    }
                }
            )
            
            // Step 4: Save metadata to our database
            await axios.post("/api/save-video", {
                title,
                description,
                publicId: uploadResponse.data.public_id,
                originalSize: file.size,
                bytes: uploadResponse.data.bytes,
                duration: uploadResponse.data.duration || 0
            })
            
            // Redirect to home page
            router.push("/")
        } catch (error) {
            console.error("Upload error:", error)
            alert("Video Upload failed")
        } finally {
            setIsUploading(false)
            setUploadProgress(0)
        }
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-4">Upload Video</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="label">
                        <span className="label-text text-white">Title</span>
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div>
                    <label className="label">
                        <span className="text-white label-text">Description</span>
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="textarea textarea-bordered w-full"
                    />
                </div>
                <div>
                    <label className="label">
                        <span className="label-text text-white">Video File</span>
                    </label>
                    <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        className="file-input file-input-bordered w-full"
                        required
                    />
                </div>
                {isUploading && (
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                            className="bg-blue-600 h-2.5 rounded-full" 
                            style={{width: `${uploadProgress}%`}}
                        ></div>
                        <p className="text-xs text-white mt-1">{uploadProgress}% Uploaded</p>
                    </div>
                )}
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isUploading}
                >
                    {isUploading ? "Uploading..." : "Upload Video"}
                </button>
            </form>
        </div>
    );
}


export default VideoUpload