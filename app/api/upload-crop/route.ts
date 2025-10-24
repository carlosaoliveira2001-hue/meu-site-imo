import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import sharp from "sharp"

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Upload Crop API called")

    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      console.error("[v0] No file provided")
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    console.log("[v0] File received:", file.name, "Size:", file.size, "Type:", file.type)

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      console.error("[v0] File too large:", file.size)
      return NextResponse.json({ error: "File too large. Maximum size is 10MB." }, { status: 400 })
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      console.error("[v0] Invalid file type:", file.type)
      return NextResponse.json({ error: "Invalid file type. Only images are allowed." }, { status: 400 })
    }

    // Convert file to buffer for processing
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Get image metadata
    const metadata = await sharp(buffer).metadata()
    console.log("[v0] Image metadata:", metadata)

    // Define standard dimensions (16:9 aspect ratio, max 1200x675)
    const standardWidth = 1200
    const standardHeight = 675

    let processedBuffer: Buffer

    // Always resize to standard dimensions maintaining aspect ratio
    processedBuffer = await sharp(buffer)
      .resize(standardWidth, standardHeight, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ quality: 85 })
      .toBuffer()

    const supabase = await createClient()

    // Upload to Supabase Storage with a unique filename
    const filename = `properties/${Date.now()}-${file.name.replace(/\.[^/.]+$/, "")}.jpg`
    console.log("[v0] Uploading cropped image to Supabase Storage:", filename)

    const { data, error } = await supabase.storage
      .from("property-images")
      .upload(filename, processedBuffer, {
        contentType: 'image/jpeg'
      })

    if (error) {
      console.error("[v0] Supabase upload error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const { data: urlData } = supabase.storage
      .from("property-images")
      .getPublicUrl(data.path)

    console.log("[v0] Upload successful, URL:", urlData.publicUrl)

    return NextResponse.json({
      url: urlData.publicUrl,
      filename: file.name,
      size: processedBuffer.length,
      type: 'image/jpeg',
      originalSize: file.size,
      cropped: true,
    })
  } catch (error) {
    console.error("[v0] Upload crop error:", error)

    let errorMessage = "Upload failed"
    if (error instanceof Error) {
      errorMessage = error.message
    }

    return NextResponse.json({
      error: errorMessage,
      details: error instanceof Error ? error.stack : "Unknown error",
    }, { status: 500 })
  }
}
