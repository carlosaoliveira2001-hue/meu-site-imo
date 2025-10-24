// Helper functions to convert database properties to the format expected by components

export interface PropertyFromDB {
  id: string
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
  property_images?: Array<{
    id: string
    url: string
    ordem: number
  }>
}

export interface PropertyForDisplay {
  id: string
  tipo: "casa" | "apartamento" | "terreno"
  titulo: { pt: string; en: string }
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
  descricao: { pt: string; en: string }
  fotos: string[]
  videoUrl?: string
  mapa?: string
  destaque: boolean
  search_count?: number
  view_count?: number
  badges?: string[]
}

export function convertPropertyForDisplay(dbProperty: PropertyFromDB): PropertyForDisplay {
  return {
    id: dbProperty.id,
    tipo: dbProperty.tipo,
    titulo: {
      pt: dbProperty.titulo_pt,
      en: dbProperty.titulo_en,
    },
    preco: dbProperty.preco,
    area: dbProperty.area,
    area_util: dbProperty.area_util,
    area_bruta_privativa: dbProperty.area_bruta_privativa,
    area_terreno: dbProperty.area_terreno,
    certificado_energetico: dbProperty.certificado_energetico,
    preco_por_m2: dbProperty.preco_por_m2,
    num_pisos: dbProperty.num_pisos,
    quartos: dbProperty.quartos,
    banheiros: dbProperty.banheiros,
    vagas: dbProperty.vagas,
    piso: dbProperty.piso,
    elevador: dbProperty.elevador,
    distrito: dbProperty.distrito,
    concelho: dbProperty.concelho,
    freguesia: dbProperty.freguesia,
    descricao: {
      pt: dbProperty.descricao_pt,
      en: dbProperty.descricao_en,
    },
    fotos:
      dbProperty.property_images?.
        sort((a, b) => (a.ordem ?? 0) - (b.ordem ?? 0)).
        map((img) => img.url) || [],
    videoUrl: dbProperty.video_url,
    mapa: dbProperty.mapa,
    destaque: dbProperty.destaque,
    search_count: dbProperty.search_count,
    view_count: dbProperty.view_count,
    badges: dbProperty.badges,
  }
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}
