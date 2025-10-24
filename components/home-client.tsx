"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PropertyCard } from "@/components/property-card"
import { Search, Home, Award, Users, MessageCircle } from "lucide-react"
import { translations } from "@/lib/i18n/translations"
import { useLanguage } from "@/lib/i18n/language-context"
import type { PropertyForDisplay } from "@/lib/properties-helpers"

interface HomeClientProps {
  featuredProperties: PropertyForDisplay[]
}

export function HomeClient({ featuredProperties }: HomeClientProps) {
  const { locale } = useLanguage()
  const t = translations[locale]
  
  const whatsappNumber = "351912345678"

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section 
        className="relative text-white py-32 md:py-40 section-fade"
        style={{
          backgroundImage: 'url(/modern-house-exterior-with-pool.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay escuro para legibilidade do texto */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-balance leading-tight">{t.heroTitle}</h1>
            <p className="text-lg md:text-xl text-white/90 text-pretty leading-relaxed">
              {t.heroDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" variant="secondary" className="gap-2 btn-hover">
                <Link href="/imoveis">
                  <Search className="h-5 w-5" />
                  {t.viewAllProperties}
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="gap-2 bg-white text-primary hover:bg-white/90 border-white btn-hover"
              >
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(t.whatsappGreeting)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-5 w-5" />
                  {t.contactUs}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 md:py-28 section-fade">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance text-foreground">{t.featuredTitle}</h2>
            <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto leading-relaxed">
              {t.featuredDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg" variant="outline" className="btn-hover">
              <Link href="/imoveis">{t.viewAllProperties}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 md:py-28 bg-muted section-fade">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance text-foreground">{t.whyChooseTitle}</h2>
              <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                {t.whyChooseDescription}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted text-primary hover:scale-110 transition-all duration-200">
                  <Award className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{t.experienceTitle}</h3>
                <p className="text-muted-foreground leading-relaxed">{t.experienceDescription}</p>
              </div>

              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted text-primary hover:scale-110 transition-all duration-200">
                  <Home className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{t.varietyTitle}</h3>
                <p className="text-muted-foreground leading-relaxed">{t.varietyDescription}</p>
              </div>

              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted text-primary hover:scale-110 transition-all duration-200">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{t.serviceTitle}</h3>
                <p className="text-muted-foreground leading-relaxed">{t.serviceDescription}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-muted section-fade">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-balance text-foreground">{t.ctaTitle}</h2>
            <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
              {t.ctaDescription}
            </p>
            <Button
              asChild
              size="lg"
              variant="default"
              className="gap-2 btn-hover"
            >
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(t.whatsappContactForm)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-5 w-5" />
                {t.talkOnWhatsApp}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
