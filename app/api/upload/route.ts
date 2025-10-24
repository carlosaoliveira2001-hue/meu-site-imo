import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Upload API (Supabase Storage) called")

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

    const supabase = await createClient()

    // Upload to Supabase Storage with a unique filename
    const filename = `properties/${Date.now()}-${file.name}`
    console.log("[v0] Uploading to Supabase Storage:", filename)

    const { data, error } = await supabase.storage
      .from("property-images")
      .upload(filename, file)

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
      size: file.size,
      type: file.type,
    })
  } catch (error) {
    console.error("[v0] Upload error:", error)

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
