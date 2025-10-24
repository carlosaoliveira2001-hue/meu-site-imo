"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export interface PropertyData {
  id?: string
  tipo: "casa" | "apartamento" | "terreno"
  titulo_pt: string
  titulo_en: string
  preco: number
  area: number
  area_util?: number
  area_bruta_privativa?: number
  area_terreno?: number
  certificado_energetico?: string
  preco_por_m2?: number
  num_pisos?: number
  quartos?: number
  banheiros?: number
  vagas?: number
  piso?: string
  elevador?: boolean
  distrito: string
  concelho: string
  freguesia: string
  descricao_pt: string
  descricao_en: string
  video_url?: string
  mapa?: string
  destaque: boolean
  search_count?: number
  view_count?: number
  badges?: string[]
}

async function isDatabaseAvailable() {
  try {
    const supabase = await createClient()
    const { error } = await supabase.from("properties").select("id").limit(1)
    return !error || error.code !== "PGRST205"
  } catch {
    return false
  }
}

export async function createProperty(propertyData: PropertyData) {
  const dbAvailable = await isDatabaseAvailable()
  if (!dbAvailable) {
    return {
      property: null,
      error: "Base de dados não configurada. Por favor, execute o script SQL no Supabase.",
      usingFallback: true,
    }
  }

  const supabase = await createClient()

  const { data, error } = await supabase.from("properties").insert([propertyData]).select().single()

  if (error) {
    console.error("[v0] Error creating property:", error)
    return { property: null, error: error.message, usingFallback: false }
  }

  revalidatePath("/")
  revalidatePath("/imoveis")

  return { property: data, error: null, usingFallback: false }
}

export async function updateProperty(id: string, propertyData: Partial<PropertyData>) {
  const dbAvailable = await isDatabaseAvailable()
  if (!dbAvailable) {
    return {
      property: null,
      error: "Base de dados não configurada. Por favor, execute o script SQL no Supabase.",
      usingFallback: true,
    }
  }

  // Filter out undefined values to prevent overwriting existing data with null
  const filteredData = Object.fromEntries(
    Object.entries(propertyData).filter(([_, value]) => value !== undefined)
  )

  const supabase = await createClient()

  const { data, error } = await supabase.from("properties").update(filteredData).eq("id", id).select().single()

  if (error) {
    console.error("[v0] Error updating property:", error)
    return { property: null, error: error.message, usingFallback: false }
  }

  revalidatePath("/")
  revalidatePath("/imoveis")
  revalidatePath(`/imoveis/${id}`)

  return { property: data, error: null, usingFallback: false }
}

export async function deleteProperty(id: string) {
  const dbAvailable = await isDatabaseAvailable()
  if (!dbAvailable) {
    return {
      success: false,
      error: "Base de dados não configurada. Por favor, execute o script SQL no Supabase.",
      usingFallback: true,
    }
  }

  const supabase = await createClient()

  const { error } = await supabase.from("properties").delete().eq("id", id)

  if (error) {
    console.error("[v0] Error deleting property:", error)
    return { success: false, error: error.message, usingFallback: false }
  }

  revalidatePath("/")
  revalidatePath("/imoveis")

  return { success: true, error: null, usingFallback: false }
}

export async function addPropertyImage(propertyId: string, imageUrl: string, orderIndex: number) {
  console.log("[v0] Adding property image:", { propertyId, imageUrl, orderIndex })
  
  const dbAvailable = await isDatabaseAvailable()
  if (!dbAvailable) {
    console.error("[v0] Database not available")
    return {
      image: null,
      error: "Base de dados não configurada. Por favor, execute o script SQL no Supabase.",
      usingFallback: true,
    }
  }

  const supabase = await createClient()

  const insertData = { property_id: propertyId, url: imageUrl, ordem: orderIndex }
  console.log("[v0] Inserting data:", insertData)

  const { data, error } = await supabase
    .from("property_images")
    .insert([insertData])
    .select()
    .single()

  if (error) {
    console.error("[v0] Error adding property image:", error)
    return { image: null, error: error.message, usingFallback: false }
  }

  console.log("[v0] Image added successfully:", data)
  revalidatePath(`/imoveis/${propertyId}`)

  return { image: data, error: null, usingFallback: false }
}

export async function deletePropertyImage(imageId: string, propertyId: string) {
  const dbAvailable = await isDatabaseAvailable()
  if (!dbAvailable) {
    return {
      success: false,
      error: "Base de dados não configurada. Por favor, execute o script SQL no Supabase.",
      usingFallback: true,
    }
  }

  const supabase = await createClient()

  const { error } = await supabase.from("property_images").delete().eq("id", imageId)

  if (error) {
    console.error("[v0] Error deleting property image:", error)
    return { success: false, error: error.message, usingFallback: false }
  }

  revalidatePath(`/imoveis/${propertyId}`)

  return { success: true, error: null, usingFallback: false }
}
