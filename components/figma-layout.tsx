"use client"

import Image from "next/image"
import { MoundChat } from "@/components/mound-chat"
import { Github, Zap, Network } from "lucide-react"

export function FigmaLayout() {
  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-[800px] left-[150px] w-[1300px] h-[100px] bg-[rgba(242,201,76,0.5)] blur-[125px] pointer-events-none"></div>
      

      {/* Header Navigation */}
      <header className="relative z-10 flex justify-center items-center pt-8 pb-4">
        <nav className="flex gap-16">
          <a
            href="#"
            className="text-white text-[25.4px] font-normal leading-[40px] hover:opacity-80 transition-opacity"
          >
            home
          </a>
          <a
            href="#"
            className="text-white text-[25.4px] font-normal leading-[40px] hover:opacity-80 transition-opacity"
          >
            saiba mais
          </a>
          <a
            href="#"
            className="text-white text-[25.4px] font-normal leading-[40px] hover:opacity-80 transition-opacity"
          >
            desenvolvedores
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 flex items-center justify-between px-16 py-20 max-w-[1920px] mx-auto">
        {/* Left Image */}
        <div className="relative flex-shrink-0 w-full h-full">
          <Image
            src="/images/hero-figure.png"
            alt="Futuristic Figure"
            width={800}
            height={800}
            className="absolute left-[-350px] bottom-[-450px] object-contain"
            priority
          />
        </div>

        {/* Right Content */}
        <div className="flex flex-col items-center justify-center max-w-[600px] ml-auto">
          {/* MOUND Logo */}
          <div className="w-full flex items-center justify-center mb-8">
            <h1 className="text-white text-8xl font-bold tracking-tight">MOUND</h1>
          </div>

          {/* Description */}
          <p className="text-white text-[32px] font-normal leading-[39px] mb-12 text-center max-w-[448px]">
            empresa de desenvolvimento de software, com soluções para todas as áreas envolvidas.
          </p>

          {/* Buttons */}
          <div className="flex gap-6 justify-center">
            <button className="flex justify-center items-center w-[271px] h-[77px] bg-[#262A2C] rounded-[30px] hover:bg-[#2a2e30] transition-colors">
              <span className="text-white text-[25.4px] font-normal leading-[40px]">SAIBA MAIS</span>
            </button>
            <button className="flex justify-center items-center w-[271px] h-[77px] border border-[#262A2C] rounded-[30px] hover:bg-[#262A2C] transition-colors">
              <span className="text-white text-[25.4px] font-normal leading-[40px]">CONTATO</span>
            </button>
          </div>
        </div>
      </section>

      {/* Discover More Section */}
      <section className="relative z-10 px-72 py-16 max-w-[1920px] mx-auto">
        <h2 className="text-white text-[25.4px] font-normal leading-[40px] mb-8">Descubra mais sobre nós</h2>

        {/* Chat Container */}
        <div className="w-full max-w-[1277px] h-[321px] bg-[#151313] rounded-[20px] relative overflow-hidden">
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

      {/* Integrations Section */}
      <section className="relative z-10 px-1 py-1 max-w-[1920px] mx-auto">
        <h2 className="text-white text-[25.4px] font-normal leading-[40px] mb-8 text-center">Nossas integrações</h2>

        <div className="w-full h-[97px] bg-[#08090A] flex justify-center items-center gap-16 rounded-lg">
          {/* GitHub */}
          <div className="flex flex-col items-center group cursor-pointer">
            <Github className="w-[49.68px] h-[48.42px] text-white mb-2 group-hover:text-gray-300 transition-colors" />
            <span className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">GitHub</span>
          </div>

          {/* Groq */}
          <div className="flex flex-col items-center group cursor-pointer">
            <Zap className="w-[49.68px] h-[48.42px] text-white mb-2 group-hover:text-gray-300 transition-colors" />
            <span className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">Groq</span>
          </div>

          {/* n8n */}
          <div className="flex flex-col items-center group cursor-pointer">
            <Network className="w-[49.68px] h-[48.42px] text-white mb-2 group-hover:text-gray-300 transition-colors" />
            <span className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">n8n</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 w-full h-[202px] bg-[#08090A] flex items-center justify-center">
        <p className="text-white text-[16px] font-normal leading-[40px]">Uma criação MOUND © 2025</p>
      </footer>
    </div>
  )
}