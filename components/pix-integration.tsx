"use client"

import type React from "react"

import { useState } from "react"
import { QrCode } from "lucide-react"

export function PixIntegration() {
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [qrCode, setQrCode] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!amount) return

    setIsLoading(true)
    setQrCode(null)

    try {
      // Simular geração do QR Code PIX
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // QR Code simulado (em produção seria gerado pela API do PIX)
      const mockQrCode = `00020126580014BR.GOV.BCB.PIX0136${Math.random().toString(36).substring(7)}520400005303986540${amount.replace(",", ".")}5802BR5925MOUND DESENVOLVIMENTO6009ROCA SALES62070503***6304${Math.random().toString(36).substring(2, 6).toUpperCase()}`

      setQrCode(mockQrCode)
    } catch (error) {
      console.error("Erro ao gerar QR Code:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setAmount("")
    setDescription("")
    setQrCode(null)
  }

  return (
    <div className="border-0 border-[#ca1515] hover:border-l-[#cfc8c8] bg-[#151313] p-8 hover:bg-[#1a1818] transition-colors group">
      <div className="flex flex-col items-center text-center mb-6">
        <div className="w-16 h-16 bg-[#262A2C] rounded-full flex items-center justify-center mb-4 group-hover:bg-[#32BCAD] transition-colors">
          <div className="w-8 h-8 relative">
            <svg viewBox="0 0 80 80" className="w-full h-full">
              <path
                fill="currentColor"
                stroke="#5e9c76"
                strokeMiterlimit="10"
                d="M19.373,19.543h-1.159L31.92,5.837 c4.466-4.449,11.695-4.449,16.161,0l13.706,13.706h-1.159c-2.728,0-5.302,1.057-7.228,3L41.807,34.085 c-1.006,1.006-2.608,1.006-3.614,0L26.601,22.543C24.674,20.6,22.1,19.543,19.373,19.543z"
              />
              <path
                fill="currentColor"
                stroke="#5e9c76"
                strokeMiterlimit="10"
                d="M60.627,60.457h1.159L48.08,74.163 c-4.466,4.449-11.695,4.449-16.161,0L18.213,60.457h1.159c2.728,0,5.302-1.057,7.228-3l11.592-11.541 c1.006-1.006,2.608-1.006,3.614,0l11.592,11.541C55.326,59.4,57.9,60.457,60.627,60.457z"
              />
              <path
                fill="currentColor"
                stroke="#5e9c76"
                strokeMiterlimit="10"
                d="M74.163,48.08l-8.967,8.967h-4.569 c-1.824,0-3.529-0.716-4.824-1.995L44.211,43.495c-2.318-2.318-6.103-2.318-8.421,0L24.197,55.053 c-1.296,1.279-3,1.995-4.824,1.995h-4.569L5.837,48.08c-4.449-4.466-4.449-11.695,0-16.161l8.967-8.967h4.569 c1.824,0,3.529,0.716,4.824,1.995l11.592,11.558c1.159,1.159,2.693,1.739,4.211,1.739c1.517,0,3.051-0.58,4.211-1.739 l11.592-11.558c1.296-1.279,3-1.995,4.824-1.995h4.569l8.967,8.967C78.612,36.386,78.612,43.614,74.163,48.08z"
              />
            </svg>
          </div>
        </div>
        <h3 className="text-white text-xl font-semibold mb-2">Pagamento PIX</h3>
        <p className="text-gray-300 text-sm leading-relaxed mb-6">
          Gere QR Codes PIX instantaneamente para receber pagamentos.
        </p>
      </div>

      {!qrCode ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-2">
              Valor (R$)
            </label>
            <input
              type="text"
              id="amount"
              value={amount}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "")
                const formatted = (Number.parseFloat(value) / 100).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
                setAmount(formatted)
              }}
              placeholder="0,00"
              className="w-full px-4 py-3 bg-[#262A2C] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#32BCAD] transition-colors"
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
              Descrição (opcional)
            </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição do pagamento"
              className="w-full px-4 py-3 bg-[#262A2C] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#32BCAD] transition-colors"
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !amount}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#32BCAD] text-white rounded-lg hover:bg-[#2a9d8f] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <QrCode className="w-5 h-5" />
            )}
            {isLoading ? "Gerando..." : "Gerar QR Code PIX"}
          </button>
        </form>
      ) : (
        <div className="text-center space-y-4">
          <div className="bg-white p-4 rounded-lg inline-block">
            <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <QrCode className="w-16 h-16 text-gray-600 mx-auto mb-2" />
                <p className="text-xs text-gray-600">QR Code PIX</p>
                <p className="text-sm font-semibold text-gray-800">R$ {amount}</p>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-300 space-y-2">
            <p>✓ QR Code gerado com sucesso!</p>
            <p>Escaneie com seu app bancário</p>
          </div>

          <button
            onClick={resetForm}
            className="w-full px-6 py-3 bg-[#262A2C] text-white rounded-lg hover:bg-[#2a2e30] transition-colors"
          >
            Gerar Novo QR Code
          </button>
        </div>
      )}
    </div>
  )
}
