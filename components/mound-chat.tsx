"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Phone, Video, MoreVertical } from "lucide-react"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export function MoundChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Olá! Sou o assistente da MOUND. Como posso ajudá-lo hoje?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleQuickResponse = (response: string) => {
    const quickResponses: Record<string, string> = {
      "Quem somos":
        "A MOUND é uma empresa de desenvolvimento de software localizada em Roca Sales, especializada em criar soluções inovadoras para web, mobile e sistemas personalizados. Nossa equipe é formada por desenvolvedores experientes e apaixonados por tecnologia.",
      Projetos:
        "Desenvolvemos uma ampla gama de projetos: sites institucionais, e-commerce, aplicativos mobile, sistemas de gestão, APIs, integrações com terceiros e soluções personalizadas. Cada projeto é único e desenvolvido com as melhores práticas do mercado.",
      Serviços:
        "Nossos principais serviços incluem: Desenvolvimento Web (React, Next.js, Node.js), Desenvolvimento Mobile (React Native, Flutter), Soluções Personalizadas, Integrações de API, Consultoria Técnica e Manutenção de Sistemas.",
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: response,
      role: "user",
      timestamp: new Date(),
    }

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: quickResponses[response] || "Obrigado pela sua pergunta!",
      role: "assistant",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage, assistantMessage])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      })

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message || "Desculpe, não consegui processar sua mensagem.",
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Desculpe, ocorreu um erro. Tente novamente mais tarde.",
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="absolute inset-0 bg-repeat bg-center rounded-lg flex flex-col h-full bg-white">
      {/* WhatsApp Header */}
      <div className="bg-green-600 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
            <Bot className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-white font-medium text-sm">MOUND Assistente</h3>
            <p className="text-green-100 text-xs">online</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Video className="w-5 h-5 text-white cursor-pointer" />
          <Phone className="w-5 h-5 text-white cursor-pointer" />
          <MoreVertical className="w-5 h-5 text-white cursor-pointer" />
        </div>
      </div>

      {/* WhatsApp Chat Background */}
      <div className="flex-1 overflow-y-auto px-4 py-2 bg-black  relative">
        {/* WhatsApp pattern background */}
        <div
          className="absolute inset-0 bg-repeat bg-center"
          style={{
            backgroundImage: "url('/images/background-whats.png')",
            opacity: 0.1, // 20% de opacidade
          }}
        ></div>

        <div className="relative space-y-2">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} mb-2`}
            >
              <div
                className={`relative max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow-sm ${message.role === "user"
                  ? "bg-green-500 text-white rounded-br-sm"
                  : "bg-white text-gray-800 rounded-bl-sm border"
                  }`}
                style={{
                  boxShadow: message.role === "user"
                    ? "0 1px 0.5px rgba(0,0,0,0.13)"
                    : "0 1px 0.5px rgba(0,0,0,0.13)"
                }}
              >
                <div className="text-sm leading-5 whitespace-pre-wrap break-words">
                  {message.content}
                </div>

                <div className={`flex items-center justify-end mt-1 gap-1 ${message.role === "user" ? "text-green-100" : "text-gray-500"
                  }`}>
                  <span className="text-xs">
                    {message.timestamp.toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  {message.role === "user" && (
                    <svg className="w-4 h-3 fill-current" viewBox="0 0 16 15">
                      <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.063-.51zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l3.61 3.463c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" />
                    </svg>
                  )}
                </div>

                {/* WhatsApp message tail */}
                <div
                  className={`absolute top-0 w-0 h-0 ${message.role === "user"
                    ? "right-0 transform translate-x-1 border-l-8 border-l-green-500 border-t-8 border-t-transparent"
                    : "left-0 transform -translate-x-1 border-r-8 border-r-white border-t-8 border-t-transparent"
                    }`}
                ></div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start mb-2">
              <div className="relative max-w-xs bg-white text-gray-800 px-4 py-3 rounded-lg rounded-bl-sm border shadow-sm">
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
                <div className="absolute top-0 left-0 transform -translate-x-1 w-0 h-0 border-r-8 border-r-white border-t-8 border-t-transparent"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Response Buttons */}
      <div className="px-4 py-2 bg-white">
        <div className="flex flex-wrap gap-2">
          {["Quem somos", "Projetos", "Serviços"].map((response) => (
            <button
              key={response}
              onClick={() => handleQuickResponse(response)}
              className="px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50 border border-gray-300"
              disabled={isLoading}
            >
              {response}
            </button>
          ))}
        </div>
      </div>

      {/* WhatsApp Input Bar */}
      <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
        <div className="flex items-center gap-3">
          {/* Emoji button */}
          <button className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </button>

          {/* Input field */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit(e)
                }
              }}
              placeholder="Escreva uma mensagem"
              className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-full text-gray-800 placeholder-gray-500 focus:outline-none focus:border-green-500 text-sm"
              disabled={isLoading}
            />
          </div>

          {/* Send/Mic button */}
          {input.trim() ? (
            <button
              onClick={handleSubmit}
              disabled={isLoading || !input.trim()}
              className="w-10 h-10 bg-green-500 text-white rounded-full hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              <Send className="w-5 h-5" />
            </button>
          ) : (
            <button className="w-10 h-10 text-gray-500 rounded-full hover:text-gray-700 flex items-center justify-center">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.49 6-3.31 6-6.72h-1.7z" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}