"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ImageGalleryProps {
  images: string[]
  title: string
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const openLightbox = (index: number) => {
    setSelectedImage(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const goToPrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1)
    }
  }

  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === images.length - 1 ? 0 : selectedImage + 1)
    }
  }

  return (
    <>
      <div className="bg-muted">
        <div className="container mx-auto px-4 py-4">
          {images.length === 1 ? (
            <div
              className="relative aspect-video w-full rounded-lg overflow-hidden cursor-pointer"
              onClick={() => openLightbox(0)}
            >
              <Image src={images[0] || "/placeholder.svg"} alt={title} fill className="object-cover" />
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2 md:gap-4">
              <div
                className="col-span-4 md:col-span-2 md:row-span-2 relative aspect-video md:aspect-square rounded-lg overflow-hidden cursor-pointer"
                onClick={() => openLightbox(0)}
              >
                <Image src={images[0] || "/placeholder.svg"} alt={`${title} - Foto 1`} fill className="object-cover" />
              </div>
              {images.slice(1, 5).map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => openLightbox(index + 1)}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${title} - Foto ${index + 2}`}
                    fill
                    className="object-cover"
                  />
                  {index === 3 && images.length > 5 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white text-xl font-semibold">+{images.length - 5}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={selectedImage !== null} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-7xl w-full h-[90vh] p-0">
          <DialogTitle className="sr-only">
            {title} - Foto {selectedImage !== null ? selectedImage + 1 : 1}
          </DialogTitle>
          <div className="relative w-full h-full flex items-center justify-center bg-black">
            {selectedImage !== null && (
              <>
                <div className="relative w-full h-full">
                  <Image
                    src={images[selectedImage] || "/placeholder.svg"}
                    alt={`${title} - Foto ${selectedImage + 1}`}
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Navigation Buttons */}
                {images.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                      onClick={goToPrevious}
                    >
                      <ChevronLeft className="h-8 w-8" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                      onClick={goToNext}
                    >
                      <ChevronRight className="h-8 w-8" />
                    </Button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
                  {selectedImage + 1} / {images.length}
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
