import { createClient } from "@/lib/supabase/server"
import { properties as staticProperties } from "@/lib/properties-data"

function convertStaticToDbFormat(property: any) {
  return {
    id: property.id,
    tipo: property.tipo,
    titulo_pt: property.titulo?.pt || "",
    titulo_en: property.titulo?.en || "",
    preco: property.preco || 0,
    area: property.area || 0,
    area_util: property.area_util || 0,
    area_bruta_privativa: property.area_bruta_privativa || 0,
    area_terreno: property.area_terreno || 0,
    certificado_energetico: property.certificado_energetico || "",
    preco_por_m2: property.preco_por_m2 || 0,
    num_pisos: property.num_pisos || 0,
    quartos: property.quartos || 0,
    banheiros: property.banheiros || 0,
    vagas: property.vagas || 0,
    piso: property.piso || "",
    distrito: property.distrito || "",
    concelho: property.concelho || "",
    freguesia: property.freguesia || "",
    descricao_pt: property.descricao?.pt || "",
    descricao_en: property.descricao?.en || "",
    video_url: property.videoUrl || "",
    mapa: property.mapa || "",
    destaque: property.destaque || false,
    search_count: property.search_count || 0,
    view_count: property.view_count || 0,
    badges: property.badges || [],
    elevador: property.elevador || false,
    property_images:
      property.fotos?.map((url: string, index: number) => ({
        id: `${property.id}-img-${index}`,
        url,
        ordem: index,
      })) || [],
  }
}

export async function getProperties() {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("properties")
      .select("*, property_images(*)")
      .order("created_at", { ascending: false })

    if (error && error.code === "PGRST205") {
      console.log("[v0] Database not ready, using static data as fallback")
      return {
        properties: staticProperties.map(convertStaticToDbFormat),
        error: null,
        usingFallback: true,
      }
    }

    if (error) {
      console.error("[v0] Error fetching properties:", error)
      return {
        properties: staticProperties.map(convertStaticToDbFormat),
        error: null,
        usingFallback: true,
      }
    }

    return { properties: data || [], error: null, usingFallback: false }
  } catch {
    console.log("[v0] Database error, using static data as fallback")
    return {
      properties: staticProperties.map(convertStaticToDbFormat),
      error: null,
      usingFallback: true,
    }
  }
}

export async function getProperty(id: string) {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("properties")
      .select(`
        id,
        tipo,
        titulo_pt,
        titulo_en,
        preco,
        area,
        area_util,
        area_bruta_privativa,
        area_terreno,
        certificado_energetico,
        preco_por_m2,
        num_pisos,
        quartos,
        banheiros,
        vagas,
        piso,
        elevador,
        distrito,
        concelho,
        freguesia,
        descricao_pt,
        descricao_en,
        video_url,
        mapa,
        destaque,
        search_count,
        view_count,
        badges,
        property_images(*)
      `)
      .eq("id", id)
      .single()

    if (error && error.code === "PGRST205") {
      console.log("[v0] Database not ready, using static data as fallback")
      const staticProperty = staticProperties.find((p) => p.id === id)
      if (staticProperty) {
        return {
          property: convertStaticToDbFormat(staticProperty),
          error: null,
          usingFallback: true,
        }
      }
      return { property: null, error: "Property not found", usingFallback: true }
    }

    if (error) {
      console.error("[v0] Error fetching property:", error)
      const staticProperty = staticProperties.find((p) => p.id === id)
      if (staticProperty) {
        return {
          property: convertStaticToDbFormat(staticProperty),
          error: null,
          usingFallback: true,
        }
      }
      return { property: null, error: "Property not found", usingFallback: true }
    }

    // Increment view_count
    if (data) {
      const newViewCount = (data.view_count || 0) + 1
      const { error: updateError } = await supabase
        .from("properties")
        .update({ view_count: newViewCount })
        .eq("id", id)
      if (updateError) {
        console.error("[v0] Error incrementing view_count:", updateError)
      }
      data.view_count = newViewCount
    }

    return { property: data, error: null, usingFallback: false }
  } catch {
    console.log("[v0] Database error, using static data as fallback")
    const staticProperty = staticProperties.find((p) => p.id === id)
    if (staticProperty) {
      return {
        property: convertStaticToDbFormat(staticProperty),
        error: null,
        usingFallback: true,
      }
    }
    return { property: null, error: "Property not found", usingFallback: true }
  }
}
