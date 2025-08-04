import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MOUND - Desenvolvimento de Software",
  description: "Empresa de desenvolvimento de software, com soluções para todas as áreas envolvidas",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={inter.className}>
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  )
}
