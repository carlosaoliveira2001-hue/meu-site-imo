"use server"

import { getProperties, getProperty } from "@/lib/properties-queries"

// Server actions for admin panel to fetch data from Client Components
export async function fetchPropertiesForAdmin() {
  return await getProperties()
}

export async function fetchPropertyForAdmin(id: string) {
  return await getProperty(id)
}
