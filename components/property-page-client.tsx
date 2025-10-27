"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { PropertyCard } from "@/components/property-card"
import { MapPin, Maximize, Bed, Bath, Car, MessageCircle, ChevronLeft } from "lucide-react"
import { ImageGallery } from "@/components/image-gallery"
import { ShareButton } from "@/components/share-button"
import { FavoriteButton } from "@/components/favorite-button"
import { useLanguage } from "@/lib/i18n/language-context"
import { translations } from "@/lib/i18n/translations"
import { formatPrice, type PropertyForDisplay } from "@/lib/properties-helpers"
import { Layers, ArrowUpDown, Eye, Search } from "lucide-react"
import { useState } from "react"
import { Euro, Award } from "lucide-react"

interface PropertyPageClientProps {
  property: PropertyForDisplay
  similarProperties: PropertyForDisplay[]
}

export function PropertyPageClient({ property, similarProperties }: PropertyPageClientProps) {
  const { locale } = useLanguage()
  const t = translations[locale]

  const propertyTypeLabels = {
    casa: t.propertyTypes.house,
    apartamento: t.propertyTypes.apartment,
    terreno: t.propertyTypes.land,
  }

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)

  const whatsappMessage = `${t.whatsappInterest} ${property.titulo[locale]} - ${formatPrice(property.preco)}`
  const whatsappUrl = `https://wa.me/351938390075?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <Button asChild variant="ghost" className="gap-2">
            <Link href="/imoveis">
              <ChevronLeft className="h-4 w-4" />
              {t.backToProperties}
            </Link>
          </Button>
        </div>
      </div>

      <ImageGallery images={property.fotos} title={property.titulo[locale]} />

      {/* Property Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <Badge className="mb-3 bg-secondary text-secondary-foreground">
                    {propertyTypeLabels[property.tipo]}
                  </Badge>
                  <h1 className="text-3xl md:text-4xl font-bold text-balance mb-3">{property.titulo[locale]}</h1>
                  <div className="flex items-center text-muted-foreground gap-2">
                    <MapPin className="h-5 w-5 shrink-0" />
                    <span className="text-lg">
                      {property.freguesia}, {property.concelho}, {property.distrito}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <ShareButton />
                  <FavoriteButton />
                </div>
              </div>
              <div className="text-4xl font-bold text-primary">{formatPrice(property.preco)}</div>
            </div>

            {/* Features */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">{t.features}</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
                      <Maximize className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="font-semibold text-lg">{property.area}m²</div>
                      <div className="text-sm text-muted-foreground">{t.totalArea}</div>
                    </div>
                  </div>
                  {property.area_util && (
                    <div className="flex flex-col items-center text-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
                        <Maximize className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="font-semibold text-lg">{property.area_util}m²</div>
                        <div className="text-sm text-muted-foreground">{t.usefulArea}</div>
                      </div>
                    </div>
                  )}
                  {property.area_bruta_privativa && (
                    <div className="flex flex-col items-center text-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
                        <Maximize className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="font-semibold text-lg">{property.area_bruta_privativa}m²</div>
                        <div className="text-sm text-muted-foreground">{t.grossPrivateArea}</div>
                      </div>
                    </div>
                  )}
                  {property.area_terreno && (
                    <div className="flex flex-col items-center text-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
                        <Maximize className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="font-semibold text-lg">{property.area_terreno}m²</div>
                        <div className="text-sm text-muted-foreground">{t.landArea}</div>
                      </div>
                    </div>
                  )}
                  {property.quartos && (
                    <div className="flex flex-col items-center text-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
                        <Bed className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="font-semibold text-lg">{property.quartos}</div>
                        <div className="text-sm text-muted-foreground">{t.bedrooms}</div>
                      </div>
                    </div>
                  )}
                  {property.banheiros && (
                    <div className="flex flex-col items-center text-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
                        <Bath className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="font-semibold text-lg">{property.banheiros}</div>
                        <div className="text-sm text-muted-foreground">{t.bathrooms}</div>
                      </div>
                    </div>
                  )}
                  {property.vagas && (
                    <div className="flex flex-col items-center text-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
                        <Car className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="font-semibold text-lg">{property.vagas}</div>
                        <div className="text-sm text-muted-foreground">{t.parkingSpaces}</div>
                      </div>
                    </div>
                  )}
                  {property.piso && (
                    <div className="flex flex-col items-center text-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
                        <Layers className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="font-semibold text-lg">{property.piso}</div>
                        <div className="text-sm text-muted-foreground">{t.floor}</div>
                      </div>
                    </div>
                  )}
                  {property.num_pisos && (
                    <div className="flex flex-col items-center text-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
                        <Layers className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="font-semibold text-lg">{property.num_pisos}</div>
                        <div className="text-sm text-muted-foreground">{t.numberOfFloors}</div>
                      </div>
                    </div>
                  )}
                  {property.elevador && (
                    <div className="flex flex-col items-center text-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
                        <ArrowUpDown className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="font-semibold text-lg">Sim</div>
                        <div className="text-sm text-muted-foreground">Elevador</div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Energy Certificate */}
            {property.certificado_energetico && (
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
                      <Award className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{t.energyCertificate}</h3>
                      <p className="text-sm text-muted-foreground">{property.certificado_energetico}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Price per m² */}
            {property.preco_por_m2 && (
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
                      <Euro className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{t.pricePerM2}</h3>
                      <p className="text-sm text-muted-foreground">{formatPrice(property.preco_por_m2)}/m²</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">{t.description}</h2>
                <div className={`text-muted-foreground whitespace-pre-line leading-relaxed ${!isDescriptionExpanded ? 'line-clamp-3' : ''}`}>
                  {property.descricao[locale]}
                </div>
                {property.descricao[locale].length > 150 && (
                  <Button
                    variant="link"
                    className="p-0 h-auto text-primary hover:text-primary/80"
                    onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                  >
                    {isDescriptionExpanded ? t.seeLess : t.seeMore}
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Location */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">{t.location}</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t.district}:</span>
                    <span className="font-medium">{property.distrito}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t.municipality}:</span>
                    <span className="font-medium">{property.concelho}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t.parish}:</span>
                    <span className="font-medium">{property.freguesia}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Video Tour */}
            {property.videoUrl && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">{t.virtualTour}</h2>
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <iframe
                      src={property.videoUrl}
                      title={t.virtualTour}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Map */}
            {property.mapa && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">{t.location}</h2>
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <iframe
                      src={property.mapa}
                      title={t.location}
                      className="w-full h-full"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Contact Card */}
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-semibold">{t.interested}</h2>
                  <p className="text-muted-foreground leading-relaxed">{t.interestedDescription}</p>
                  <Button asChild className="w-full gap-2" size="lg">
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="h-5 w-5" />
                      {t.talkOnWhatsApp}
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="w-full bg-transparent" size="lg">
                    <Link href="/contato">{t.sendMessage}</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Property Info */}
              <Card>
                <CardContent className="p-6 space-y-3">
                  <h3 className="font-semibold">{t.propertyInfo}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t.code}:</span>
                      <span className="font-medium">#{property.id.slice(0, 8)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t.type}:</span>
                      <span className="font-medium">{propertyTypeLabels[property.tipo]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t.district}:</span>
                      <span className="font-medium">{property.distrito}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t.municipality}:</span>
                      <span className="font-medium">{property.concelho}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t.parish}:</span>
                      <span className="font-medium">{property.freguesia}</span>
                    </div>
                    {property.piso && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t.floor}:</span>
                        <span className="font-medium">{property.piso}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Statistics */}
              <Card>
                <CardContent className="p-6 space-y-3">
                  <h3 className="font-semibold">{t.statistics}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Search className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{t.searches}:</span>
                      <span className="font-medium">{property.search_count || 0} {t.searches.toLowerCase()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{t.views}:</span>
                      <span className="font-medium">{property.view_count || 0} {t.views.toLowerCase()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        {similarProperties.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-balance">Também lhe pode interessar</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
              {similarProperties.slice(0, 3).map((property) => (
                <PropertyCard key={property.id} property={property} compact />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
