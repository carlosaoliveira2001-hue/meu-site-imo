"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Database } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DatabaseStatusBanner({ usingFallback }: { usingFallback?: boolean }) {
  if (!usingFallback) return null

  return (
    <Alert variant="destructive" className="mb-6">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Base de Dados Não Configurada</AlertTitle>
      <AlertDescription className="mt-2">
        <p className="mb-3">
          A base de dados Supabase ainda não foi configurada. O site está a usar dados estáticos temporários.
        </p>
        <div className="space-y-2 text-sm">
          <p className="font-semibold">Para configurar:</p>
          <ol className="list-decimal list-inside space-y-1 ml-2">
            <li>Aceda ao Supabase Dashboard</li>
            <li>Vá para SQL Editor → New Query</li>
            <li>Execute o script em: scripts/000_setup_complete_database.sql</li>
            <li>Recarregue esta página</li>
          </ol>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="mt-3 bg-transparent"
          onClick={() => window.open("https://supabase.com/dashboard", "_blank")}
        >
          <Database className="mr-2 h-4 w-4" />
          Abrir Supabase Dashboard
        </Button>
      </AlertDescription>
    </Alert>
  )
}
