"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, TestTube } from "lucide-react"

export function UploadTest() {
  const [testing, setTesting] = useState(false)
  const [result, setResult] = useState<any>(null)

  const testUpload = async () => {
    setTesting(true)
    setResult(null)

    try {
      console.log("[v0] Testing upload API...")
      const response = await fetch("/api/test-upload", {
        method: "POST",
      })

      const data = await response.json()
      console.log("[v0] Test result:", data)
      setResult(data)
    } catch (error) {
      console.error("[v0] Test error:", error)
      setResult({ success: false, error: error instanceof Error ? error.message : "Unknown error" })
    }

    setTesting(false)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TestTube className="h-5 w-5" />
          Teste de Upload
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={testUpload} disabled={testing} className="w-full">
          {testing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              A testar...
            </>
          ) : (
            "Testar Upload"
          )}
        </Button>

        {result && (
          <div className="p-3 rounded-lg border">
            <h4 className="font-semibold mb-2">Resultado do Teste:</h4>
            <pre className="text-xs bg-muted p-2 rounded overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
