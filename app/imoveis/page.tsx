import { PropertiesPageClient } from "@/components/properties-page-client"
import { getProperties } from "@/lib/properties-queries"
import { convertPropertyForDisplay } from "@/lib/properties-helpers"

export default async function ImoveisPage() {
  const { properties: dbProperties } = await getProperties()
  const properties = dbProperties.map(convertPropertyForDisplay)

  return <PropertiesPageClient properties={properties} />
}
