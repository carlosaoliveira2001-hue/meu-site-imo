import { notFound } from "next/navigation"
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

  const { properties: allProperties } = await getProperties()

  let similarProperties = allProperties
    .filter((p) => {
      if (p.id === id) return false
      if (p.tipo !== property.tipo) return false
      // Price similarity: within ±50% of current property price
      const priceDiff = Math.abs(p.preco - property.preco) / property.preco
      return priceDiff <= 0.5
    })
    .slice(0, 3)
    .map(convertPropertyForDisplay)

  // Fallback: if no similar by type and price, take any 3 other properties
  if (similarProperties.length === 0) {
    similarProperties = allProperties
      .filter((p) => p.id !== id)
      .slice(0, 3)
      .map(convertPropertyForDisplay)
  }

  return <PropertyPageClient property={property} similarProperties={similarProperties} />
}
