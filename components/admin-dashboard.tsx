"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { adminLogout } from "@/lib/admin-auth"
import { useRouter } from "next/navigation"
import { PropertyList } from "@/components/admin/property-list"
import { PropertyForm } from "@/components/admin/property-form"
import { UploadTest } from "@/components/admin/upload-test"
import { LogOut, Plus, List, TestTube } from "lucide-react"

export function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("list")
  const [editingPropertyId, setEditingPropertyId] = useState<string | null>(null)

  const handleLogout = async () => {
    await adminLogout()
    router.push("/")
  }

  const handleEdit = (propertyId: string) => {
    setEditingPropertyId(propertyId)
    setActiveTab("form")
  }

  const handleNew = () => {
    setEditingPropertyId(null)
    setActiveTab("form")
  }

  const handleSaveComplete = () => {
    setEditingPropertyId(null)
    setActiveTab("list")
  }

  return (
    <div className="min-h-screen bg-muted/30 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Painel de Administração</h1>
            <p className="text-muted-foreground">Gerir imóveis do website</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-lg grid-cols-3">
            <TabsTrigger value="list">
              <List className="mr-2 h-4 w-4" />
              Lista de Imóveis
            </TabsTrigger>
            <TabsTrigger value="form">
              <Plus className="mr-2 h-4 w-4" />
              {editingPropertyId ? "Editar" : "Novo"} Imóvel
            </TabsTrigger>
            <TabsTrigger value="test">
              <TestTube className="mr-2 h-4 w-4" />
              Teste
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Imóveis</CardTitle>
                    <CardDescription>Gerir todos os imóveis do website</CardDescription>
                  </div>
                  <Button onClick={handleNew}>
                    <Plus className="mr-2 h-4 w-4" />
                    Novo Imóvel
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <PropertyList onEdit={handleEdit} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="form" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{editingPropertyId ? "Editar" : "Novo"} Imóvel</CardTitle>
                <CardDescription>
                  {editingPropertyId ? "Editar informações do imóvel" : "Adicionar um novo imóvel ao website"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PropertyForm propertyId={editingPropertyId} onSaveComplete={handleSaveComplete} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="test" className="mt-6">
            <div className="flex justify-center">
              <UploadTest />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
