"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send } from "lucide-react"

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

const FIXED_RESPONSES = {
  "quem somos": {
    content: `Somos a **MOUND** - uma empresa especializada em desenvolvimento de software com soluções para todas as áreas envolvidas.

Nossa missão é criar tecnologia sob medida para cada necessidade, oferecendo:

• **Desenvolvimento de software personalizado**
• **Soluções web e mobile**  
• **Integração de sistemas**
• **Consultoria tecnológica**

Combinamos expertise técnica com visão estratégica para entregar soluções que realmente fazem a diferença no dia a dia das empresas.`,
    keywords: ["quem somos", "sobre", "empresa", "equipe", "missão", "mound"],
  },
  projetos: {
    content: `Nossos principais serviços de desenvolvimento:

**💻 Desenvolvimento Web**
Aplicações web modernas, responsivas e escaláveis usando as mais recentes tecnologias.

**📱 Aplicações Mobile**
Apps nativos e híbridos para iOS e Android com foco na experiência do usuário.

**🔗 Integração de Sistemas**
Conectamos diferentes plataformas e sistemas para otimizar processos empresariais.

**🤖 Automação e IA**
Implementação de soluções inteligentes para automatizar tarefas e processos.

Cada projeto é desenvolvido com tecnologias de ponta e foco total na qualidade e performance.`,
    keywords: ["projetos", "portfolio", "trabalhos", "cases", "projeto", "serviços", "servicos"],
  },
}

export function MoundChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const findFixedResponse = (query: string): string | null => {
    const normalizedQuery = query.toLowerCase().trim()
    for (const [key, response] of Object.entries(FIXED_RESPONSES)) {
      if (response.keywords.some((keyword) => normalizedQuery.includes(keyword))) {
        return response.content
      }
    }
    return null
  }

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageText,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)
    setHasError(false)

    try {
      const fixedResponse = findFixedResponse(messageText)

      if (fixedResponse) {
        await new Promise((resolve) => setTimeout(resolve, 800))

        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: fixedResponse,
          isUser: false,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMessage])
      } else {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: messageText,
            context:
              "Você é um assistente da empresa 'MOUND', especializada em desenvolvimento de software com soluções para todas as áreas envolvidas. Responda de forma profissional e útil, sempre relacionando com nossos serviços quando apropriado. Mantenha as respostas concisas e informativas em português brasileiro.",
          }),
        })

        if (!response.ok) {
          throw new Error("Erro na resposta da API")
        }

        const data = await response.json()

        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: data.message || "Desculpe, não consegui processar sua pergunta no momento.",
          isUser: false,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMessage])
      }
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error)
      setHasError(true)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Desculpe, ocorreu um erro ao processar sua mensagem. Verifique sua conexão e tente novamente",
        isUser: false,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim() && !isLoading) {
      sendMessage(inputValue)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const formatMessage = (content: string) => {
    return content.split("\n").map((line, index) => {
      const formattedLine = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\*(.*?)\*/g, "<em>$1</em>")

      return (
        <span key={index}>
          <span dangerouslySetInnerHTML={{ __html: formattedLine }} />
          {index < content.split("\n").length - 1 && <br />}
        </span>
      )
    })
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-3 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
        {messages.length === 0 && !hasError && (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            <p>Inicie uma conversa sobre a MOUND...</p>
          </div>
        )}

        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] p-3 rounded-lg text-sm ${
                message.isUser
                  ? "bg-[#4A5568] text-white"
                  : message.content.includes("erro") || message.content.includes("Desculpe")
                    ? "bg-[#2D3748] text-gray-300 border-l-4 border-red-500"
                    : "bg-[#2D3748] text-gray-300"
              }`}
            >
              <div className="leading-relaxed">{formatMessage(message.content)}</div>
              <div className="text-xs text-gray-500 mt-1">
                {message.timestamp.toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-[#2D3748] text-gray-300 p-3 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite sua mensagem sobre a MOUND..."
            className="w-full px-4 py-3 bg-[#2D3748] text-white rounded-lg border border-gray-600 focus:border-yellow-500 focus:outline-none placeholder-gray-400 text-sm"
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          disabled={!inputValue.trim() || isLoading}
          className={`p-3 rounded-lg transition-colors ${
            inputValue.trim() && !isLoading
              ? "bg-yellow-500 hover:bg-yellow-600 text-black"
              : "bg-gray-600 text-gray-400 cursor-not-allowed"
          }`}
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  )
}
