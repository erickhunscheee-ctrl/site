"use client"

import { Suspense, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { motion } from "framer-motion"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { Scene } from "@/components/scene"
import { TransitionLink } from "@/components/transition-link"
import { ArrowRight } from "lucide-react"

export function Hero() {
  const container = useRef(null)

  useGSAP(
    () => {
      const tl = gsap.timeline()
      tl.fromTo(
        ".hero-title span",
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: "power3.out" },
      )
        .fromTo(
          ".hero-subtitle",
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.6",
        )
        .fromTo(
          ".hero-button",
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, ease: "elastic.out(1, 0.5)" },
          "-=0.5",
        )
    },
    { scope: container },
  )

  const title = "Mound"
  const splitTitle = title.split("").map((letter, i) => (
    <span key={i} className="inline-block overflow-hidden">
      <span className="inline-block">{letter}</span>
    </span>
  ))

  return (
    <div ref={container} className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 2] }}
          dpr={[1, 2]} // Permitir até 2x para telas retina
          performance={{ min: 0.5 }}
          gl={{
            antialias: true, // Reabilitado para qualidade visual
            alpha: true,
            powerPreference: "high-performance",
          }}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="hero-title font-bold text-6xl md:text-8xl lg:text-9xl mb-6">{splitTitle}</h1>
        <motion.p
          className="hero-subtitle text-lg md:text-xl lg:text-2xl max-w-3xl mb-8 text-neutral-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          Desenvolvemos soluções personalizadas que transformam ideias em realidade digital. Websites, ERPs e automações
          com IA para impulsionar seu negócio.
        </motion.p>
        <TransitionLink href="/#portfolio">
          <motion.button
            className="hero-button flex items-center gap-2 bg-white text-black font-semibold py-3 px-6 rounded-full transition-transform duration-300"
            whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 300 } }}
            whileTap={{ scale: 0.95 }}
          >
            Conheça Nossos Projetos <ArrowRight size={20} />
          </motion.button>
        </TransitionLink>
      </div>
    </div>
  )
}
