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

// const services = [
//   {
//     title: "Desenvolvimento",
//     description: "Sistemas sob medida como ERP’s, sites e controladores, criados para atender às necessidades específicas do seu negócio.",
//     icon: (props: any) => (
//       <Image src="/images/programacao-da-web.jpg" alt="Desenvolvimento" width={160} height={160} {...props} />
//     )
//   },
//   {
//     title: "Automação",
//     description: "Soluções inteligentes que otimizam tarefas e aumentam a eficiência no dia a dia da sua empresa.",
//     icon: (props: any) => (
//       <Image src="/images/automacao.png" alt="Desenvolvimento" width={40} height={40} {...props} />
//     )
//   },
//   {
//     title: "Integrações",
//     description: "Conectamos sistemas, plataformas e APIs para centralizar informações e melhorar seus processos.",
//     icon: (props: any) => (
//       <Image src="/images/computador.png" alt="Desenvolvimento" width={40} height={40} {...props} />
//     )
//   }
// ]

const team = [
  { name: "Daniel Hunsche", role: "Desenvolvedor", description: "Estudante de Engenharia de Software\nAtuação em desenvolvimento fullstack com Next.js, TypeScript, Java, PHP e Progress. Familiaridade com Figma, pipelines de deploy (CI/CD) e soluções baseadas em Inteligência Artificial.", icon: Github, avatar: "/images/daniel.jpg" },
  { name: "Erick Hunsche", role: "Desenvolvedor", description: "Estudante de Engenharia de Software\nAtuação em desenvolvimento fullstack com Next.js, TypeScript, Java, PHP e Progress. Familiaridade com Figma, pipelines de deploy (CI/CD) e soluções baseadas em Inteligência Artificial.", icon: Linkedin, avatar: "/images/eu.jpg" },
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
  const [navItemsVisible, setNavItemsVisible] = useState(false)
  const [logoClicked, setLogoClicked] = useState(false)


  const scrollTo = useCallback((ref: React.RefObject<HTMLElement | HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [])

  const sectionMax = "max-w-[1000px] mx-auto"

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  const toggleNavItems = () => {
    setLogoClicked(true)
    setNavItemsVisible(!navItemsVisible)
  }

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />
  }

  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-[400px] md:top-[800px] left-[50px] md:left-[100px] w-[300px] md:w-[1000px] h-[40px] md:h-[80px] bg-[rgba(99,98,97,0.5)] blur-[60px] md:blur-[125px] pointer-events-none"></div>

      {/* Header Navigation */}

      <section
        id="home"
        ref={homeRef}
        className="relative z-10 flex items-center justify-center px-4 md:px-16 py-16 md:py-32 -mt-0 md:-mt-0 max-w-[1920px] mx-auto min-h-[100vh] overflow-hidden"
        aria-labelledby="hero-title"
      >

        {/* Header fixo no topo */}
        <header className="absolute top-4 left-0 right-0 z-20 flex justify-center items-center px-4">
          <nav className="flex items-center gap-4 md:gap-16 text-sm md:text-lg">
            {/* Item Home - sempre visível no mobile */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault()
                scrollTo(homeRef)
              }}
              className={`text-white font-normal hover:opacity-80 transition-all duration-500 ease-in-out transform ${navItemsVisible
                ? 'opacity-100 translate-x-0 scale-100 sm:block'
                : 'opacity-0 -translate-x-4 scale-95 hidden'
                }`}
            >
              home
            </a>

            {/* Item Sobre - com transição suave */}
            <a
              href="#sobre-nos"
              onClick={(e) => {
                e.preventDefault()
                scrollTo(sobreRef)
              }}
              className={`text-white font-normal hover:opacity-80 transition-all duration-500 ease-in-out transform ${navItemsVisible
                ? 'opacity-100 translate-x-0 scale-100 sm:block'
                : 'opacity-0 -translate-x-4 scale-95 hidden'
                }`}
            >
              sobre nós
            </a>

            {/* Logo centralizado */}
            <button
              onClick={toggleNavItems}
              className="relative mx-4 md:mx-8 focus:outline-none group"
            >
              <Image
                src="/images/logo.png"
                alt="Logo MOUND"
                width={80}
                height={80}
                className={`
            relative z-10 md:w-[100px] md:h-[100px] object-contain
            transform transition-all duration-500 ease-out
            hover:scale-105 active:scale-95
            filter brightness-110 contrast-105
            ${logoClicked ? 'scale-110 rotate-12 brightness-125' : ''}
            animate-[breathe_2s_ease-in-out_infinite]
          `}
                style={{
                  animation: 'breathe 2s ease-in-out infinite'
                }}
                priority
              />

              {/* Definição da animação customizada */}
              <style jsx>{`
          @keyframes breathe {
            0%, 100% { 
              transform: scale(1);
            }
            50% { 
              transform: scale(1.1);
            }
          }
        `}</style>

              {/* Efeito de "respiração" no mobile */}
              <div className="md:hidden absolute inset-0 bg-white/5 rounded-full animate-pulse [animation-duration:2.5s]"></div>
            </button>

            {/* Item Desenvolvedores - com transição suave */}
            <a
              href="#desenvolvedores"
              onClick={(e) => {
                e.preventDefault()
                scrollTo(devsRef)
              }}
              className={`text-white font-normal hover:opacity-80 transition-all duration-500 ease-in-out transform ${navItemsVisible
                ? 'opacity-100 translate-x-0 scale-100 sm:block'
                : 'opacity-0 translate-x-4 scale-95 hidden'
                }`}
            >
              desenvolvedores
            </a>

            {/* Item Curiosidade - sempre visível */}
            <a
              href="#integracoes"
              onClick={(e) => {
                e.preventDefault()
                scrollTo(demosRef)
              }}
              className={`text-white font-normal hover:opacity-80 transition-all duration-500 ease-in-out transform ${navItemsVisible
                ? 'opacity-100 translate-x-0 scale-100 sm:block'
                : 'opacity-0 -translate-x-4 scale-95 hidden'
                }`}
            >
              curiosidade
            </a>
          </nav>
        </header>

        {/* Diagonal Gradient Background with White - Red Tones */}
        <div className="absolute inset-0">
          {/* White background base */}
          <div className="absolute inset-0 bg-black"></div>

          {/* Diagonal gradient section - Custom diagonal cut */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-red-500 via-pink-500 to-orange-500"
            style={{
              clipPath: 'polygon(0 0, 0 30%, 100% 70%, 100% 0)'
            }}
          ></div>

          {/* Additional gradient layer for depth */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-purple-600 via-red-600 to-pink-600 opacity-60"
            style={{
              clipPath: 'polygon(0 0, 0 30%, 100% 70%, 100% 0)'
            }}
          ></div>
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

            {/* Left Side - Text Content */}
            <div className="flex flex-col space-y-6 lg:space-y-8 text-left max-w-2xl">
              {/* Main Heading */}
              <h1
                id="hero-title"
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-white"
              >
                <span className="block">Escrevemos as</span>
                <span className="block">linhas que</span>
                <span className="block">nos ligam</span>
                <span className="block">ao futuro!</span>
              </h1>

              {/* Subtitle */}
              <p className="text-header">
                Conte-nos sua necessidade. Afinal, que sentido há em um mundo sem desafios?
                Somos uma empresa focada em desenvolver soluções personalizadas para suas necessidades.
              </p>

              {/* CTA Section */}
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <div className="flex items-center space-x-4 w-full sm:w-auto">
                  <input
                    type="email"
                    placeholder="E-mail"
                    className="flex-1 sm:w-64 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={() => scrollTo(demosRef)}
                    className="px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 whitespace-nowrap shadow-lg"
                    aria-label="Começar agora"
                  >
                    Começar agora →
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side - Image Only */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative">
                <Image
                  src="/images/hero-section.png"
                  alt="Figura futurista"
                  width={600}
                  height={400}
                  className="object-contain"
                  priority
                />
              </div>
            </div>

          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-purple-400/10 rounded-full blur-lg"></div>
      </section>

      {/* Discover More Section (Chat) */}
      <section
        className="relative z-10 px-4 md:px-16 -mt-40 md:-mt-24 py-8 md:py-16 max-w-[1920px] bg-black mx-auto"
        aria-labelledby="descubra-mais-title"
      >

        <h2 id="descubra-mais-title" className="text-white text-lg md:text-xl font-normal mb-6 md:mb-8 text-center">

        </h2>
        <div className="relative max-w-sm mx-auto py-8">
          <div className="text-center space-y-6">
            {/* Ícone flutuante */}
            <div className="relative inline-block">

              {/* <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full shadow-2xl animate-bounce">
                <Image
                  src="/images/robot-outline-in-a-circle-svgrepo-com.svg"
                  alt="IA"
                  width={80}
                  height={80}
                  className="object-contain"
                  style={{
                    animation: 'robotWave 6s ease-in-out infinite'
                  }}
                  priority
                />
              </div> */}
            </div>


          </div>
        </div>
        {/* Container Principal com Chat e Imagem */}
        <div className={`${sectionMax} grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8`}>

          {/* Coluna da Imagem/Conteúdo */}
          <div className="flex items-center justify-center p-6 lg:p-8">
            <div className="w-full max-w-md space-y-6">
              {/* Aqui você pode colocar sua imagem ou conteúdo */}              {/* Texto adicional opcional */}
              <div className="text-center space-y-3">
                <h3 className="text-white text-xl font-bold">
                  Chat controlado por IA.
                </h3>
                <p className="text-session-2">
                  Nosso assistente utiliza inteligência artificial de última geração para oferecer respostas precisas e personalizadas, além de trabalhar com contexto assim mantendo um padrão de respostas.
                </p>
                <button
                  onClick={() => window.open('https://wa.me/5551999999999?text=Olá! Quero conhecer o atendimento com IA', '_blank')}
                  className="inline-flex items-center gap-3 bg-green-500 hover:bg-red-600 text-white font-medium py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.485 3.485" />
                  </svg>
                  Conversar no WhatsApp
                </button>
              </div>
            </div>
          </div>

          {/* Coluna do Chat */}
          <div className="h-[600px] lg:h-[700px] rounded-[15px] lg:rounded-[20px] relative overflow-hidden flex flex-col">

            {/* Header do Chat
            <div className="w-full h-[60px] border-t-4 border-[#ca1515] hover:border-t-[#cfc8c8] rounded-t-[15px] lg:rounded-t-[20px] flex items-center px-4 lg:px-6 flex-shrink-0">
              <div className="flex items-center gap-2 lg:gap-3">
                <div className="w-2 lg:w-3 h-2 lg:h-3 bg-white rounded-full"></div>
                <span className="text-white text-xs lg:text-sm font-medium">MOUND Assistente</span>
                <span className="text-white text-xs hidden sm:block">Conectado via GROQ</span>
              </div>

            </div> */}

            {/* Área do Chat */}
            <div className="flex-1 p-3 lg:p-6 overflow-hidden">
              <MoundChat />
            </div>
          </div>

        </div>
        <img
          src="images/mao_robo.png"
          alt="Mão Robótica"
          className="mano-robo"
        />

      </section>

      {/* Serviços */}

      <div className="py-12 bg-gray-950 relative top-32">
        <h2 id="servicos-title">
          Oferecemos um portfólio completo e <br />
          integrado, organizado em duas divisões:<br />
          Automação de Software e Desenvolvimento de Software.
        </h2>
        <p>
          Cada empresa possui desafios únicos e, por isso,<br />
          adotamos uma abordagem personalizada para atender às suas<br />
          necessidades com inovação, eficiência e confiança.
        </p>
        <p>
          Conheça nossas soluções:
        </p>
      </div>

      <div className="py-40">
        <h2 className="h2-3">
          Automação de Software
        </h2>
        <p>
          Desenvolvemos rotinas sob medida que otimizam <br />
          processos e integram sistemas já existentes <br />
          para trazer mais agilidade ao seu negócio.
        </p>
        <button className="button-cards2">Saiba mais</button>
        <img src="images/800.jpg" width={600} height={200} alt="Automação de Software" className="img-services" />
      </div>

      <div className="py-12">

        <h2 className="h2-2">
          Desenvolvimento de Software
        </h2>
        <p className="p-2">
          Seja para web, desktop ou mobile, <br />
          entregamos soluções robustas que se moldam <br />
          às necessidades da sua empresa.
        </p>
        <button className="button-cards">Saiba mais</button>
        <img src="images/900.jpg" width={600} height={200} alt="Desenvolvimento de Software" className="img-services-2" />
      </div>

      <div className="div-cards-container">
        <div className="div-cards">
          <div className="content">
            <h3>ERP Hydra Control</h3>
            <p className="texto-card">
              Há um ano no mercado, o hydra atende hoje a lojas fisícas auxiliando no controle e gestão de toda parte logistica e financeira.
              Descubra como nossas soluções transformam comercios e empresas!
            </p>
            <button>Saiba mais</button>
          </div>

          <img src="images/700.jpg" width={600} height={200} alt="Descrição" className="overlay-image" />
        </div>
      </div>


      {/* Demonstrações de Integração (Stripe restaurado) */}
      <section
        id="integracoes"
        ref={demosRef}
        className="relative z-10 px-4 md:px-12 py-8 md:py-16 max-w-[1920px] mx-auto"
        aria-labelledby="integracoes-title"
      >
        <div className="py-14"></div>
        <p>
          São apenas demonstrações prototipadas.
        </p>
        <h1 className="h2-demonstracoes">
          Descubra o que a <b>MOUND</b> pode fazer por você:
        </h1>
        <p className="texto-card2">
          Explore nossas demonstrações práticas e gratuitas e veja na prática como as soluções da MOUND
          simplificam processos, aumentam a eficiência e impulsionam resultados em sua empresa.
        </p>

        <div className="button-container">
          <button
            onClick={() => {
              alert("Sessão em desenvolvimento :)");
              // const demonst = document.getElementById("demonstracoes");
              // if (demonst) {
              //   if (demonst.classList.contains("hidden")) {
              //     demonst.classList.remove("hidden");
              //   } else {
              //     demonst.classList.add("hidden");
              //   }
              // }
            }
            }>

            Mostrar demonstracoes
          </button>
        </div>

        <div id="demonstracoes" className={`${sectionMax} hidden`}>

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

      <section ref={portalRef}>
        <PortalEmpresa />
      </section>
      <section className="secao-segmentos">
        <div className="segmentos-texto">
          <h4>Segmentos</h4>
          <h2>Presentes nos mercados</h2>
          <p>
            Com soluções integradas e personalizadas, acompanhamos sua evolução em direção ao Futuro,
            impulsionando a produtividade e eficiência do seu negócio, enquanto reduzimos custos e tempo
            de produção, resultando em maior competitividade.
          </p>
        </div>

        <div className="segmentos-cards">
          <div className="card-segmento">
            <i className="fas fa-tractor"></i>
            <h3>Agronegócio</h3>
          </div>
          <div className="card-segmento">
            <i className="fas fa-utensils"></i>
            <h3>Alimentos e bebidas</h3>
          </div>
          <div className="card-segmento">
            <i className="fas fa-box"></i>
            <h3>Bens de consumo</h3>
          </div>
          <div className="card-segmento">
            <i className="fas fa-project-diagram"></i>
            <h3>Bens Intermediários</h3>
          </div>
          <div className="card-segmento">
            <i className="fas fa-pills"></i>
            <h3>Farmacêutica</h3>
          </div>
          <div className="card-segmento">
            <i className="fas fa-cogs"></i>
            <h3>Metalmecânica</h3>
          </div>
          <div className="card-segmento">
            <i className="fas fa-store"></i>
            <h3>Varejo</h3>
          </div>
        </div>
      </section>



      {/* Desenvolvedores (sem fundo nos cards) */}
      {/* <section
        id="desenvolvedores"
        ref={devsRef}
        className="relative z-10 px-4 md:px-16 py-8 md:py-16 max-w-[1920px] mx-auto"
        aria-labelledby="devs-title"
      >
        <h2 id="devs-title" className="text-white text-lg md:text-2x1 font-bold mb-6 md:mb-8 text-center">
          NOSSA EQUIPE
        </h2>
        <p className="text-gray-300 text-sm md:text-sm text-center mb-8 md:mb-12 max-w-[600px] mx-auto px-4">
          Conheça os desenvolvedores por trás da MOUND, profissionais dedicados em criar soluções inovadoras.
        </p>

        <div className={`${sectionMax} flex justify-center gap-16 flex-wrap`}>
          {team.map((member, index) => (
            <TeamMember key={index} member={member} />
          ))}
        </div>
      </section> */}

      {/* Sobre nós (logo após desenvolvedores)
      <div ref={sobreRef}>
        <LearnMoreSection />
      </div> */}

      {/* <section ref={avaliacoesRef}>
        <AvaliacoesSection />
      </section> */}

      {/* <ApiIntegrations /> */}

      {/* Faixa de integrações (logos) */}
      {/* <section className="relative z-10 px-16 pt-16 pb-0 max-w-[1920px] mx-auto">
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
      </section> */}

      {/* Footer */}
      <footer className="relative z-10 w-full h-[200] bg-[#08090A] flex items-center justify-center">
        <p className="text-white text-sm font-normal">Uma criação MOUND © 2025</p>
      </footer>
    </div >
  )
}

// Service Card
// function ServiceCard({ service }: { service: any }) {

//   const IconComponent = service.icon
//   return (
//     <div className="bg-transparent border-0 border-[#ca1515] rounded-[15px] md:rounded-[20px] p-6 md:p-8 hover:bg-[#cfc8c8]/50 transition-colors group">

//       <div className="flex flex-col items-center text-center">
//         <div className="w-12 md:w-16 h-12 md:h-16 rounded-full flex items-center justify-center mb-4 md:mb-6  transition-colors">
//           <IconComponent className="w-6 md:w-16 h-6 md:h-16 text-white" />
//         </div>
//         <h3 className="text-white text-lg md:text-xl font-semibold mb-3 md:mb-4">{service.title}</h3>
//         <p className="text-gray-300 text-sm leading-relaxed">{service.description}</p>
//       </div>
//     </div>
//   )
// }

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
