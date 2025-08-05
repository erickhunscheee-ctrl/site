"use client"

import type React from "react"

import { useState } from "react"
import { Send } from "lucide-react"

export function WhatsAppIntegration() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!phoneNumber || !message) return

    setIsLoading(true)
    setStatus("idle")

    try {
      // Simular envio da mensagem
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setStatus("success")
      setMessage("")
      setPhoneNumber("")
    } catch (error) {
      setStatus("error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-[#151313] rounded-[20px] p-8 hover:bg-[#1a1818] transition-colors group">
      <div className="flex flex-col items-center text-center mb-6">
        <div className="w-16 h-16 bg-[#262A2C] rounded-full flex items-center justify-center mb-4 group-hover:bg-[#25D366] transition-colors">
          <div className="w-8 h-8 relative">
            <svg viewBox="0 0 508 508" className="w-full h-full">
              <path
                fill="currentColor"
                d="M504,378.4c0,68.8-56.4,125.6-125.2,125.6H129.2C60.4,504,4,447.2,4,378.4V128.8C4,60,60.4,4,129.2,4h249.6C447.6,4,504,59.6,504,128.8V378.4z"
              />
              <path
                fill="#FFFFFF"
                d="M410,253.6c0,84-68.4,152-153.2,152c-26.8,0-52-6.8-74-18.8L98,413.6l27.6-81.6c-14-22.8-22-49.6-22-78.4c0-84,68.4-152,153.2-152C341.6,101.6,410,169.6,410,253.6 M256.8,125.6c-71.2,0-128.8,57.2-128.8,127.6c0,28,9.2,54,24.4,74.8l-16,47.6L186,360c20.4,13.2,44.8,21.2,70.8,21.2c71.2,0,128.8-57.2,128.8-127.6C385.6,183.2,328,125.6,256.8,125.6 M334,288.4c-0.8-1.6-3.6-2.4-7.2-4.4s-22.4-10.8-25.6-12c-3.2-1.2-6-2-8.4,2c-2.4,3.6-9.6,12-12,14.8c-2,2.4-4.4,2.8-8,0.8s-16-5.6-30.4-18.4c-11.2-10-18.8-22-20.8-25.6s-0.4-5.6,1.6-7.6c1.6-1.6,3.6-4.4,5.6-6.4s2.4-3.6,3.6-6.4c1.2-2.4,0.8-4.8-0.4-6.4c-0.8-2-8.4-20-11.6-27.6c-3.2-7.6-6.4-6-8.4-6s-4.8-0.4-7.2-0.4s-6.4,0.8-10,4.8c-3.6,3.6-13.2,12.8-13.2,31.2s13.6,36,15.2,38.4c2,2.4,26,41.2,64,56.4c38,14.8,38,10,45.2,9.2c6.8-0.8,22-8.8,25.2-17.6C335.2,297.6,335.2,290,334,288.4"
              />
            </svg>
          </div>
        </div>
        <h3 className="text-white text-xl font-semibold mb-2">API WhatsApp</h3>
        <p className="text-gray-300 text-sm leading-relaxed mb-6">
          Envie mensagens diretamente pelo WhatsApp usando nossa API integrada.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
            Número do WhatsApp
          </label>
          <input
            type="tel"
            id="phone"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="(11) 99999-9999"
            className="w-full px-4 py-3 bg-[#262A2C] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#25D366] transition-colors"
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
            Mensagem
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Digite sua mensagem aqui..."
            rows={3}
            className="w-full px-4 py-3 bg-[#262A2C] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#25D366] transition-colors resize-none"
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !phoneNumber || !message}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-lg hover:bg-[#20b858] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
          {isLoading ? "Enviando..." : "Enviar Mensagem"}
        </button>

        {status === "success" && (
          <div className="text-center text-green-400 text-sm">✓ Mensagem enviada com sucesso!</div>
        )}

        {status === "error" && (
          <div className="text-center text-red-400 text-sm">✗ Erro ao enviar mensagem. Tente novamente.</div>
        )}
      </form>
    </div>
  )
}
