"use client"

import { useState } from "react"
import Image from "next/image"
import { MoundChat } from "@/components/mound-chat"
import { WhatsAppIntegration } from "@/components/whatsapp-integration"
import { PixIntegration } from "@/components/pix-integration"
import { Github, Zap, Network, Code, Smartphone, Globe, Linkedin, ChevronLeft, ChevronRight } from "lucide-react"

export function FigmaLayout() {
  const [currentServicePage, setCurrentServicePage] = useState(0)
  const [currentIntegrationPage, setCurrentIntegrationPage] = useState(0)
  const [currentTeamPage, setCurrentTeamPage] = useState(0)

  const services = [
    {
      icon: Globe,
      title: "Desenvolvimento Web",
      description: "Criamos sites e aplicações web modernas, responsivas e otimizadas para performance."
    },
    {
      icon: Smartphone,
      title: "Desenvolvimento Mobile",
      description: "Desenvolvemos aplicativos nativos e híbridos para iOS e Android com foco na experiência do usuário."
    },
    {
      icon: Code,
      title: "Soluções Personalizadas",
      description: "Desenvolvemos sistemas sob medida para atender às necessidades específicas do seu negócio."
    }
  ]

  const team = [
    {
      name: "Daniel Hunsche",
      role: "Full Stack Developer",
      description: "Em desenvolvimento.",
      avatar: "/placeholder-user.jpg",
      icon: Github
    },
    {
      name: "Erick Hunsche",
      role: "Mobile Developer",
      description: "Em desenvolvimento.",
      avatar: "/placeholder-user.jpg",
      icon: Code
    }
  ]

  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-[400px] md:top-[800px] left-[50px] md:left-[100px] w-[300px] md:w-[1000px] h-[40px] md:h-[80px] bg-[rgba(99,98,97,0.5)] blur-[60px] md:blur-[125px] pointer-events-none"></div>

      {/* Header Navigation */}
      <header className="relative z-10 flex justify-center items-center pt-4 md:pt-8 pb-2 md:pb-4 px-4">
        <nav className="flex items-center gap-4 md:gap-16 text-sm md:text-lg">
          {/* Primeiros 2 links */}
          <a href="#" className="text-white font-normal hover:opacity-80 transition-opacity">
            home
          </a>
          <a href="#" className="text-white font-normal hover:opacity-80 transition-opacity hidden sm:block">
            saiba mais
          </a>

          {/* Logo centralizado */}
          <div className="mx-4 md:mx-8">
            <Image
              src="/images/logo.png"
              alt="Futuristic Figure"
              width={60}
              height={60}
              className="md:w-[100px] md:h-[100px] object-contain"
              priority
            />
          </div>

          {/* Últimos 2 links */}
          <a href="#" className="text-white font-normal hover:opacity-80 transition-opacity hidden sm:block">
            desenvolvedores
          </a>
          <a href="#" className="text-white font-normal hover:opacity-80 transition-opacity">
            teste
          </a>
        </nav>

      </header>
      {/* Hero Section */}
      <section className="relative z-10 flex items-center justify-center px-16 py-32 max-w-[1920px] mx-auto min-h-[80vh]">
        {/* Background Image */}
        <div className="absolute top-12 inset-0 flex items-center justify-center">
          <Image
            src="/images/hero-section.png"
            alt="Futuristic Figure"
            width={1000}
            height={300}
            className="object-contain opacity-70"
            priority
          />
        </div>



        <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-[800px] -mt-48 md:-mt-96">
          {/* Title */}
          <div className="mb-4 md:mb-6">
            <h1 className="text-white text-xl md:text-3xl font-bold -tracking-wide leading-tight">
              Conte-nos sua necessidade.<br />
              Afinal, que sentido há em um mundo sem desafios?
            </h1>
          </div>

          {/* Description */}
          <p className="text-white text-sm md:text-xl font-light leading-relaxed mb-6 md:mb-8 max-w-[600px] px-4">
            somos uma empresa focada em desenvolver soluções personalizadas, para suas necessidades.
          </p>

          {/* Buttons */}
          <div className="flex gap-6 justify-center">
            <button className="flex justify-center items-center px-8 md:px-12 py-2 md:py-3 bg-[#ffffff] rounded-[30px] hover:bg-[#ffffff] transition-colors">
              <span className="text-[#262A2C] text-xs md:text-sm font-semibold">CURIOSIDADE</span>
            </button>
          </div>
        </div>
      </section>

      {/* Discover More Section */}
      <section className="relative z-10 px-4 md:px-16 py-8 md:py-16 max-w-[1920px] mx-auto">
        <h2 className="text-white text-xl md:text-2xl font-normal mb-6 md:mb-8 text-center">Descubra mais sobre nós</h2>

        {/* Chat Container - Mobile Optimized */}
        <div className="w-full max-w-[1277px] h-[300px] md:h-[380px] bg-[#151313] rounded-[15px] md:rounded-[20px] relative overflow-hidden mx-auto">
          <div className="w-full h-[60px] md:h-[88px] bg-[#1C1B1B] rounded-t-[15px] md:rounded-t-[20px] flex items-center px-4 md:px-6">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-2 md:w-3 h-2 md:h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-white text-xs md:text-sm font-medium">MOUND Assistant</span>
              <span className="text-green-400 text-xs hidden sm:block">Conectado via GROQ</span>
            </div>
          </div>
          <div className="p-3 md:p-6 h-[calc(300px-60px)] md:h-[calc(380px-88px)] overflow-hidden">
            <MoundChat />
          </div>
        </div>
      </section>

      {/* Services Section with Pagination */}
      <section className="relative z-10 px-4 md:px-16 py-8 md:py-16 max-w-[1920px] mx-auto">
        <h2 className="text-white text-xl md:text-2xl font-normal mb-8 md:mb-12 text-center">Nossos Serviços</h2>

        {/* Mobile: Show one card at a time, Desktop: Show all */}
        <div className="max-w-[1200px] mx-auto">
          {/* Desktop View */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>

          {/* Mobile View with Pagination */}
          <div className="block md:hidden">
            <div className="relative">
              <ServiceCard service={services[currentServicePage]} />

              {/* Pagination Controls */}
              <div className="flex justify-center items-center mt-6 gap-4">
                <button
                  onClick={() => setCurrentServicePage(prev => prev > 0 ? prev - 1 : services.length - 1)}
                  className="w-10 h-10 bg-[#262A2C] rounded-full flex items-center justify-center hover:bg-[#2a2e30] transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>

                <div className="flex gap-2">
                  {services.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${index === currentServicePage ? 'bg-white' : 'bg-gray-600'
                        }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setCurrentServicePage(prev => prev < services.length - 1 ? prev + 1 : 0)}
                  className="w-10 h-10 bg-[#262A2C] rounded-full flex items-center justify-center hover:bg-[#2a2e30] transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations Demo Section with Pagination */}
      <section className="relative z-10 px-4 md:px-16 py-8 md:py-16 max-w-[1920px] mx-auto">
        <h2 className="text-white text-xl md:text-2xl font-normal mb-6 md:mb-8 text-center">Demonstrações de Integração</h2>
        <p className="text-gray-300 text-sm md:text-lg text-center mb-8 md:mb-12 max-w-[600px] mx-auto px-4">
          Experimente nossas integrações em tempo real e veja como podemos facilitar seus processos.
        </p>

        <div className="max-w-[1000px] mx-auto">
          {/* Desktop View */}
          <div className="hidden md:grid md:grid-cols-2 gap-8">
            <WhatsAppIntegration />
            <PixIntegration />
          </div>

          {/* Mobile View with Pagination */}
          <div className="block md:hidden">
            <div className="relative">
              {currentIntegrationPage === 0 ? <WhatsAppIntegration /> : <PixIntegration />}

              {/* Pagination Controls */}
              <div className="flex justify-center items-center mt-6 gap-4">
                <button
                  onClick={() => setCurrentIntegrationPage(prev => prev === 0 ? 1 : 0)}
                  className="w-10 h-10 bg-[#262A2C] rounded-full flex items-center justify-center hover:bg-[#2a2e30] transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>

                <div className="flex gap-2">
                  {[0, 1].map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${index === currentIntegrationPage ? 'bg-white' : 'bg-gray-600'
                        }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setCurrentIntegrationPage(prev => prev === 0 ? 1 : 0)}
                  className="w-10 h-10 bg-[#262A2C] rounded-full flex items-center justify-center hover:bg-[#2a2e30] transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Developers Section with Pagination */}
      <section className="relative z-10 px-4 md:px-16 py-8 md:py-16 max-w-[1920px] mx-auto">
        <h2 className="text-white text-xl md:text-2xl font-normal mb-6 md:mb-8 text-center">Nossa Equipe</h2>
        <p className="text-gray-300 text-sm md:text-lg text-center mb-8 md:mb-12 max-w-[600px] mx-auto px-4">
          Conheça os desenvolvedores por trás da MOUND, profissionais dedicados em criar soluções inovadoras.
        </p>

        <div className="max-w-[800px] mx-auto">
          {/* Desktop View */}
          <div className="hidden md:flex justify-center gap-16">
            {team.map((member, index) => (
              <TeamMember key={index} member={member} />
            ))}
          </div>

          {/* Mobile View with Pagination */}
          <div className="block md:hidden">
            <div className="relative flex justify-center">
              <TeamMember member={team[currentTeamPage]} />

              {/* Pagination Controls */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
                <button
                  onClick={() => setCurrentTeamPage(prev => prev === 0 ? 1 : 0)}
                  className="w-10 h-10 bg-[#262A2C] rounded-full flex items-center justify-center hover:bg-[#2a2e30] transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>

                <div className="flex gap-2">
                  {[0, 1].map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${index === currentTeamPage ? 'bg-white' : 'bg-gray-600'
                        }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setCurrentTeamPage(prev => prev === 0 ? 1 : 0)}
                  className="w-10 h-10 bg-[#262A2C] rounded-full flex items-center justify-center hover:bg-[#2a2e30] transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      < section className="relative z-10 px-16 pt-16 pb-0 max-w-[1920px] mx-auto" >
        <h2 className="text-white text-sm font-normal mb-8 text-center">Nossas integrações</h2>

        <div className="w-full h-[97px] bg-[#08090A] flex justify-center items-center gap-16 rounded-lg">
          {/* GitHub */}
          <div className="flex flex-col items-center group cursor-pointer">
            <Github className="w-12 h-12 text-white group-hover:text-gray-300 transition-colors" />
            <span className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">GitHub</span>
          </div>

          {/* Groq */}
          <div className="flex flex-col items-center group cursor-pointer">
            <Zap className="w-12 h-12 text-white mb-2 group-hover:text-gray-300 transition-colors" />
            <span className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">Groq</span>
          </div>

          {/* n8n */}
          <div className="flex flex-col items-center group cursor-pointer">
            <Network className="w-12 h-12 text-white mb-2 group-hover:text-gray-300 transition-colors" />
            <span className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">n8n</span>
          </div>
        </div>
      </section >

      {/* Footer */}
      < footer className="relative z-10 w-full h-[200] bg-[#08090A] flex items-center justify-center" >
        <p className="text-white text-sm font-normal">Uma criação MOUND © 2025</p>
      </footer >
    </div >
  )
}

// Service Card Component
function ServiceCard({ service }: { service: any }) {
  const IconComponent = service.icon
  return (
    <div className="bg-[#151313] rounded-[15px] md:rounded-[20px] p-6 md:p-8 hover:bg-[#1a1818] transition-colors group">
      <div className="flex flex-col items-center text-center">
        <div className="w-12 md:w-16 h-12 md:h-16 bg-[#262A2C] rounded-full flex items-center justify-center mb-4 md:mb-6 group-hover:bg-[#2a2e30] transition-colors">
          <IconComponent className="w-6 md:w-8 h-6 md:h-8 text-white" />
        </div>
        <h3 className="text-white text-lg md:text-xl font-semibold mb-3 md:mb-4">{service.title}</h3>
        <p className="text-gray-300 text-sm leading-relaxed">
          {service.description}
        </p>
      </div>
    </div>
  )
}

// Team Member Component
function TeamMember({ member }: { member: any }) {
  const IconComponent = member.icon
  return (
    <div className="flex flex-col items-center text-center group">
      <div className="relative mb-4 md:mb-6">
        <div className="w-24 md:w-32 h-24 md:h-32 bg-[#262A2C] rounded-full overflow-hidden group-hover:scale-105 transition-transform duration-300">
          <Image
            src={member.avatar}
            alt={member.name}
            width={128}
            height={128}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -bottom-1 md:-bottom-2 -right-1 md:-right-2 w-6 md:w-8 h-6 md:h-8 bg-[#151313] rounded-full flex items-center justify-center border-2 border-[#262A2C]">
          <IconComponent className="w-3 md:w-4 h-3 md:h-4 text-white" />
        </div>
      </div>
      <h3 className="text-white text-base md:text-lg font-semibold mb-1 md:mb-2">{member.name}</h3>
      <p className="text-gray-300 text-sm mb-2 md:mb-3">{member.role}</p>
      <p className="text-gray-400 text-xs max-w-[200px] leading-relaxed mb-3">
        {member.description}
      </p>
      <div className="flex gap-3 mt-2 md:mt-4">
        <a
          href="#"
          className="w-6 md:w-8 h-6 md:h-8 bg-[#262A2C] rounded-full flex items-center justify-center hover:bg-[#2a2e30] transition-colors"
        >
          <Github className="w-3 md:w-4 h-3 md:h-4 text-white" />
        </a>
        <a
          href="#"
          className="w-6 md:w-8 h-6 md:h-8 bg-[#262A2C] rounded-full flex items-center justify-center hover:bg-[#2a2e30] transition-colors"
        >
          <Linkedin className="w-3 md:w-4 h-3 md:h-4 text-white" />
        </a>
      </div>
    </div>
  )
}