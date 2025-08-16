"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface LoadingScreenProps {
  onLoadingComplete: () => void
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onLoadingComplete, 500) // Aguarda a animação de fade out
    }, 3000)

    return () => clearTimeout(timer)
  }, [onLoadingComplete])

  if (!isVisible) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center transition-opacity duration-500 opacity-0 pointer-events-none">
        <div className="flex flex-col items-center">
          <div className="animate-pulse">
            <Image
              src="/images/logo.png"
              alt="MOUND Logo"
              width={120}
              height={120}
              className="object-contain"
              priority
            />
          </div>
          <div className="mt-6 text-white text-lg font-light">Carregando...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="animate-pulse">
          <Image src="/images/logo.png" alt="MOUND Logo" width={120} height={120} className="object-contain" priority />
        </div>
        <div className="mt-6 text-white text-lg font-light animate-pulse">Carregando...</div>
      </div>
    </div>
  )
}
