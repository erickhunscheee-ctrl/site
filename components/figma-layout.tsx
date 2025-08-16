"use client"

import type React from "react"
import { useCallback, useRef, useState } from "react"
import Image from "next/image"
import { MoundChat } from "@/components/mound-chat"
import { WhatsAppIntegration } from "@/components/whatsapp-integration"
import { PixIntegration } from "@/components/pix-integration"
import { StripeIntegration } from "@/components/stripe-integration"
import { LearnMoreSection } from "@/components/learn-more"
import { AvaliacoesSection } from "@/components/avaliacoes-section"
import { PortalEmpresa } from "@/components/portal-empresa"
import { LoadingScreen } from "@/components/loading-screen"
import { Github, Zap, Network, Code, Linkedin, ChevronLeft, ChevronRight } from "lucide-react"
import { ApiIntegrations } from "@/components/api-integrations"

const services = [
  { title: "Service 1", description: "Description 1", icon: Github },
  { title: "Service 2", description: "Description 2", icon: Zap },
  { title: "Service 3", description: "Description 3", icon: Network },
]

const team = [
  { name: "Member 1", role: "Role 1", description: "Description 1", icon: Github, avatar: "/images/member1.jpg" },
  { name: "Member 2", role: "Role 2", description: "Description 2", icon: Linkedin, avatar: "/images/member2.jpg" },
  { name: "Member 3", role: "Role 3", description: "Description 3", icon: Code, avatar: "/images/member3.jpg" },
]

export function FigmaLayout() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentServicePage, setCurrentServicePage] = useState(0)
  const [currentIntegrationPage, setCurrentIntegrationPage] = useState(0)
  const [currentTeamPage, setCurrentTeamPage] = useState(0)

  const homeRef = useRef<HTMLElement | null>(null)
  const sobreRef = useRef<HTMLDivElement | null>(null)
  const demosRef = useRef<HTMLElement | null>(null)
  const devsRef = useRef<HTMLElement | null>(null)
  const noticiasRef = useRef<HTMLElement | null>(null)
  const avaliacoesRef = useRef<HTMLElement | null>(null)
  const portalRef = useRef<HTMLElement | null>(null)
  const futebolRef = useRef<HTMLElement | null>(null)

  const scrollTo = useCallback((ref: React.RefObject<HTMLElement | HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [])

  const sectionMax = "max-w-[1000px] mx-auto"

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />
  }

  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-[400px] md:top-[800px] left-[50px] md:left-[100px] w-[300px] md:w-[1000px] h-[40px] md:h-[80px] bg-[rgba(99,98,97,0.5)] blur-[60px] md:blur-[125px] pointer-events-none"></div>

      {/* Header Navigation */}
      <header className="relative z-10 flex justify-center items-center pt-4 md:pt-8 pb-2 md:pb-4 px-4">
        <nav className="flex items-center gap-4 md:gap-16 text-sm md:text-lg">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              scrollTo(homeRef)
            }}
            className="text-white font-normal hover:opacity-80 transition-opacity"
          >
            home
          </a>
          <a
            href="#sobre-nos"
            onClick={(e) => {
              e.preventDefault()
              scrollTo(sobreRef)
            }}
            className="text-white font-normal hover:opacity-80 transition-opacity hidden sm:block"
          >
            sobre nós
          </a>

          {/* Logo centralizado */}
          <div className="mx-4 md:mx-8">
            <Image
              src="/images/logo.png"
              alt="Logo MOUND"
              width={60}
              height={60}
              className="md:w-[100px] md:h-[100px] object-contain"
              priority
            />
          </div>

          <a
            href="#desenvolvedores"
            onClick={(e) => {
              e.preventDefault()
              scrollTo(devsRef)
            }}
            className="text-white font-normal hover:opacity-80 transition-opacity hidden sm:block"
          >
            desenvolvedores
          </a>
          <a
            href="#integracoes"
            onClick={(e) => {
              e.preventDefault()
              scrollTo(demosRef)
            }}
            className="text-white font-normal hover:opacity-80 transition-opacity"
          >
            curiosidade
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        ref={homeRef}
        className="relative z-10 flex items-center justify-center px-4 md:px-16 py-28 md:py-32 max-w-[1920px] mx-auto min-h-[70vh]"
        aria-labelledby="hero-title"
      >
        <div className="absolute top-12 inset-0 flex items-center justify-center">
          <Image
            src="/images/hero-section.png"
            alt="Figura futurista"
            width={1000}
            height={300}
            className="object-contain opacity-70"
            priority
          />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-[800px] -mt-40 md:-mt-72">
          <div className="mb-4 md:mb-6">
            <h1 id="hero-title" className="text-white text-lg md:text-2xl font-normal -tracking-wide leading-tight">
              {"Conte-nos sua necessidade."}
              <br />
              {"Afinal, que sentido há em um mundo sem desafios?"}
            </h1>
          </div>

          <p className="text-white text-sm md:text-xl font-light leading-relaxed mb-6 md:mb-8 max-w-[600px] px-4">
            somos uma empresa focada em desenvolver soluções personalizadas, para suas necessidades.
          </p>

          <div className="flex gap-6 justify-center">
            <button
              onClick={() => scrollTo(demosRef)}
              className="flex justify-center items-center px-8 md:px-12 py-2 md:py-3 bg-[#ffffff] rounded-[30px] hover:opacity-90 transition"
              aria-label="Ir para a seção de demonstrações (curiosidade)"
            >
              <span className="text-[#262A2C] text-xs md:text-sm font-semibold">CURIOSIDADE</span>
            </button>
          </div>
        </div>
      </section>

      {/* Discover More Section (Chat) */}
      <section
        className="relative z-10 px-4 md:px-16 py-8 md:py-16 max-w-[1920px] mx-auto"
        aria-labelledby="descubra-mais-title"
      >
        <h2 id="descubra-mais-title" className="text-white text-lg md:text-xl font-normal mb-6 md:mb-8 text-center">
          Descubra mais sobre nós
        </h2>

        <div
          className={`${sectionMax} h-[300px] md:h-[380px] bg-[#151313] rounded-[15px] md:rounded-[20px] relative overflow-hidden`}
        >
          <div className="w-full h-[60px] md:h-[88px] bg-[#1C1B1B] rounded-t-[15px] md:rounded-t-[20px] flex items-center px-4 md:px-6">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-2 md:w-3 h-2 md:h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-white text-xs md:text-sm font-medium">MOUND Assistente</span>
              <span className="text-green-400 text-xs hidden sm:block">Conectado via GROQ</span>
            </div>
          </div>
          <div className="p-3 md:p-6 h-[calc(300px-60px)] md:h-[calc(380px-88px)] overflow-hidden">
            <MoundChat />
          </div>
        </div>
      </section>

      <section ref={portalRef}>
        <PortalEmpresa />
      </section>

      {/* Serviços */}
      <section
        id="servicos"
        className="relative z-10 px-4 md:px-16 py-8 md:py-16 max-w-[1920px] mx-auto"
        aria-labelledby="servicos-title"
      >
        <h2 id="servicos-title" className="text-white text-lg md:text-xl font-normal mb-8 md:mb-12 text-center">
          Nossos Serviços
        </h2>

        <div className={`${sectionMax}`}>
          {/* Desktop */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>

          {/* Mobile com paginação */}
          <div className="block md:hidden">
            <div className="relative">
              <ServiceCard service={services[currentServicePage]} />
              <div className="flex justify-center items-center mt-6 gap-4">
                <button
                  onClick={() => setCurrentServicePage((prev) => (prev > 0 ? prev - 1 : services.length - 1))}
                  className="w-10 h-10 bg-[#262A2C] rounded-full flex items-center justify-center hover:bg-[#2a2e30] transition-colors"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <div className="flex gap-2" aria-hidden>
                  {services.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${index === currentServicePage ? "bg-white" : "bg-gray-600"}`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setCurrentServicePage((prev) => (prev < services.length - 1 ? prev + 1 : 0))}
                  className="w-10 h-10 bg-[#262A2C] rounded-full flex items-center justify-center hover:bg-[#2a2e30] transition-colors"
                  aria-label="Próximo"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demonstrações de Integração (Stripe restaurado) */}
      <section
        id="integracoes"
        ref={demosRef}
        className="relative z-10 px-4 md:px-16 py-8 md:py-16 max-w-[1920px] mx-auto"
        aria-labelledby="integracoes-title"
      >
        <h2 id="integracoes-title" className="text-white text-lg md:text-xl font-normal mb-6 md:mb-8 text-center">
          Demonstrações de Integração
        </h2>
        <p className="text-gray-300 text-sm md:text-lg text-center mb-8 md:mb-12 max-w-[600px] mx-auto px-4">
          Experimente nossas integrações em tempo real e veja como podemos facilitar seus processos.
        </p>

        <div className={`${sectionMax}`}>
          {/* Desktop: exatamente como antes (3 cards) */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            <WhatsAppIntegration />
            <PixIntegration />
            <StripeIntegration />
          </div>

          {/* Mobile: 3 páginas (WhatsApp, Pix, Stripe) */}
          <div className="block md:hidden">
            <div className="relative">
              {currentIntegrationPage === 0 ? (
                <WhatsAppIntegration />
              ) : currentIntegrationPage === 1 ? (
                <PixIntegration />
              ) : (
                <StripeIntegration />
              )}

              <div className="flex justify-center items-center mt-6 gap-4">
                <button
                  onClick={() => setCurrentIntegrationPage((prev) => (prev - 1 + 3) % 3)}
                  className="w-10 h-10 bg-[#262A2C] rounded-full flex items-center justify-center hover:bg-[#2a2e30] transition-colors"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>

                <div className="flex gap-2" aria-hidden>
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${i === currentIntegrationPage ? "bg-white" : "bg-gray-600"}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setCurrentIntegrationPage((prev) => (prev + 1) % 3)}
                  className="w-10 h-10 bg-[#262A2C] rounded-full flex items-center justify-center hover:bg-[#2a2e30] transition-colors"
                  aria-label="Próximo"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Desenvolvedores (sem fundo nos cards) */}
      <section
        id="desenvolvedores"
        ref={devsRef}
        className="relative z-10 px-4 md:px-16 py-8 md:py-16 max-w-[1920px] mx-auto"
        aria-labelledby="devs-title"
      >
        <h2 id="devs-title" className="text-white text-lg md:text-xl font-normal mb-6 md:mb-8 text-center">
          Nossa Equipe
        </h2>
        <p className="text-gray-300 text-sm md:text-lg text-center mb-8 md:mb-12 max-w-[600px] mx-auto px-4">
          Conheça os desenvolvedores por trás da MOUND, profissionais dedicados em criar soluções inovadoras.
        </p>

        <div className={`${sectionMax} flex justify-center gap-16 flex-wrap`}>
          {team.map((member, index) => (
            <TeamMember key={index} member={member} />
          ))}
        </div>
      </section>

      {/* Sobre nós (logo após desenvolvedores) */}
      <div ref={sobreRef}>
        <LearnMoreSection />
      </div>

      <section ref={avaliacoesRef}>
        <AvaliacoesSection />
      </section>

      <ApiIntegrations />

      {/* Faixa de integrações (logos) */}
      <section className="relative z-10 px-16 pt-16 pb-0 max-w-[1920px] mx-auto">
        <h2 className="text-white text-sm font-normal mb-8 text-center">Nossas integrações</h2>

        <div
          className={`${sectionMax} w-full h-[97px] bg-[#08090A] flex justify-center items-center gap-16 rounded-lg`}
        >
          <div className="flex flex-col items-center group cursor-pointer">
            <Github className="w-12 h-12 text-white group-hover:text-gray-300 transition-colors" />
            <span className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">GitHub</span>
          </div>
          <div className="flex flex-col items-center group cursor-pointer">
            <Zap className="w-12 h-12 text-white mb-2 group-hover:text-gray-300 transition-colors" />
            <span className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">Groq</span>
          </div>
          <div className="flex flex-col items-center group cursor-pointer">
            <Network className="w-12 h-12 text-white mb-2 group-hover:text-gray-300 transition-colors" />
            <span className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">n8n</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 w-full h-[200] bg-[#08090A] flex items-center justify-center">
        <p className="text-white text-sm font-normal">Uma criação MOUND © 2025</p>
      </footer>
    </div>
  )
}

// Service Card
function ServiceCard({ service }: { service: any }) {
  const IconComponent = service.icon
  return (
    <div className="bg-[#151313] border border-[#262A2C] rounded-[15px] md:rounded-[20px] p-6 md:p-8 hover:bg-[#1a1818] transition-colors group">
      <div className="flex flex-col items-center text-center">
        <div className="w-12 md:w-16 h-12 md:h-16 bg-[#262A2C] rounded-full flex items-center justify-center mb-4 md:mb-6 group-hover:bg-[#2a2e30] transition-colors">
          <IconComponent className="w-6 md:w-8 h-6 md:h-8 text-white" />
        </div>
        <h3 className="text-white text-lg md:text-xl font-semibold mb-3 md:mb-4">{service.title}</h3>
        <p className="text-gray-300 text-sm leading-relaxed">{service.description}</p>
      </div>
    </div>
  )
}

// Team Member (sem fundo)
function TeamMember({ member }: { member: any }) {
  const IconComponent = member.icon
  return (
    <div className="flex flex-col items-center text-center group">
      <div className="relative mb-6">
        <div className="w-32 h-32 bg-[#262A2C] rounded-full overflow-hidden group-hover:scale-105 transition-transform duration-300">
          <Image
            src={member.avatar || "/placeholder-user.jpg"}
            alt={member.name}
            width={128}
            height={128}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#151313] rounded-full flex items-center justify-center border-2 border-[#262A2C]">
          <IconComponent className="w-4 h-4 text-white" />
        </div>
      </div>
      <h3 className="text-white text-lg font-semibold mb-2">{member.name}</h3>
      <p className="text-gray-300 text-sm mb-3">{member.role}</p>
      <p className="text-gray-400 text-xs max-w-[240px] leading-relaxed">{member.description}</p>
      <div className="flex gap-3 mt-4">
        <a
          href="#"
          className="w-8 h-8 bg-[#262A2C] rounded-full flex items-center justify-center hover:bg-[#2a2e30] transition-colors"
        >
          <Github className="w-4 h-4 text-white" />
        </a>
        <a
          href="#"
          className="w-8 h-8 bg-[#262A2C] rounded-full flex items-center justify-center hover:bg-[#2a2e30] transition-colors"
        >
          <Linkedin className="w-4 h-4 text-white" />
        </a>
      </div>
    </div>
  )
}
