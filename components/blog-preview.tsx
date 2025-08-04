"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { TransitionLink } from "./transition-link"
import { ArrowRight } from "lucide-react"

const posts = [
  {
    title: "Como Escolher o Sistema ERP Ideal",
    excerpt: "Guia completo para selecionar a solução de gestão empresarial que melhor se adapta ao seu negócio.",
    slug: "/blog/sistema-erp-ideal",
  },
  {
    title: "Automação com IA: O Futuro dos Negócios",
    excerpt: "Descubra como a inteligência artificial pode revolucionar os processos da sua empresa.",
    slug: "/blog/automacao-ia-negocios",
  },
  {
    title: "Websites que Convertem: Melhores Práticas",
    excerpt: "Estratégias comprovadas para criar sites que transformam visitantes em clientes.",
    slug: "/blog/websites-que-convertem",
  },
]

export function BlogPreview() {
  const container = useRef(null)

  useGSAP(
    () => {
      gsap.from(".blog-title", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })

      gsap.from(".blog-post", {
        scrollTrigger: {
          trigger: ".blog-grid",
          start: "top 80%",
        },
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
      })
    },
    { scope: container },
  )

  return (
    <section ref={container} className="py-20 md:py-32 bg-[#111]">
      <div className="container mx-auto px-4">
        <h2 className="blog-title text-4xl md:text-6xl font-bold text-center mb-16">Nosso Blog</h2>
        <div className="blog-grid grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <div key={index} className="blog-post bg-[#1a1a1a] p-8 rounded-lg flex flex-col">
              <h3 className="text-2xl font-bold mb-4">{post.title}</h3>
              <p className="text-neutral-400 mb-6 flex-grow">{post.excerpt}</p>
              <TransitionLink href={post.slug} className="group text-white font-semibold flex items-center gap-2">
                Ler Mais <ArrowRight className="transition-transform group-hover:translate-x-1" size={20} />
              </TransitionLink>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
