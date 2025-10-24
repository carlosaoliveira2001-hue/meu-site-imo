import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function DELETE(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ error: "No URL provided" }, { status: 400 })
    }

    const supabase = await createClient()

    // Extract path after bucket in public URL
    // Expected format: https://<project>.supabase.co/storage/v1/object/public/property-images/<path>
    const marker = "/property-images/"
    const idx = url.indexOf(marker)
    if (idx === -1) {
      console.error("[v0] Invalid Supabase public URL:", url)
      return NextResponse.json({ error: "Invalid Supabase public URL" }, { status: 400 })
    }
    const path = url.substring(idx + marker.length)

    const { error } = await supabase.storage
      .from("property-images")
      .remove([path])

    if (error) {
      console.error("[v0] Supabase delete error:", error)
      return NextResponse.json({ error: "Delete failed" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Delete error:", error)
    return NextResponse.json({ error: "Delete failed" }, { status: 500 })
  }
}
