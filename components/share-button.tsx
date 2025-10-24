"use client"

import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function ShareButton() {
  const { toast } = useToast()

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        })
      } catch (error) {
        // User cancelled share
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href)
        toast({
          title: "Link copiado!",
          description: "O link foi copiado para a área de transferência.",
        })
      } catch (error) {
        toast({
          title: "Erro",
          description: "Não foi possível copiar o link.",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <Button variant="outline" size="icon" onClick={handleShare}>
      <Share2 className="h-5 w-5" />
    </Button>
  )
}
