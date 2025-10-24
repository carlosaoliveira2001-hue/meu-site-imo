import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { PropertyCard } from "@/components/property-card"
import { MapPin, Maximize, Bed, Bath, Car, MessageCircle, ChevronLeft } from "lucide-react"
import { ImageGallery } from "@/components/image-gallery"
import { ShareButton } from "@/components/share-button"
import { FavoriteButton } from "@/components/favorite-button"
import { PropertyPageClient } from "@/components/property-page-client"
import { getProperty, getProperties } from "@/lib/properties-queries"
import { convertPropertyForDisplay } from "@/lib/properties-helpers"

interface PropertyPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { id } = await params

  const { property: dbProperty } = await getProperty(id)
  console.log('Raw DB property from getProperty:', dbProperty)

  if (!dbProperty) {
    notFound()
  }

  const property = convertPropertyForDisplay(dbProperty)
  console.log('Converted property for display:', property)

  const { properties: allProperties } = await getProperties()
  const similarProperties = allProperties
    .filter((p) => {
      if (p.id === id) return false
      if (p.tipo !== property.tipo) return false
      if (p.concelho !== property.concelho) return false
      // Price similarity: within ±20% of current property price
      const priceDiff = Math.abs(p.preco - property.preco) / property.preco
      return priceDiff <= 0.2
    })
    .slice(0, 6)
    .map(convertPropertyForDisplay)

  return <PropertyPageClient property={property} similarProperties={similarProperties} />
}
