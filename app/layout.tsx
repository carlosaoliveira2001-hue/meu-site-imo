import type React from "react"
import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LanguageProvider } from "@/lib/i18n/language-context"
import { AdminAccessTrigger } from "@/components/admin-access-trigger"
import "./globals.css"

export const metadata: Metadata = {
  title: "TeamConcept - O Seu Imóvel dos Sonhos",
  description:
    "Encontre o imóvel perfeito com a TeamConcept. Casas, apartamentos e terrenos com as melhores condições em Portugal.",
  generator: "imo-project",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-PT">
      <body className={`font-sans antialiased`}>
        <LanguageProvider>
          <AdminAccessTrigger />
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}
