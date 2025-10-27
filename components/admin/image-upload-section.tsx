"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Loader2, Upload, X, ImageIcon } from "lucide-react"
import { fetchPropertyForAdmin } from "@/lib/admin-actions"
import { addPropertyImage, deletePropertyImage } from "@/lib/properties-actions"
import { Card } from "@/components/ui/card"

interface ImageUploadSectionProps {
  propertyId: string
}

export function ImageUploadSection({ propertyId }: ImageUploadSectionProps) {
  const [images, setImages] = useState<any[]>([])
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(true)

  const loadImages = async () => {
    setLoading(true)
    console.log("[v0] Loading images for property:", propertyId)
    
    try {
      const { property } = await fetchPropertyForAdmin(propertyId)
      console.log("[v0] Property data received:", property)
      
      if (property?.property_images) {
        console.log("[v0] Property images found:", property.property_images)
        const sortedImages = property.property_images.sort((a: any, b: any) => a.ordem - b.ordem)
        console.log("[v0] Sorted images:", sortedImages)
        setImages(sortedImages)
      } else {
        console.log("[v0] No property images found")
        setImages([])
      }
    } catch (error) {
      console.error("[v0] Error loading images:", error)
      setImages([])
    }
    
    setLoading(false)
  }

  useEffect(() => {
    loadImages()
  }, [propertyId])

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    console.log("[v0] Starting upload process for", files.length, "files")
    setUploading(true)

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      console.log("[v0] Processing file:", file.name, "Size:", file.size)

      await uploadFile(file, i)
    }

    console.log("[v0] Reloading images...")
    await loadImages()
    setUploading(false)

    // Reset input
    e.target.value = ""
    console.log("[v0] Upload process completed")
  }

  const uploadFile = async (file: File, index: number) => {
    const formData = new FormData()
    formData.append("file", file)

    try {
      console.log("[v0] Sending request to /api/upload")
      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      console.log("[v0] Upload response status:", uploadResponse.status)

      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text()
        console.error("[v0] Upload failed:", errorText)
        return
      }

      const uploadData = await uploadResponse.json()
      console.log("[v0] Upload data received:", uploadData)

      if (uploadData.url) {
        console.log("[v0] Adding image to database with URL:", uploadData.url)
        // Add image to database
        const orderIndex = images.length + index
        const result = await addPropertyImage(propertyId, uploadData.url, orderIndex)

        if (result.error) {
          console.error("[v0] Error adding image to database:", result.error)
        } else {
          console.log("[v0] Image added to database successfully")
        }
      } else {
        console.error("[v0] No URL received from upload")
      }
    } catch (error) {
      console.error("[v0] Error uploading image:", error)
    }
  }

  const handleDeleteImage = async (imageId: string, imageUrl: string) => {
    try {
      // Delete from Blob storage
      await fetch("/api/delete-image", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: imageUrl }),
      })

      // Delete from database
      await deletePropertyImage(imageId, propertyId)

      await loadImages()
    } catch (error) {
      console.error("[v0] Error deleting image:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div>
        <Label>Imagens do Imóvel</Label>
        <p className="text-sm text-muted-foreground">
          Adicione fotos do imóvel. A primeira imagem será a capa.
          Imagens maiores que 1200x675 pixels serão automaticamente redimensionadas.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => (
          <Card key={image.id} className="relative overflow-hidden">
            <div className="aspect-video relative">
              <img
                src={image.url || "/placeholder.svg"}
                alt={`Imagem ${index + 1}`}
                className="h-full w-full object-cover"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute right-2 top-2"
                onClick={() => handleDeleteImage(image.id, image.url)}
              >
                <X className="h-4 w-4" />
              </Button>
              {index === 0 && (
                <div className="absolute bottom-2 left-2 rounded bg-primary px-2 py-1 text-xs text-primary-foreground">
                  Capa
                </div>
              )}
            </div>
          </Card>
        ))}

        <Card className="flex aspect-video items-center justify-center border-2 border-dashed">
          <Label htmlFor="image-upload" className="flex cursor-pointer flex-col items-center gap-2 p-4">
            {uploading ? (
              <>
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                <span className="text-sm text-muted-foreground">A carregar...</span>
              </>
            ) : (
              <>
                <Upload className="h-8 w-8 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Adicionar Imagens</span>
              </>
            )}
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileUpload}
              disabled={uploading}
            />
          </Label>
        </Card>
      </div>

      {images.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center">
          <ImageIcon className="mb-4 h-12 w-12 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Nenhuma imagem adicionada ainda.</p>
          <p className="text-xs text-muted-foreground">Clique no botão acima para adicionar imagens.</p>
        </div>
      )}
    </div>
  )
}
