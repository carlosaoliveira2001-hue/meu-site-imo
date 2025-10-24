"use client"

import { ContactForm } from "@/components/contact-form"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"
import { translations } from "@/lib/i18n/translations"

export default function ContatoPage() {
  const { locale } = useLanguage()
  const t = translations[locale]
  
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-balance mb-2">{t.contactTitle}</h1>
          <p className="text-lg text-primary-foreground/90 text-pretty leading-relaxed">
            {t.contactDescription}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-2">{t.sendYourMessage}</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {t.fillFormDescription}
                </p>
                <ContactForm />
              </CardContent>
            </Card>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            {/* WhatsApp Card */}
            <Card className="bg-secondary text-secondary-foreground">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-secondary-foreground/10 flex items-center justify-center">
                    <MessageCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">WhatsApp</h3>
                    <p className="text-sm text-secondary-foreground/80">{t.quickService}</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-secondary-foreground/90">
                  {t.preferWhatsApp}
                </p>
                <Button
                  asChild
                  className="w-full gap-2 bg-secondary-foreground text-secondary hover:bg-secondary-foreground/90"
                >
                  <a
                    href={`https://wa.me/351938390075?text=${encodeURIComponent(t.whatsappContactForm)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-5 w-5" />
                    {t.openWhatsApp}
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Contact Details */}
            <Card>
              <CardContent className="p-6 space-y-6">
                <h3 className="font-semibold text-lg">{t.contactInfo}</h3>

                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">Telefone</div>
                      <a href="tel:+351938390075" className="text-sm text-muted-foreground hover:text-primary">
                        +351 938 390 075
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">WhatsApp</div>
                      <a
                        href="https://wa.me/351938390075"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-primary"
                      >
                        +351 938 390 075
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">E-mail</div>
                      <a
                        href="mailto:contacto@teamconcept.pt"
                        className="text-sm text-muted-foreground hover:text-primary"
                      >
                        contacto@teamconcept.pt
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">Endereço</div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        R. Direita de Francos 934
                        <br />
                        4250-192 Porto
                        <br />
                        Portugal
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">Horário de Atendimento</div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Segunda a Sexta: 9h às 18h
                        <br />
                        Sábado: 9h às 13h
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">A Nossa Localização</h2>
              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3004.2!2d-8.6215!3d41.1621!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd2465abc4e153c1%3A0xa648d95640b114bc!2sR.%20Direita%20de%20Francos%20934%2C%204250-192%20Porto!5e0!3m2!1spt-PT!2spt!4v1234567890"
                  title="Localização TeamConcept"
                  className="w-full h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
