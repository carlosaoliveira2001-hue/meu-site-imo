export interface Property {
  id: string
  tipo: "casa" | "apartamento" | "terreno"
  titulo: {
    pt: string
    en: string
  }
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
  distrito: string
  concelho: string
  freguesia: string
  descricao: {
    pt: string
    en: string
  }
  fotos: string[]
  videoUrl?: string
  mapa: string
  destaque?: boolean
  search_count?: number
  view_count?: number
  badges?: string[]
}

export const properties: Property[] = [
  {
    id: "1",
    tipo: "casa",
    titulo: {
      pt: "Moradia Moderna com Piscina",
      en: "Modern House with Pool",
    },
    preco: 650000,
    area: 280,
    area_util: 250,
    area_bruta_privativa: 280,
    area_terreno: 500,
    certificado_energetico: "A+",
    preco_por_m2: 2321,
    num_pisos: 2,
    quartos: 4,
    banheiros: 3,
    vagas: 2,
    piso: "R/C",
    distrito: "Lisboa",
    concelho: "Cascais",
    freguesia: "Cascais",
    descricao: {
      pt: "Linda moradia moderna com acabamento de primeira qualidade, piscina aquecida, área gourmet completa e jardim paisagístico. Localização privilegiada próxima a escolas, comércio e praias.",
      en: "Beautiful modern house with top quality finishes, heated pool, complete gourmet area and landscaped garden. Prime location close to schools, shops and beaches.",
    },
    fotos: [
      "/modern-house-exterior-with-pool.jpg",
      "/modern-living-room.png",
      "/canyon-village-storage/image3.png",
      "/luxurious-master-suite.png",
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    mapa: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3112.0!2d-9.4215!3d38.6979!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDQxJzUyLjAiTiA5wrAyNScxNy40Ilc!5e0!3m2!1spt-PT!2spt!4v1234567890",
    destaque: true,
    search_count: 15,
    view_count: 8,
    badges: ["Novidade"],
  },
  {
    id: "2",
    tipo: "apartamento",
    titulo: {
      pt: "Apartamento de Luxo Vista Mar",
      en: "Luxury Apartment Sea View",
    },
    preco: 850000,
    area: 180,
    quartos: 3,
    banheiros: 3,
    vagas: 3,
    piso: "5º Andar",
    distrito: "Porto",
    concelho: "Porto",
    freguesia: "Foz do Douro",
    descricao: {
      pt: "Apartamento de luxo com vista panorâmica para o mar, varanda gourmet, 3 suítes sendo 1 master com closet. Condomínio completo com piscina, ginásio, salão de festas e segurança 24h.",
      en: "Luxury apartment with panoramic sea view, gourmet balcony, 3 suites including 1 master with walk-in closet. Full condominium with pool, gym, party room and 24h security.",
    },
    fotos: [
      "/luxury-apartment-ocean-view.png",
      "/modern-apartment-living-room.png",
      "/luxury-apartment-balcony.png",
      "/modern-apartment-bedroom.png",
    ],
    mapa: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3004.0!2d-8.6753!3d41.1496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDA4JzU4LjYiTiA4wrA0MCczMS4xIlc!5e0!3m2!1spt-PT!2spt!4v1234567890",
    destaque: true,
  },
  {
    id: "3",
    tipo: "terreno",
    titulo: {
      pt: "Terreno em Condomínio Fechado",
      en: "Land in Gated Community",
    },
    preco: 280000,
    area: 500,
    distrito: "Lisboa",
    concelho: "Sintra",
    freguesia: "Colares",
    descricao: {
      pt: "Excelente terreno plano em condomínio fechado de alto padrão. Infraestrutura completa com asfalto, iluminação, água, esgotos e internet. Área de lazer com clube, campos e trilhos.",
      en: "Excellent flat land in high-end gated community. Complete infrastructure with asphalt, lighting, water, sewage and internet. Leisure area with club, courts and trails.",
    },
    fotos: [
      "/residential-land-plot.jpg",
      "/gated-community-entrance.png",
      "/community-clubhouse.jpg",
      "/nature-trail.jpg",
    ],
    mapa: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3109.0!2d-9.4478!3d38.8008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDQ4JzAzLjAiTiA5wrAyNic1Mi4xIlc!5e0!3m2!1spt-PT!2spt!4v1234567890",
    destaque: true,
  },
  {
    id: "4",
    tipo: "casa",
    titulo: {
      pt: "Moradia em Banda em Condomínio",
      en: "Townhouse in Condominium",
    },
    preco: 480000,
    area: 220,
    quartos: 3,
    banheiros: 3,
    vagas: 2,
    piso: "R/C",
    distrito: "Braga",
    concelho: "Braga",
    freguesia: "Lamaçães",
    descricao: {
      pt: "Moradia em banda nova em condomínio fechado, com 3 suítes, sala ampla com pé direito duplo, cozinha equipada e área de churrasqueira. Acabamento impecável e pronta a habitar.",
      en: "New townhouse in gated community, with 3 suites, large living room with double height ceiling, equipped kitchen and barbecue area. Impeccable finish and ready to move in.",
    },
    fotos: [
      "/modern-townhouse-exterior.png",
      "/double-height-living-room.jpg",
      "/modern-kitchen-cabinets.png",
      "/placeholder.svg?height=600&width=800",
    ],
    mapa: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2990.0!2d-8.4278!3d41.5508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDMzJzAzLjAiTiA4wrAyNSczOS45Ilc!5e0!3m2!1spt-PT!2spt!4v1234567890",
    destaque: false,
  },
  {
    id: "5",
    tipo: "apartamento",
    titulo: {
      pt: "Apartamento T2 Centro",
      en: "2 Bedroom Apartment Downtown",
    },
    preco: 320000,
    area: 85,
    quartos: 2,
    banheiros: 2,
    vagas: 1,
    piso: "2º Andar",
    distrito: "Coimbra",
    concelho: "Coimbra",
    freguesia: "Baixa",
    descricao: {
      pt: "Apartamento T2 funcional no coração de Coimbra. Ótima opção para investimento ou primeira habitação. Próximo a restaurantes, comércio e transportes públicos.",
      en: "Functional 2-bedroom apartment in the heart of Coimbra. Great option for investment or first home. Close to restaurants, shops and public transport.",
    },
    fotos: [
      "/modern-apartment-living-room.png",
      "/modern-bedroom.png",
      "/modern-kitchen.png",
      "/modern-bathroom.png",
    ],
    mapa: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3048.0!2d-8.4278!3d40.2108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDEyJzM5LjAiTiA4wrAyNSczOS45Ilc!5e0!3m2!1spt-PT!2spt!4v1234567890",
    destaque: false,
  },
  {
    id: "6",
    tipo: "casa",
    titulo: {
      pt: "Quinta com Lago",
      en: "Country Estate with Lake",
    },
    preco: 1200000,
    area: 450,
    quartos: 5,
    banheiros: 4,
    vagas: 4,
    piso: "R/C",
    distrito: "Évora",
    concelho: "Évora",
    freguesia: "Arraiolos",
    descricao: {
      pt: "Magnífica quinta com lago privativo, área de 450m² construídos em terreno de 5000m². Perfeita para quem procura tranquilidade e contacto com a natureza, mantendo conforto e sofisticação.",
      en: "Magnificent country estate with private lake, 450m² built area on 5000m² plot. Perfect for those seeking tranquility and contact with nature, while maintaining comfort and sophistication.",
    },
    fotos: [
      "/country-house-lake.png",
      "/rustic-living-room-fireplace.jpg",
      "/country-kitchen-wood.jpg",
      "/lake-view-deck.jpg",
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    mapa: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.0!2d-7.9908!3d38.6708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDQwJzE1LjAiTiA3wrA1OSczMC45Ilc!5e0!3m2!1spt-PT!2spt!4v1234567890",
    destaque: true,
  },
  {
    id: "7",
    tipo: "apartamento",
    titulo: {
      pt: "Penthouse Duplex de Luxo",
      en: "Luxury Duplex Penthouse",
    },
    preco: 1800000,
    area: 320,
    quartos: 4,
    banheiros: 5,
    vagas: 4,
    piso: "10º Andar",
    distrito: "Lisboa",
    concelho: "Lisboa",
    freguesia: "Avenidas Novas",
    descricao: {
      pt: "Penthouse duplex de luxo com terraço de 150m², piscina privativa, sauna e vista 360º da cidade. Acabamento premium com domótica completa, 4 suítes e lavabo. O mais alto padrão em habitação.",
      en: "Luxury duplex penthouse with 150m² terrace, private pool, sauna and 360º city view. Premium finish with complete home automation, 4 suites and guest bathroom. The highest standard in housing.",
    },
    fotos: [
      "/luxury-penthouse-exterior.jpg",
      "/penthouse-living-room-city-view.jpg",
      "/rooftop-pool-terrace.jpg",
      "/luxury-penthouse-bedroom.png",
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    mapa: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3111.0!2d-9.1478!3d38.7378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDQ0JzE2LjEiTiA5wrAwOCc1Mi4xIlc!5e0!3m2!1spt-PT!2spt!4v1234567890",
    destaque: true,
  },
  {
    id: "8",
    tipo: "terreno",
    titulo: {
      pt: "Terreno Comercial Avenida Principal",
      en: "Commercial Land Main Avenue",
    },
    preco: 950000,
    area: 800,
    distrito: "Faro",
    concelho: "Faro",
    freguesia: "Centro",
    descricao: {
      pt: "Terreno comercial em localização estratégica na principal avenida de Faro. Excelente para construção de edifício comercial ou residencial. Alto potencial de valorização.",
      en: "Commercial land in strategic location on Faro's main avenue. Excellent for construction of commercial or residential building. High appreciation potential.",
    },
    fotos: [
      "/commercial-land-urban.jpg",
      "/busy-avenue-street-view.jpg",
      "/commercial-district.jpg",
      "/urban-development-area.jpg",
    ],
    mapa: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3197.0!2d-7.9308!3d37.0208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDAxJzE1LjAiTiA3wrA1NSc1MS4wIlc!5e0!3m2!1spt-PT!2spt!4v1234567890",
    destaque: false,
  },
]

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function getPropertyById(id: string): Property | undefined {
  return properties.find((p) => p.id === id)
}

export function getFeaturedProperties(): Property[] {
  return properties.filter((p) => p.destaque)
}

export function getSimilarProperties(propertyId: string, limit = 3): Property[] {
  const property = getPropertyById(propertyId)
  if (!property) return []

  return properties.filter((p) => p.id !== propertyId && p.tipo === property.tipo).slice(0, limit)
}
