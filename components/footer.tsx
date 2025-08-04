"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { GlowScene } from "./glow-scene"
import { TransitionLink } from "./transition-link"

export function Footer() {
  return (
    <footer className="relative bg-black text-white py-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 1] }}
          dpr={[1, 2]}
          performance={{ min: 0.5 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
        >
          <Suspense fallback={null}>
            <GlowScene />
          </Suspense>
        </Canvas>
      </div>
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Tem um projeto em mente?</h2>
        <p className="text-lg text-neutral-300 mb-8">Vamos criar algo incrível juntos.</p>
        <TransitionLink href="/contact">
          <button className="bg-white text-black font-bold py-4 px-8 rounded-full text-lg transition-transform hover:scale-105">
            Entre em Contato
          </button>
        </TransitionLink>
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400">
            &copy; {new Date().getFullYear()} Mound - Roca Sales, RS. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <TransitionLink href="#" className="text-neutral-400 hover:text-white">
              LinkedIn
            </TransitionLink>
            <TransitionLink href="#" className="text-neutral-400 hover:text-white">
              Instagram
            </TransitionLink>
            <TransitionLink href="#" className="text-neutral-400 hover:text-white">
              WhatsApp
            </TransitionLink>
          </div>
        </div>
      </div>
    </footer>
  )
}
