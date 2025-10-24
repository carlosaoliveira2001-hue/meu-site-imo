"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"
import { translations } from "@/lib/i18n/translations"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const { locale } = useLanguage()
  const t = translations[locale]

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      nome: formData.get("nome"),
      email: formData.get("email"),
      telefone: formData.get("telefone"),
      mensagem: formData.get("mensagem"),
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // In a real application, you would send this data to your backend
    console.log("[v0] Form data:", data)

    setIsSubmitting(false)

    toast({
      title: locale === "pt" ? "Mensagem enviada com sucesso!" : "Message sent successfully!",
      description: locale === "pt" ? "Entraremos em contato em breve. Obrigado!" : "We will contact you soon. Thank you!",
    })

    // Reset form
    e.currentTarget.reset()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="nome">{t.name} *</Label>
          <Input id="nome" name="nome" placeholder={locale === "pt" ? "Seu nome" : "Your name"} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">{t.email} *</Label>
          <Input id="email" name="email" type="email" placeholder={locale === "pt" ? "seu@email.com" : "your@email.com"} required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="telefone">{t.phone} *</Label>
        <Input id="telefone" name="telefone" type="tel" placeholder={locale === "pt" ? "(351) 999-999-999" : "(351) 999-999-999"} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="mensagem">{t.message} *</Label>
        <Textarea id="mensagem" name="mensagem" placeholder={locale === "pt" ? "Conte-nos como podemos ajudá-lo..." : "Tell us how we can help you..."} rows={6} required />
      </div>

      <Button type="submit" size="lg" className="w-full md:w-auto" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            {locale === "pt" ? "Enviando..." : "Sending..."}
          </>
        ) : (
          t.sendMessage
        )}
      </Button>
    </form>
  )
}
