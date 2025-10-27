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
