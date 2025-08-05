"use client"

import Image from "next/image"
import { MoundChat } from "@/components/mound-chat"
import { WhatsAppIntegration } from "@/components/whatsapp-integration"
import { PixIntegration } from "@/components/pix-integration"
import { Github, Zap, Network, Code, Smartphone, Globe, Linkedin } from "lucide-react"

export function FigmaLayout() {
  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-[800px] left-[150px] w-[1300px] h-[100px] bg-[rgba(242,201,76,0.5)] blur-[125px] pointer-events-none"></div>

      {/* Header Navigation */}
      <header className="relative z-10 flex justify-center items-center pt-8 pb-4">
        <nav className="flex gap-16">
          <a href="#" className="text-white text-lg font-normal hover:opacity-80 transition-opacity">
            home
          </a>
          <a href="#" className="text-white text-lg font-normal hover:opacity-80 transition-opacity">
            saiba mais
          </a>
          <a href="#" className="text-white text-lg font-normal hover:opacity-80 transition-opacity">
            desenvolvedores
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 flex items-center justify-center px-16 py-32 max-w-[1920px] mx-auto min-h-[80vh]">
        {/* Background Image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/images/hero-figure.png"
            alt="Futuristic Figure"
            width={600}
            height={600}
            className="object-contain opacity-30"
            priority
          />
        </div>

        {/* Centered Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-[800px]">
          {/* MOUND Logo */}
          <div className="mb-8">
            <h1 className="text-white text-6xl font-bold tracking-tight">MOUND</h1>
          </div>

          {/* Description */}
          <p className="text-white text-xl font-normal leading-relaxed mb-12 max-w-[600px]">
            empresa de desenvolvimento de software, com soluções para todas as áreas envolvidas.
          </p>

          {/* Buttons */}
          <div className="flex gap-6 justify-center">
            <button className="flex justify-center items-center px-8 py-4 bg-[#262A2C] rounded-[30px] hover:bg-[#2a2e30] transition-colors">
              <span className="text-white text-lg font-normal">SAIBA MAIS</span>
            </button>
            <button className="flex justify-center items-center px-8 py-4 border border-[#262A2C] rounded-[30px] hover:bg-[#262A2C] transition-colors">
              <span className="text-white text-lg font-normal">CONTATO</span>
            </button>
          </div>
        </div>
      </section>

      {/* Discover More Section */}
      <section className="relative z-10 px-16 py-16 max-w-[1920px] mx-auto">
        <h2 className="text-white text-2xl font-normal mb-8 text-center">Descubra mais sobre nós</h2>

        {/* Chat Container */}
        <div className="w-full max-w-[1277px] h-[321px] bg-[#151313] rounded-[20px] relative overflow-hidden mx-auto">
          <div className="w-full h-[88px] bg-[#1C1B1B] rounded-t-[20px] flex items-center px-6">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-white text-sm font-medium">MOUND Assistant</span>
              <span className="text-green-400 text-xs">Conectado via GROQ</span>
            </div>
          </div>
          <div className="p-6 h-[calc(321px-88px)] overflow-hidden">
            <MoundChat />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative z-10 px-16 py-16 max-w-[1920px] mx-auto">
        <h2 className="text-white text-2xl font-normal mb-12 text-center">Nossos Serviços</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
          {/* Web Development Card */}
          <div className="bg-[#151313] rounded-[20px] p-8 hover:bg-[#1a1818] transition-colors group">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#262A2C] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#2a2e30] transition-colors">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white text-xl font-semibold mb-4">Desenvolvimento Web</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Criamos sites e aplicações web modernas, responsivas e otimizadas para performance.
              </p>
            </div>
          </div>

          {/* Mobile Development Card */}
          <div className="bg-[#151313] rounded-[20px] p-8 hover:bg-[#1a1818] transition-colors group">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#262A2C] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#2a2e30] transition-colors">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white text-xl font-semibold mb-4">Desenvolvimento Mobile</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Desenvolvemos aplicativos nativos e híbridos para iOS e Android com foco na experiência do usuário.
              </p>
            </div>
          </div>

          {/* Custom Solutions Card */}
          <div className="bg-[#151313] rounded-[20px] p-8 hover:bg-[#1a1818] transition-colors group">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#262A2C] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#2a2e30] transition-colors">
                <Code className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white text-xl font-semibold mb-4">Soluções Personalizadas</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Desenvolvemos sistemas sob medida para atender às necessidades específicas do seu negócio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations Demo Section */}
      <section className="relative z-10 px-16 py-16 max-w-[1920px] mx-auto">
        <h2 className="text-white text-2xl font-normal mb-8 text-center">Demonstrações de Integração</h2>
        <p className="text-gray-300 text-lg text-center mb-12 max-w-[600px] mx-auto">
          Experimente nossas integrações em tempo real e veja como podemos facilitar seus processos.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1000px] mx-auto">
          {/* WhatsApp Integration Card */}
          <WhatsAppIntegration />

          {/* PIX Integration Card */}
          <PixIntegration />
        </div>
      </section>

      {/* Developers Section */}
      <section className="relative z-10 px-16 py-16 max-w-[1920px] mx-auto">
        <h2 className="text-white text-2xl font-normal mb-8 text-center">Nossa Equipe</h2>
        <p className="text-gray-300 text-lg text-center mb-12 max-w-[600px] mx-auto">
          Conheça os desenvolvedores por trás da MOUND, profissionais dedicados em criar soluções inovadoras.
        </p>

        <div className="flex justify-center gap-16 max-w-[800px] mx-auto">
          {/* Developer 1 */}
          <div className="flex flex-col items-center text-center group">
            <div className="relative mb-6">
              <div className="w-32 h-32 bg-[#262A2C] rounded-full overflow-hidden group-hover:scale-105 transition-transform duration-300">
                <Image
                  src="/placeholder-user.jpg"
                  alt="Desenvolvedor 1"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#151313] rounded-full flex items-center justify-center border-2 border-[#262A2C]">
                <Github className="w-4 h-4 text-white" />
              </div>
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">Daniel Hunsche</h3>
            <p className="text-gray-300 text-sm mb-3">Full Stack Developer</p>
            <p className="text-gray-400 text-xs max-w-[200px] leading-relaxed">
              Em desenvolvimento.
            </p>
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

          {/* Developer 2 */}
          <div className="flex flex-col items-center text-center group">
            <div className="relative mb-6">
              <div className="w-32 h-32 bg-[#262A2C] rounded-full overflow-hidden group-hover:scale-105 transition-transform duration-300">
                <Image
                  src="/placeholder-user.jpg"
                  alt="Desenvolvedor 2"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#151313] rounded-full flex items-center justify-center border-2 border-[#262A2C]">
                <Code className="w-4 h-4 text-white" />
              </div>
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">Erick Hunsche</h3>
            <p className="text-gray-300 text-sm mb-3">Mobile Developer</p>
            <p className="text-gray-400 text-xs max-w-[200px] leading-relaxed">
              Em desenvolvimento.
            </p>
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
        </div>
      </section>

      {/* Integrations Section */}
      <section className="relative z-10 px-16 pt-16 pb-0 max-w-[1920px] mx-auto">
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
      </section>

      {/* Footer */}
      <footer className="relative z-10 w-full h-[200] bg-[#08090A] flex items-center justify-center">
        <p className="text-white text-sm font-normal">Uma criação MOUND © 2025</p>
      </footer>
    </div>
  )
}
