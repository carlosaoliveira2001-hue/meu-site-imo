"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n/language-context"
import { Languages } from "lucide-react"

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLocale(locale === "pt" ? "en" : "pt")}
      className="gap-2"
      aria-label="Change language"
    >
      <Languages className="h-4 w-4" />
      <span className="text-sm font-medium">{locale === "pt" ? "EN" : "PT"}</span>
    </Button>
  )
}
