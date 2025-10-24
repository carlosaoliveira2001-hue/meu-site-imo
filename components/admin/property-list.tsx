"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2, Loader2 } from "lucide-react"
import { fetchPropertiesForAdmin } from "@/lib/admin-actions"
import { deleteProperty } from "@/lib/properties-actions"
import { DatabaseStatusBanner } from "@/components/admin/database-status-banner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface PropertyListProps {
  onEdit: (propertyId: string) => void
}

export function PropertyList({ onEdit }: PropertyListProps) {
  const [properties, setProperties] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [usingFallback, setUsingFallback] = useState(false)

  const loadProperties = async () => {
    setLoading(true)
    const { properties: data, usingFallback: fallback } = await fetchPropertiesForAdmin()
    setProperties(data)
    setUsingFallback(fallback || false)
    setLoading(false)
  }

  useEffect(() => {
    loadProperties()
  }, [])

  const handleDelete = async () => {
    if (!deleteId) return

    setDeleting(true)
    const result = await deleteProperty(deleteId)

    if (result.success) {
      await loadProperties()
    }

    setDeleting(false)
    setDeleteId(null)
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

      {properties.length === 0 ? (
        <div className="py-8 text-center text-muted-foreground">
          Nenhum imóvel encontrado. Adicione o primeiro imóvel!
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título (PT)</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Cidade</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Destaque</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {properties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell className="font-medium">{property.titulo_pt}</TableCell>
                  <TableCell className="capitalize">{property.tipo}</TableCell>
                  <TableCell>{property.cidade}</TableCell>
                  <TableCell>€{property.preco.toLocaleString("pt-PT")}</TableCell>
                  <TableCell>
                    {property.destaque ? <Badge>Destaque</Badge> : <Badge variant="outline">Normal</Badge>}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => onEdit(property.id)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setDeleteId(property.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem a certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser revertida. O imóvel será permanentemente eliminado.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={deleting}>
              {deleting ? "A eliminar..." : "Eliminar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
