"use client"

import { useState, useMemo } from "react"
import { PropertyCard } from "@/components/property-card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { formatPrice } from "@/lib/properties-helpers"
import { SlidersHorizontal, X } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import type { PropertyForDisplay } from "@/lib/properties-helpers"
import { useLanguage } from "@/lib/i18n/language-context"
import { translations } from "@/lib/i18n/translations"

interface PropertiesPageClientProps {
  properties: PropertyForDisplay[]
}

export function PropertiesPageClient({ properties }: PropertiesPageClientProps) {
  const { locale } = useLanguage()
  const t = translations[locale]
  
  const [tipo, setTipo] = useState<string>("todos")
  const [concelho, setConcelho] = useState<string>("todas")
  const [precoMax, setPrecoMax] = useState<number>(3000000)
  const [areaMin, setAreaMin] = useState<number>(0)
  const [quartos, setQuartos] = useState<string>("todos")

  // Get unique municipalities from properties
  const concelhos = useMemo(() => {
    const uniqueConcelhos = Array.from(new Set(properties.map((p) => p.concelho).filter(Boolean))).sort()
    return uniqueConcelhos
  }, [properties])

  // Filter properties based on selected filters
  const filteredProperties = useMemo(() => {
    const filtered = properties.filter((property) => {
      if (tipo !== "todos" && property.tipo !== tipo) return false
      if (concelho !== "todas" && property.concelho !== concelho) return false
      if (property.preco > precoMax) return false
      if (property.area < areaMin) return false
      if (quartos !== "todos") {
        const quartosNum = Number.parseInt(quartos)
        if (!property.quartos || property.quartos < quartosNum) return false
      }
      return true
    })

    // Increment search_count for each property in filtered results
    if (filtered.length > 0) {
      // Note: This would ideally be done server-side, but for client-side filtering, we can simulate
      // In a real app, you'd call an API to increment search counts
      console.log(`Incrementing search_count for ${filtered.length} properties`)
    }

    return filtered
  }, [properties, tipo, concelho, precoMax, areaMin, quartos])

  const resetFilters = () => {
    setTipo("todos")
    setConcelho("todas")
    setPrecoMax(3000000)
    setAreaMin(0)
    setQuartos("todos")
  }

  const hasActiveFilters =
    tipo !== "todos" || concelho !== "todas" || precoMax !== 3000000 || areaMin !== 0 || quartos !== "todos"

  const FilterContent = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="tipo">{t.propertyType}</Label>
        <Select value={tipo} onValueChange={setTipo}>
          <SelectTrigger id="tipo">
            <SelectValue placeholder={t.selectType} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">{t.all}</SelectItem>
            <SelectItem value="casa">{t.house}</SelectItem>
            <SelectItem value="apartamento">{t.apartment}</SelectItem>
            <SelectItem value="terreno">{t.land}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="concelho">{t.municipality}</Label>
        <Select value={concelho} onValueChange={setConcelho}>
          <SelectTrigger id="concelho">
            <SelectValue placeholder={t.selectMunicipality} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">{t.all}</SelectItem>
            {concelhos.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="quartos">{t.bedrooms}</Label>
        <Select value={quartos} onValueChange={setQuartos}>
          <SelectTrigger id="quartos">
            <SelectValue placeholder={t.numberOfBedrooms} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">{t.all}</SelectItem>
            <SelectItem value="1">1+</SelectItem>
            <SelectItem value="2">2+</SelectItem>
            <SelectItem value="3">3+</SelectItem>
            <SelectItem value="4">4+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <Label htmlFor="preco">{t.maxPrice}: {formatPrice(precoMax)}</Label>
        <Slider
          id="preco"
          min={100000}
          max={3000000}
          step={50000}
          value={[precoMax]}
          onValueChange={(value) => setPrecoMax(value[0])}
          className="w-full"
        />
      </div>

      <div className="space-y-3">
        <Label htmlFor="area">{t.minArea}: {areaMin}m²</Label>
        <Slider
          id="area"
          min={0}
          max={500}
          step={10}
          value={[areaMin]}
          onValueChange={(value) => setAreaMin(value[0])}
          className="w-full"
        />
      </div>

      {hasActiveFilters && (
        <Button onClick={resetFilters} variant="outline" className="w-full gap-2 bg-transparent">
          <X className="h-4 w-4" />
          {t.clearFilters}
        </Button>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-balance mb-2">{t.allProperties}</h1>
          <p className="text-lg text-primary-foreground/90 text-pretty leading-relaxed">
            {t.findPerfectProperty}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-8 bg-card border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6">{t.filters}</h2>
              <FilterContent />
            </div>
          </aside>

          {/* Mobile Filters */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full gap-2 bg-transparent">
                  <SlidersHorizontal className="h-4 w-4" />
                  {t.filters}
                  {hasActiveFilters && (
                    <span className="ml-auto bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">
                      {t.active}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>{t.filters}</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Properties Grid */}
          <div className="flex-1">
            <div className="mb-6">
              <p className="text-muted-foreground">
                {filteredProperties.length}{" "}
                {filteredProperties.length === 1 ? t.propertyFound : t.propertiesFound}
              </p>
            </div>

            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground mb-4">
                  {t.noPropertiesFound}
                </p>
                <Button onClick={resetFilters} variant="outline">
                  {t.clearFilters}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
