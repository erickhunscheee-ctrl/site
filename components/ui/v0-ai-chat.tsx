"use client"

import type React from "react"

import { useEffect, useRef, useCallback } from "react"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { Globe, Server, Bot, MessageCircle, ArrowUpIcon, Paperclip, PlusIcon } from "lucide-react"

interface UseAutoResizeTextareaProps {
  minHeight: number
  maxHeight?: number
}

function useAutoResizeTextarea({ minHeight, maxHeight }: UseAutoResizeTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const adjustHeight = useCallback(
    (reset?: boolean) => {
      const textarea = textareaRef.current
      if (!textarea) return

      if (reset) {
        textarea.style.height = `${minHeight}px`
        return
      }

      // Temporarily shrink to get the right scrollHeight
      textarea.style.height = `${minHeight}px`

      // Calculate new height
      const newHeight = Math.max(minHeight, Math.min(textarea.scrollHeight, maxHeight ?? Number.POSITIVE_INFINITY))

      textarea.style.height = `${newHeight}px`
    },
    [minHeight, maxHeight],
  )

  useEffect(() => {
    // Set initial height
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = `${minHeight}px`
    }
  }, [minHeight])

  // Adjust height on window resize
  useEffect(() => {
    const handleResize = () => adjustHeight()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [adjustHeight])

  return { textareaRef, adjustHeight }
}

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

const FIXED_RESPONSES = {
  "quem somos": {
    content: `Somos a **Mound** - uma empresa de Roca Sales - RS especializada em desenvolver soluções digitais personalizadas que transformam a forma como nossos clientes fazem negócios.

Nossa missão é criar tecnologia sob medida para cada necessidade, oferecendo:

• **Websites modernos e responsivos**
• **Sistemas ERP completos e integrados**  
• **Automações inteligentes com IA**

Combinamos expertise técnica com visão estratégica para entregar soluções que realmente fazem a diferença no dia a dia das empresas, atendendo clientes em todo o Rio Grande do Sul e Brasil.`,
    keywords: ["quem somos", "sobre", "empresa", "equipe", "missão", "mound", "roca sales"],
  },
  projetos: {
    content: `Nossos principais serviços desenvolvidos em Roca Sales - RS:

**🌐 Websites Personalizados**
Sites modernos, responsivos e otimizados para conversão, desenvolvidos com as mais recentes tecnologias web para empresas de todos os portes.

**💼 Sistemas ERP**
Soluções completas de gestão empresarial, integradas e personalizadas para cada tipo de negócio, com módulos de:
- Gestão financeira
- Controle de estoque
- Vendas e CRM
- Relatórios gerenciais

**🤖 Automações com IA**
Implementação de inteligência artificial para automatizar processos, incluindo:
- Chatbots inteligentes
- Análise de dados automatizada
- Processamento de documentos
- Workflows personalizados

Cada projeto é desenvolvido com tecnologias de ponta e foco total na experiência do usuário.`,
    keywords: ["projetos", "portfolio", "trabalhos", "cases", "projeto", "serviços", "servicos"],
  },
  websites: {
    content: `**🌐 Desenvolvimento de Websites**

Criamos sites modernos e funcionais em Roca Sales - RS:

**Sites Institucionais**
- Design responsivo e moderno
- Otimização para SEO
- Integração com redes sociais
- Painel administrativo

**E-commerce**
- Lojas virtuais completas
- Integração com gateways de pagamento
- Gestão de produtos e estoque
- Relatórios de vendas

**Landing Pages**
- Foco em conversão
- A/B testing
- Integração com ferramentas de marketing
- Analytics detalhados

**Tecnologias utilizadas:** React, Next.js, WordPress, PHP, MySQL`,
    keywords: ["websites", "site", "web", "landing", "ecommerce", "loja virtual"],
  },
  erp: {
    content: `**💼 Sistemas ERP Personalizados**

Desenvolvemos sistemas de gestão empresarial completos em Roca Sales - RS:

**Módulos Disponíveis:**
- 💰 Gestão Financeira (contas a pagar/receber, fluxo de caixa)
- 📦 Controle de Estoque (entrada, saída, inventário)
- 🛒 Vendas e CRM (pedidos, clientes, comissões)
- 📊 Relatórios Gerenciais (dashboards, indicadores)
- 👥 Recursos Humanos (funcionários, folha de pagamento)
- 🏭 Produção (ordens de produção, controle de qualidade)

**Características:**
- Interface intuitiva e moderna
- Acesso via web (qualquer dispositivo)
- Backup automático na nuvem
- Suporte técnico especializado
- Treinamento da equipe incluído

**Tecnologias:** PHP, Laravel, MySQL, Vue.js`,
    keywords: ["erp", "sistema", "gestão", "financeiro", "estoque", "vendas"],
  },
  automacao: {
    content: `**🤖 Automações com Inteligência Artificial**

Implementamos soluções de IA em Roca Sales - RS para otimizar seus processos:

**Chatbots Inteligentes**
- Atendimento 24/7 automatizado
- Integração com WhatsApp e site
- Respostas personalizadas
- Transferência para humanos quando necessário

**Análise de Dados**
- Processamento automático de planilhas
- Geração de relatórios inteligentes
- Identificação de padrões e tendências
- Alertas automáticos

**Processamento de Documentos**
- Extração automática de dados
- Classificação de documentos
- Validação de informações
- Integração com sistemas existentes

**Workflows Automatizados**
- Aprovações automáticas
- Notificações inteligentes
- Sincronização entre sistemas
- Redução de tarefas manuais

**Benefícios:** Redução de custos, aumento da eficiência, menos erros humanos`,
    keywords: ["automação", "automacao", "ia", "inteligencia artificial", "chatbot", "workflow"],
  },
  localizacao: {
    content: `**📍 Nossa Localização**

A **Mound** está localizada em **Roca Sales - RS**, uma cidade estratégica no Vale do Taquari, Rio Grande do Sul.

**Por que Roca Sales?**
- Localização central no RS
- Fácil acesso a Porto Alegre e região metropolitana
- Proximidade com importantes centros empresariais
- Custo operacional otimizado
- Qualidade de vida para nossa equipe

**Atendimento:**
- 🏢 Presencial em Roca Sales - RS
- 💻 Remoto para todo o Brasil
- 📱 Suporte online 24/7
- 🚗 Visitas técnicas na região

**Contato:**
- 📧 contato@mound.com.br
- 📱 WhatsApp: (51) 9xxxx-xxxx
- 🌐 www.mound.com.br

Atendemos clientes em todo o Rio Grande do Sul e Brasil!`,
    keywords: ["localização", "localizacao", "roca sales", "endereço", "endereco", "onde", "local"],
  },
}

export function VercelV0Chat() {
  const [value, setValue] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 60,
    maxHeight: 200,
  })

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      })
    }
  }

  const scrollToChat = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
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
    setIsLoading(true)

    // Scroll para o chat após enviar mensagem
    setTimeout(() => {
      scrollToChat()
    }, 100)

    try {
      // Verificar se é uma pergunta fixa
      const fixedResponse = findFixedResponse(messageText)

      if (fixedResponse) {
        // Simular delay para parecer mais natural
        await new Promise((resolve) => setTimeout(resolve, 800))

        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: fixedResponse,
          isUser: false,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMessage])
      } else {
        // Enviar para Groq
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: messageText,
            context:
              "Você é um assistente da empresa 'Mound', localizada em Roca Sales - RS, especializada em desenvolver soluções digitais personalizadas como websites, sistemas ERP e automações com IA. Responda de forma profissional e útil, sempre relacionando com nossos serviços quando apropriado. Mantenha as respostas concisas e informativas em português brasileiro. Mencione nossa localização em Roca Sales quando relevante.",
          }),
        })

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
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "Desculpe, ocorreu um erro de conexão. Verifique sua internet e tente novamente. Você também pode tentar perguntas como: 'Quem somos', 'Websites' ou 'Sistemas ERP'.",
        isUser: false,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (value.trim()) {
        sendMessage(value)
        setValue("")
        adjustHeight(true)
      }
    }
  }

  const handleSend = () => {
    if (value.trim()) {
      sendMessage(value)
      setValue("")
      adjustHeight(true)
    }
  }

  const formatMessage = (content: string) => {
    return content.split("\n").map((line, index) => {
      // Processar markdown básico
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
    <div ref={chatContainerRef} className="flex flex-col items-center w-full max-w-4xl mx-auto p-4 space-y-8">
      <h1 className="text-4xl font-bold text-white">Como podemos ajudar sua empresa?</h1>

      {/* Messages Area */}
      {messages.length > 0 && (
        <div
          ref={messagesContainerRef}
          className="w-full max-h-[500px] overflow-y-auto bg-neutral-900/30 backdrop-blur-sm rounded-2xl p-6 space-y-6 border border-neutral-800/50 scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <style jsx>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] p-4 rounded-2xl ${
                  message.isUser
                    ? "bg-white text-black shadow-lg"
                    : "bg-neutral-800/80 backdrop-blur-sm text-white border border-neutral-700/50"
                }`}
              >
                <div className={`${message.isUser ? "text-sm font-medium" : "text-xs leading-relaxed"}`}>
                  {formatMessage(message.content)}
                </div>
                <div className={`text-xs opacity-50 mt-2 ${message.isUser ? "text-right" : "text-left"}`}>
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
              <div className="bg-neutral-800/80 backdrop-blur-sm text-white p-4 rounded-2xl border border-neutral-700/50">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-white/60 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-white/60 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      )}

      <div className="w-full">
        <div className="relative bg-neutral-900/50 backdrop-blur-sm rounded-2xl border border-neutral-800/50 shadow-2xl">
          <div className="overflow-y-auto">
            <Textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => {
                setValue(e.target.value)
                adjustHeight()
              }}
              onKeyDown={handleKeyDown}
              placeholder="Pergunte sobre nossos serviços..."
              className={cn(
                "w-full px-6 py-4",
                "resize-none",
                "bg-transparent",
                "border-none",
                "text-white text-sm",
                "focus:outline-none",
                "focus-visible:ring-0 focus-visible:ring-offset-0",
                "placeholder:text-neutral-400 placeholder:text-sm",
                "min-h-[60px]",
              )}
              style={{
                overflow: "hidden",
              }}
              disabled={isLoading}
            />
          </div>
          <div className="flex items-center justify-between p-4 border-t border-neutral-800/30">
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="group p-2 hover:bg-neutral-800/50 rounded-xl transition-all duration-200 flex items-center gap-1"
              >
                <Paperclip className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
                <span className="text-xs text-neutral-500 hidden group-hover:inline transition-opacity">Anexar</span>
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="px-3 py-2 rounded-xl text-xs text-neutral-400 transition-all duration-200 border border-dashed border-neutral-700/50 hover:border-neutral-600 hover:bg-neutral-800/30 flex items-center justify-between gap-2"
              >
                <PlusIcon className="w-3 h-3" />
                Projeto
              </button>
              <button
                type="button"
                onClick={handleSend}
                disabled={!value.trim() || isLoading}
                className={cn(
                  "p-3 rounded-xl text-sm transition-all duration-200 flex items-center justify-center",
                  value.trim() && !isLoading
                    ? "bg-white text-black hover:bg-gray-100 shadow-lg transform hover:scale-105"
                    : "bg-neutral-800/50 text-neutral-500 cursor-not-allowed",
                )}
              >
                <ArrowUpIcon className="w-4 h-4" />
                <span className="sr-only">Enviar</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 mt-6 flex-wrap">
          <ActionButton
            icon={<MessageCircle className="w-4 h-4" />}
            label="Quem Somos"
            onClick={() => {
              setValue("Quem somos")
              sendMessage("Quem somos")
            }}
          />
          <ActionButton
            icon={<Globe className="w-4 h-4" />}
            label="Websites"
            onClick={() => {
              setValue("Desenvolvimento de websites")
              sendMessage("Desenvolvimento de websites")
            }}
          />
          <ActionButton
            icon={<Server className="w-4 h-4" />}
            label="Sistemas ERP"
            onClick={() => {
              setValue("Sistemas ERP")
              sendMessage("Sistemas ERP")
            }}
          />
          <ActionButton
            icon={<Bot className="w-4 h-4" />}
            label="Automações IA"
            onClick={() => {
              setValue("Automações com IA")
              sendMessage("Automações com IA")
            }}
          />
        </div>
      </div>
    </div>
  )
}

interface ActionButtonProps {
  icon: React.ReactNode
  label: string
  onClick?: () => void
}

function ActionButton({ icon, label, onClick }: ActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 bg-neutral-900/50 hover:bg-neutral-800/60 backdrop-blur-sm rounded-full border border-neutral-800/50 text-neutral-400 hover:text-white transition-all duration-200 hover:scale-105 hover:shadow-lg"
    >
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </button>
  )
}
