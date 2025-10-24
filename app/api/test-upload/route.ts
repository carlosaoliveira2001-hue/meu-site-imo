import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Test upload API (Supabase Storage) called")

    const supabase = await createClient()

    // Create a simple test file
    const testContent = "This is a test file"
    const testFile = new File([testContent], "test.txt", { type: "text/plain" })

    console.log("[v0] Test file created:", testFile.name, "Size:", testFile.size)

    // Upload to Supabase Storage
    const filename = `test/${Date.now()}-test.txt`
    console.log("[v0] Uploading test file to Supabase:", filename)

    const { data, error } = await supabase.storage
      .from("property-images")
      .upload(filename, testFile)

    if (error) {
      console.error("[v0] Supabase test upload error:", error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    const { data: urlData } = supabase.storage
      .from("property-images")
      .getPublicUrl(data.path)

    console.log("[v0] Test upload successful, URL:", urlData.publicUrl)

    return NextResponse.json({
      success: true,
      url: urlData.publicUrl,
      message: "Test upload successful (Supabase)",
    })
  } catch (error) {
    console.error("[v0] Test upload error:", error)
    return NextResponse.json({ 
      success: false,
      error: "Test upload failed",
      details: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
}
