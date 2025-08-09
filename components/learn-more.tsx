"use client"

import Image from "next/image"

export function LearnMoreSection() {
  return (
    <section
      id="sobre-nos"
      className="relative z-10 px-4 md:px-16 py-8 md:py-16 max-w-[1920px] mx-auto"
      aria-labelledby="sobre-nos-title"
    >
      <h2 id="sobre-nos-title" className="text-white text-xl md:text-2xl font-normal mb-6 md:mb-8 text-center">
        Sobre nós
      </h2>

      <div className="max-w-[1000px] mx-auto">
        <article className="bg-[#151313] border border-[#262A2C] rounded-[20px] p-6 md:p-10 hover:bg-[#1a1818] transition-colors">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex -space-x-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-[#262A2C]">
                <Image
                  src="/placeholder-user.jpg"
                  alt="Daniel Hunsche"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-12 h-12 rounded-full overflow-hidden border border-[#262A2C]">
                <Image
                  src="/placeholder-user.jpg"
                  alt="Erick Hunsche"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-white text-lg md:text-xl font-semibold mb-2">Construímos soluções sob medida</h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                Somos a MOUND, um estúdio de software focado em transformar ideias em produtos digitais de alto impacto.
                Unimos estética, performance e estratégia para criar experiências que resolvem problemas reais.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-[#0f0f0f] border border-[#262A2C] rounded-xl p-4">
                  <p className="text-white text-sm font-medium">Compromisso</p>
                  <p className="text-gray-400 text-xs mt-1">Qualidade de ponta a ponta, do briefing ao deploy.</p>
                </div>
                <div className="bg-[#0f0f0f] border border-[#262A2C] rounded-xl p-4">
                  <p className="text-white text-sm font-medium">Parceria</p>
                  <p className="text-gray-400 text-xs mt-1">Trabalho lado a lado, comunicação clara e rápida.</p>
                </div>
                <div className="bg-[#0f0f0f] border border-[#262A2C] rounded-xl p-4">
                  <p className="text-white text-sm font-medium">Evolução</p>
                  <p className="text-gray-400 text-xs mt-1">Melhorias contínuas com base em dados e feedback.</p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
