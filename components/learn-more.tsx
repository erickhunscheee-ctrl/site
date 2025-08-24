"use client"

import Image from "next/image"

export function LearnMoreSection() {
  return (
    <section
      id="sobre-nos"
      className="relative z-10 px-4 md:px-16 py-8 md:py-16 max-w-[1920px] mx-auto"
      aria-labelledby="sobre-nos-title"
    >
      <h2 id="sobre-nos-title" className="text-2xl md:text-2xl font-bold text-white mb-4 text-center">
        SOBRE A MOUND
      </h2>

      <div className="max-w-[1000px] mx-auto">
        <article className="border-e-4 border-[#ca1515] hover:border-l-[#cfc8c8] bg-[#151313] rounded-r-[20px] p-8 hover:bg-[#1a1818] transition-colors group">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex -space-x-3">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src="/images/daniel.jpg"
                  alt="Daniel Hunsche"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-12 h-12 rounded-full overflow-hidden border-0">
                <Image
                  src="/images/eu.jpg"
                  alt="Erick Hunsche"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-white text-lg md:text-xl font-semibold mb-2">Construímos soluções sob medida</h3>
              <p className="text-gray-300 text-sm md:text-justify leading-relaxed">
                Somos a MOUND, uma empresa de software nascida em Roca Sales, focada em transformar ideias em realidade.
                Unimos estética, performance e estratégia para criar experiências que resolvem problemas reais.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-[#0f0f0f] border-s-4 border-[#cfc8c8] p-4">
                  <p className="text-white text-sm font-medium">Compromisso</p>
                  <p className="text-gray-400 text-xs mt-1">Qualidade de ponta a ponta, da primeira integração ao deploy.</p>
                </div>
                <div className="bg-[#0f0f0f] border-s-4 border-[#cfc8c8] p-4">
                  <p className="text-white text-sm font-medium">Parceria</p>
                  <p className="text-gray-400 text-xs mt-1">Trabalho lado a lado, comunicação clara e rápida.</p>
                </div>
                <div className="bg-[#0f0f0f] border-s-4 border-[#cfc8c8] p-4">
                  <p className="text-white text-sm font-medium">Comunicação</p>
                  <p className="text-gray-400 text-xs mt-1">Atendimento e suporte humanizado diretamente dos desenvolvedores com o cliente.</p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
