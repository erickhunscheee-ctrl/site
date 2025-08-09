"use client"

import { Users, Building2 } from "lucide-react"

export function LearnMoreSection() {
  return (
    <section
      id="saiba-mais"
      className="relative z-10 px-4 md:px-16 py-8 md:py-16 max-w-[1920px] mx-auto"
      aria-labelledby="saiba-mais-title"
    >
      <h2 id="saiba-mais-title" className="text-white text-xl md:text-2xl font-normal mb-6 md:mb-8 text-center">
        Saiba Mais
      </h2>

      <article className="max-w-[1000px] mx-auto bg-[#151313] border border-[#262A2C] rounded-[15px] md:rounded-[20px] p-6 md:p-8 hover:bg-[#1a1818] transition-colors">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
          <div className="flex gap-3">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-[#262A2C] rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 md:w-7 md:h-7 text-white" />
            </div>
            <div className="w-12 h-12 md:w-14 md:h-14 bg-[#262A2C] rounded-full hidden md:flex items-center justify-center">
              <Building2 className="w-6 h-6 md:w-7 md:h-7 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-white text-lg md:text-xl font-semibold mb-3">Quem somos por trás do código</h3>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Somos pessoas curiosas, que acreditam em propósito e colaboração. A MOUND nasceu da vontade de transformar
              ideias em produtos reais, com cuidado, transparência e evolução contínua. Valorizamos conversas francas,
              feedbacks rápidos e a construção conjunta com nossos clientes.
            </p>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed mt-4">
              Gostamos de resolver problemas difíceis com soluções simples, usar tecnologia de ponta quando faz sentido
              e manter o foco na experiência de quem usa. Estamos baseados em Roca Sales e atuamos de forma remota.
            </p>
          </div>
        </div>
      </article>
    </section>
  )
}
