"use client"

import type React from "react"

import { useState } from "react"
import { CreditCard, CheckCircle2, XCircle } from "lucide-react"

export function StripeIntegration() {
  const [amount, setAmount] = useState<string>("50,00")
  const [description, setDescription] = useState<string>("Pagamento de demonstração")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleCreatePayment(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)
    setCheckoutUrl(null)
    try {
      // Convert "50,00" -> 5000 (centavos)
      const normalized = amount.replace(/\./g, "").replace(",", ".")
      const value = Number(normalized)
      if (!Number.isFinite(value) || value <= 0) throw new Error("Valor inválido")
      const cents = Math.round(value * 100)

      const res = await fetch("/api/stripe/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: cents, description }),
      })
      const data = await res.json()
      if (!res.ok || !data?.url) {
        throw new Error(data?.error || "Falha ao criar pagamento")
      }
      setCheckoutUrl(data.url)
      setSuccess(true)
    } catch (e: any) {
      setError(e?.message || "Erro ao gerar pagamento")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="border-r-4 border-[#ca1515] hover:border-l-[#cfc8c8] bg-[#151313] rounded-r-[20px] p-8 hover:bg-[#1a1818] transition-colors group">
      <div className="flex flex-col items-center text-center">
        <div className="w-12 md:w-16 h-12 md:h-16 bg-[#262A2C] rounded-full flex items-center justify-center mb-4 md:mb-6">
          <CreditCard className="w-6 md:w-8 h-6 md:h-8 text-white" />
        </div>
        <h3 className="text-white text-lg md:text-xl font-semibold mb-2">Stripe Pagamentos</h3>
        <p className="text-gray-300 text-sm leading-relaxed mb-5 max-w-[520px]">
          Gere um link de checkout rápido (modo demonstração). Se a chave da Stripe estiver configurada, o link real
          será criado em modo de teste.
        </p>

        <form onSubmit={handleCreatePayment} className="w-full space-y-3 max-w-[420px] text-left">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Valor (BRL)</label>
            <input
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0,00"
              className="w-full px-3 py-2 rounded-lg bg-[#262A2C] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Descrição</label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição do pagamento"
              className="w-full px-3 py-2 rounded-lg bg-[#262A2C] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-600 text-black rounded-lg px-4 py-2 transition-colors"
          >
            {loading ? "Gerando..." : "Gerar pagamento"}
          </button>
        </form>

        {success && checkoutUrl && (
          <div className="mt-4 w-full max-w-[420px] text-left bg-[#0f0f0f] border border-[#262A2C] rounded-lg p-3">
            <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
              <CheckCircle2 className="w-4 h-4" />
              Link gerado
            </div>
            <a
              href={checkoutUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block text-white underline text-sm hover:opacity-80"
            >
              Abrir Checkout
            </a>
          </div>
        )}

        {error && (
          <div className="mt-4 w-full max-w-[420px] text-left bg-[#0f0f0f] border border-[#3a1f1f] rounded-lg p-3">
            <div className="flex items-center gap-2 text-red-400 text-sm font-medium">
              <XCircle className="w-4 h-4" />
              {error}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
