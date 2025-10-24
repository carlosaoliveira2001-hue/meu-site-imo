import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PropertyCard } from "@/components/property-card"
import { Search, Home, Award, Users, MessageCircle } from "lucide-react"
import { translations } from "@/lib/i18n/translations"
import { getProperties } from "@/lib/properties-queries"
import { convertPropertyForDisplay } from "@/lib/properties-helpers"
import { HomeClient } from "@/components/home-client"

export default async function HomePage() {
  const { properties: dbProperties } = await getProperties()
  const featuredProperties = dbProperties
    .filter((p) => p.destaque)
    .slice(0, 6)
    .map(convertPropertyForDisplay)

  return <HomeClient featuredProperties={featuredProperties} />
}
