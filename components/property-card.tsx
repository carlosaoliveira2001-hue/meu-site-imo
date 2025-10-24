"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Maximize, Bed, Bath, Car } from "lucide-react"
import { type Property, formatPrice } from "@/lib/properties-data"
import type { PropertyForDisplay } from "@/lib/properties-helpers"
import { useLanguage } from "@/lib/i18n/language-context"
import { translations } from "@/lib/i18n/translations"

interface PropertyCardProps {
  property: Property | PropertyForDisplay
}

export function PropertyCard({ property }: PropertyCardProps) {
  const { locale } = useLanguage()
  const t = translations[locale]

  const propertyTypeLabels = {
    casa: t.propertyTypes.house,
    apartamento: t.propertyTypes.apartment,
    terreno: t.propertyTypes.land,
  }

  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={property.fotos[0] || "/placeholder.svg"}
          alt={property.titulo[locale]}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Badge className="absolute top-4 left-4 bg-secondary text-secondary-foreground">
          {propertyTypeLabels[property.tipo]}
        </Badge>
      </div>

      <CardContent className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-balance line-clamp-2 mb-2">{property.titulo[locale]}</h3>
          <div className="flex items-center text-sm text-muted-foreground gap-1">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span className="line-clamp-1">
              {property.freguesia}, {property.concelho}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Maximize className="h-4 w-4" />
            <span>{property.area}m²</span>
          </div>
          {property.quartos && (
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              <span>{property.quartos}</span>
            </div>
          )}
          {property.banheiros && (
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              <span>{property.banheiros}</span>
            </div>
          )}
          {property.vagas && (
            <div className="flex items-center gap-1">
              <Car className="h-4 w-4" />
              <span>{property.vagas}</span>
            </div>
          )}
        </div>

        <div className="text-sm text-muted-foreground line-clamp-2 whitespace-pre-line leading-relaxed">{property.descricao[locale]}</div>

        {/* Badges */}
        {property.badges && property.badges.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {property.badges.map((badge, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {badge}
              </Badge>
            ))}
          </div>
        )}

        <div className="text-2xl font-bold text-primary">{formatPrice(property.preco)}</div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button asChild className="w-full">
          <Link href={`/imoveis/${property.id}`}>{t.viewDetails}</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
