"use client"

import React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2 } from "lucide-react"
import { fetchPropertyForAdmin } from "@/lib/admin-actions"
import { createProperty, updateProperty, type PropertyData } from "@/lib/properties-actions"
import { ImageUploadSection } from "@/components/admin/image-upload-section"
import { DatabaseStatusBanner } from "@/components/admin/database-status-banner"
import { useToast } from "@/hooks/use-toast"

interface PropertyFormProps {
  propertyId: string | null
  onSaveComplete: () => void
}

export function PropertyForm({ propertyId, onSaveComplete }: PropertyFormProps) {
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [usingFallback, setUsingFallback] = useState(false)
  const { toast } = useToast()
  const [formData, setFormData] = useState<PropertyData>({
    tipo: "apartamento",
    titulo_pt: "",
    titulo_en: "",
    preco: 0,
    area: 0,
    area_util: undefined,
    area_bruta_privativa: undefined,
    area_terreno: undefined,
    quartos: 0,
    banheiros: 0,
    vagas: 0,
    num_pisos: undefined,
    piso: "",
    distrito: "",
    concelho: "",
    freguesia: "",
    descricao_pt: "",
    descricao_en: "",
    video_url: "",
    mapa: "",
    destaque: false,
    search_count: 0,
    view_count: 0,
    badges: [],
    elevador: false,
    certificado_energetico: "",
    preco_por_m2: undefined,
  })

  useEffect(() => {
    if (propertyId) {
      loadProperty()
    } else {
      // Reset form for new property
      setFormData({
        tipo: "apartamento",
        titulo_pt: "",
        titulo_en: "",
        preco: 0,
        area: 0,
        area_util: undefined,
        area_bruta_privativa: undefined,
        area_terreno: undefined,
        quartos: 0,
        banheiros: 0,
        vagas: 0,
        num_pisos: undefined,
        piso: "",
        distrito: "",
        concelho: "",
        freguesia: "",
        descricao_pt: "",
        descricao_en: "",
        video_url: "",
        mapa: "",
        destaque: false,
        search_count: 0,
        view_count: 0,
        badges: [],
        elevador: false,
        certificado_energetico: "",
        preco_por_m2: undefined,
      })
    }
  }, [propertyId])

  const loadProperty = async () => {
    if (!propertyId) return

    setLoading(true)
    const { property, usingFallback: fallback } = await fetchPropertyForAdmin(propertyId)
    setUsingFallback(fallback || false)

    if (property) {
      setFormData({
        tipo: property.tipo,
        titulo_pt: property.titulo_pt || "",
        titulo_en: property.titulo_en || "",
        preco: property.preco || 0,
        area: property.area || 0,
        area_util: property.area_util,
        area_bruta_privativa: property.area_bruta_privativa,
        area_terreno: property.area_terreno,
        quartos: property.quartos || 0,
        banheiros: property.banheiros || 0,
        vagas: property.vagas || 0,
        num_pisos: property.num_pisos,
        piso: property.piso || "",
        distrito: property.distrito || "",
        concelho: property.concelho || "",
        freguesia: property.freguesia || "",
        descricao_pt: property.descricao_pt || "",
        descricao_en: property.descricao_en || "",
        video_url: property.video_url || "",
        mapa: property.mapa || "",
        destaque: property.destaque || false,
        search_count: property.search_count || 0,
        view_count: property.view_count || 0,
        badges: property.badges || [],
        elevador: property.elevador || false,
        certificado_energetico: property.certificado_energetico || "",
        preco_por_m2: property.preco_por_m2,
      })
    }

    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    let result
    if (propertyId) {
      result = await updateProperty(propertyId, formData)
    } else {
      result = await createProperty(formData)
    }

    if (result.error) {
      toast({
        title: "Erro",
        description: result.error,
        variant: "destructive",
      })
      setSaving(false)
      return
    }

    setSaving(false)
    onSaveComplete()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <>
      <DatabaseStatusBanner usingFallback={usingFallback} />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="tipo">Tipo de Imóvel</Label>
            <Select value={formData.tipo} onValueChange={(value: any) => setFormData({ ...formData, tipo: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="casa">Casa</SelectItem>
                <SelectItem value="apartamento">Apartamento</SelectItem>
                <SelectItem value="terreno">Terreno</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="preco">Preço (€)</Label>
            <Input
              id="preco"
              type="number"
              value={formData.preco}
              onChange={(e) => setFormData({ ...formData, preco: Number(e.target.value) })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="titulo_pt">Título (Português)</Label>
            <Input
              id="titulo_pt"
              value={formData.titulo_pt}
              onChange={(e) => setFormData({ ...formData, titulo_pt: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="titulo_en">Título (Inglês)</Label>
            <Input
              id="titulo_en"
              value={formData.titulo_en}
              onChange={(e) => setFormData({ ...formData, titulo_en: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="area">Área (m²)</Label>
            <Input
              id="area"
              type="number"
              value={formData.area}
              onChange={(e) => setFormData({ ...formData, area: Number(e.target.value) })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="area_util">Área Útil (m²)</Label>
            <Input
              id="area_util"
              type="number"
              step="0.01"
              value={formData.area_util || ""}
              onChange={(e) => setFormData({ ...formData, area_util: Number(e.target.value) || undefined })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="area_bruta_privativa">Área Bruta Privativa (m²)</Label>
            <Input
              id="area_bruta_privativa"
              type="number"
              step="0.01"
              value={formData.area_bruta_privativa || ""}
              onChange={(e) => setFormData({ ...formData, area_bruta_privativa: Number(e.target.value) || undefined })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="area_terreno">Área do Terreno (m²)</Label>
            <Input
              id="area_terreno"
              type="number"
              step="0.01"
              value={formData.area_terreno || ""}
              onChange={(e) => setFormData({ ...formData, area_terreno: Number(e.target.value) || undefined })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="certificado_energetico">Certificado Energético</Label>
            <Select value={formData.certificado_energetico} onValueChange={(value: any) => setFormData({ ...formData, certificado_energetico: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Selecionar..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A+">A+</SelectItem>
                <SelectItem value="A">A</SelectItem>
                <SelectItem value="B-">B-</SelectItem>
                <SelectItem value="B">B</SelectItem>
                <SelectItem value="C">C</SelectItem>
                <SelectItem value="D">D</SelectItem>
                <SelectItem value="E">E</SelectItem>
                <SelectItem value="F">F</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.tipo !== "terreno" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="quartos">Quartos</Label>
                <Input
                  id="quartos"
                  type="number"
                  value={formData.quartos || ""}
                  onChange={(e) => setFormData({ ...formData, quartos: Number(e.target.value) || undefined })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="banheiros">Casas de Banho</Label>
                <Input
                  id="banheiros"
                  type="number"
                  value={formData.banheiros || ""}
                  onChange={(e) => setFormData({ ...formData, banheiros: Number(e.target.value) || undefined })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="vagas">Vagas de Garagem</Label>
                <Input
                  id="vagas"
                  type="number"
                  value={formData.vagas || ""}
                  onChange={(e) => setFormData({ ...formData, vagas: Number(e.target.value) || undefined })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="num_pisos">Número de Pisos</Label>
                <Input
                  id="num_pisos"
                  type="number"
                  value={formData.num_pisos || ""}
                  onChange={(e) => setFormData({ ...formData, num_pisos: Number(e.target.value) || undefined })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="elevador">Elevador</Label>
                <Checkbox
                  id="elevador"
                  checked={formData.elevador || false}
                  onCheckedChange={(checked) => setFormData({ ...formData, elevador: Boolean(checked) })}
                />
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label htmlFor="distrito">Distrito</Label>
            <Input
              id="distrito"
              value={formData.distrito}
              onChange={(e) => setFormData({ ...formData, distrito: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="concelho">Concelho</Label>
            <Input
              id="concelho"
              value={formData.concelho}
              onChange={(e) => setFormData({ ...formData, concelho: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="freguesia">Freguesia</Label>
            <Input
              id="freguesia"
              value={formData.freguesia}
              onChange={(e) => setFormData({ ...formData, freguesia: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="descricao_pt">Descrição (Português)</Label>
          <Textarea
            id="descricao_pt"
            value={formData.descricao_pt}
            onChange={(e) => setFormData({ ...formData, descricao_pt: e.target.value })}
            rows={4}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="descricao_en">Descrição (Inglês)</Label>
          <Textarea
            id="descricao_en"
            value={formData.descricao_en}
            onChange={(e) => setFormData({ ...formData, descricao_en: e.target.value })}
            rows={4}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="video_url">URL do Vídeo (YouTube/Vimeo)</Label>
          <Input
            id="video_url"
            value={formData.video_url}
            onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
            placeholder="https://www.youtube.com/embed/..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="mapa">URL do Mapa (Google Maps Embed)</Label>
          <Input
            id="mapa"
            value={formData.mapa}
            onChange={(e) => setFormData({ ...formData, mapa: e.target.value })}
            placeholder="https://www.google.com/maps/embed?pb=..."
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="destaque"
            checked={formData.destaque}
            onCheckedChange={(checked) => setFormData({ ...formData, destaque: checked })}
          />
          <Label htmlFor="destaque">Imóvel em Destaque</Label>
        </div>

        {propertyId && <ImageUploadSection propertyId={propertyId} />}

        <div className="flex gap-4">
          <Button type="submit" disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />A guardar...
              </>
            ) : (
              "Guardar Imóvel"
            )}
          </Button>
        </div>
      </form>
    </>
  )
}
