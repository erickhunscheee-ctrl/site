"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import TransitionLink from "./transition-link"

const projects = [
  {
    title: "Websites Personalizados",
    description:
      "Sites modernos, responsivos e otimizados para conversão, desenvolvidos com as mais recentes tecnologias.",
    imgSrc: "/images/project-cyberscape.png",
    href: "/portfolio/websites",
    icon: "🌐",
  },
  {
    title: "Sistemas ERP",
    description: "Soluções completas de gestão empresarial integradas e personalizadas para cada tipo de negócio.",
    imgSrc: "/images/ethereal-threads.png",
    href: "/portfolio/erp-systems",
    icon: "💼",
  },
  {
    title: "Automações com IA",
    description:
      "Implementação de inteligência artificial para automatizar processos e aumentar a eficiência operacional.",
    imgSrc: "/images/quantum-leap.png",
    href: "/portfolio/ai-automation",
    icon: "🤖",
  },
]

export function Portfolio() {
  return (
    <div id="portfolio" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Nossos Serviços</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-neutral-400">
          Soluções digitais personalizadas desenvolvidas em Roca Sales - RS para transformar seu negócio.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <TransitionLink href={project.href}>
              <div className="group relative block w-full h-[450px] overflow-hidden rounded-lg shadow-lg bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700">
                {/* Icon overlay */}
                <div className="absolute top-6 left-6 text-4xl z-10">{project.icon}</div>

                {/* Background image with overlay */}
                <div className="absolute inset-0">
                  <Image
                    src={project.imgSrc || "/placeholder.svg"}
                    fill
                    alt={project.title}
                    className="w-full h-full object-cover opacity-30 transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 opacity-90 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <h3 className="text-2xl font-bold mb-3 text-white">{project.title}</h3>
                  <p className="text-neutral-300 text-sm leading-relaxed">{project.description}</p>

                  {/* Call to action */}
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    <span className="inline-flex items-center text-sm font-semibold text-white bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                      Saiba mais →
                    </span>
                  </div>
                </div>
              </div>
            </TransitionLink>
          </motion.div>
        ))}
      </div>

      {/* Location info */}
      <div className="text-center mt-16">
        <p className="text-neutral-500 text-sm">
          📍 Desenvolvido com ❤️ em <span className="text-white font-semibold">Roca Sales - RS</span>
        </p>
      </div>
    </div>
  )
}
