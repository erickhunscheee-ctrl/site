"use client"

import Image from "next/image"

export function LoadingSpinner({ size = 40 }: { size?: number }) {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-pulse">
        <Image src="/images/logo.png" alt="Carregando..." width={size} height={size} className="object-contain" />
      </div>
    </div>
  )
}
