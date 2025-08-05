"use client"

import { useState, useRef, useEffect } from 'react'
import { Send, Bot } from 'lucide-react'

interface Message {
  id: string
  content: string
  sender: 'user' | 'assistant'
  timestamp: Date
}

const fixedResponses = {
  "quem somos": "Somos a MOUND, uma empresa de desenvolvimento de software focada em criar soluções inovadoras para todas as áreas. Nossa equipe é especializada em desenvolvimento web, mobile e soluções personalizadas.",
  "projetos": "Desenvolvemos uma variedade de projetos incluindo sites corporativos, aplicações web complexas, aplicativos móveis nativos e híbridos, e sistemas personalizados para diferentes setores.",
  "serviços": "Oferecemos desenvolvimento web moderno, criação de aplicativos móveis para iOS e Android, e soluções de software personalizadas para atender às necessidades específicas do seu negócio."
}

export function MoundChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Olá! Sou o assistente da MOUND. Como posso ajudá-lo hoje?',
      sender: 'assistant',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // Check for fixed responses first
      const lowerInput = input.toLowerCase().trim()
      const fixedResponse = Object.entries(fixedResponses).find(([key]) => 
        lowerInput.includes(key)
      )

      if (fixedResponse) {
        setTimeout(() => {
          const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            content: fixedResponse[1],
            sender: 'assistant',
            timestamp: new Date()
          }
          setMessages(prev => [...prev, assistantMessage])
          setIsLoading(false)
        }, 1000)
        return
      }

      // Use Groq API for other questions
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input.trim() }),
      })

      if (!response.ok) {
        throw new Error('Falha na comunicação com o servidor')
      }

      const data = await response.json()
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message || 'Desculpe, não consegui processar sua mensagem.',
        sender: 'assistant',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Desculpe, ocorreu um erro ao processar sua mensagem. Verifique sua conexão e tente novamente.',
        sender: 'assistant',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent pr-2">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.sender === 'user'
                    ? 'bg-[#262A2C] text-white'
                    : 'bg-[#1C1B1B] text-gray-100 border border-gray-700'
                }`}
              >
                {message.sender === 'assistant' && (
                  <div className="flex items-center gap-2 mb-1">
                    <Bot className="w-4 h-4 text-yellow-500" />
                    <span className="text-xs text-gray-400">MOUND Assistant</span>
                  </div>
                )}
                <p className="text-sm leading-relaxed">{message.content}</p>
                <span className="text-xs text-gray-500 mt-1 block">
                  {message.timestamp.toLocaleTimeString('pt-BR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-[#1C1B1B] text-gray-100 border border-gray-700 rounded-lg px-4 py-2 max-w-[80%]">
                <div className="flex items-center gap-2 mb-1">
                  <Bot className="w-4 h-4 text-yellow-500" />
                  <span className="text-xs text-gray-400">MOUND Assistant</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua mensagem sobre a MOUND..."
            className="flex-1 bg-[#262A2C] text-white placeholder-gray-400 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-black rounded-lg px-4 py-2 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  )
}
