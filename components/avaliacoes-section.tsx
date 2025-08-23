"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Star, User, LogIn, ChevronLeft, ChevronRight } from "lucide-react"
import { supabase } from "@/lib/supabase/client"
import { adicionarAvaliacao, buscarAvaliacoes } from "@/lib/actions"
import { useActionState } from "react"

interface Avaliacao {
  id: number
  usuario: string
  texto: string
  estrelas: number
  data: string
}

export function AvaliacoesSection() {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([])
  const [user, setUser] = useState<any>(null)
  const [showForm, setShowForm] = useState(false)
  const [rating, setRating] = useState(5)
  const [state, formAction] = useActionState(adicionarAvaliacao, null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
    }
    checkUser()

    const loadAvaliacoes = async () => {
      const result = await buscarAvaliacoes()
      if (result.data) {
        setAvaliacoes(result.data)
      }
    }
    loadAvaliacoes()
  }, [])

  // Auto-play do carrossel
  useEffect(() => {
    if (isAutoPlaying && avaliacoes.length > 3 && scrollContainerRef.current) {
      autoPlayRef.current = setInterval(() => {
        nextSlideAuto()
      }, 4000) // Muda a cada 4 segundos

      return () => {
        if (autoPlayRef.current) {
          clearInterval(autoPlayRef.current)
        }
      }
    }
  }, [isAutoPlaying, avaliacoes.length])

  const nextSlideAuto = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const cardWidth = container.querySelector('.carousel-card')?.clientWidth || 0
      const gap = 24
      const scrollAmount = cardWidth + gap
      
      // Verifica se chegou ao final
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
        // Volta ao início
        container.scrollTo({
          left: 0,
          behavior: 'smooth'
        })
      } else {
        container.scrollBy({
          left: scrollAmount,
          behavior: 'smooth'
        })
      }
    }
  }

  const pauseAutoPlay = () => {
    setIsAutoPlaying(false)
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
    }
  }

  const resumeAutoPlay = () => {
    setIsAutoPlaying(true)
  }

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}`,
      },
    })
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setShowForm(false)
  }

  const nextSlide = () => {
    pauseAutoPlay()
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const cardWidth = container.querySelector('.carousel-card')?.clientWidth || 0
      const gap = 24 // 6 * 4px (gap-6)
      const scrollAmount = cardWidth + gap
      
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      })
    }
    // Resume auto-play após 8 segundos de inatividade
    setTimeout(resumeAutoPlay, 8000)
  }

  const prevSlide = () => {
    pauseAutoPlay()
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const cardWidth = container.querySelector('.carousel-card')?.clientWidth || 0
      const gap = 24 // 6 * 4px (gap-6)
      const scrollAmount = cardWidth + gap
      
      container.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      })
    }
    // Resume auto-play após 8 segundos de inatividade
    setTimeout(resumeAutoPlay, 8000)
  }

  const showCarouselControls = avaliacoes.length > 3

  return (
    <section className="py-20 px-4 ">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-2xl font-bold text-white mb-4">AVALIAÇÕES DOS CLIENTES</h2>
          <p className="text-gray-400 text-sm">Veja o que nossos clientes dizem sobre nossos serviços</p>
        </div>

        {/* Avaliações públicas */}
        <div className="relative mb-12">
          {/* Desktop: Grid normal */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {avaliacoes.map((avaliacao) => (
              <Card
                key={avaliacao.id}
                className="border-0 bg-black transition-colors"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <User className="w-5 h-5 text-gray-400" />
                    <span className="text-white font-medium">{avaliacao.usuario}</span>
                  </div>

                  <div className="flex gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= avaliacao.estrelas ? "text-yellow-400 fill-current" : "text-gray-400"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-gray-300 mb-3">{avaliacao.texto}</p>

                  <p className="text-gray-500 text-sm">{new Date(avaliacao.data).toLocaleDateString("pt-BR")}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mobile: Carrossel */}
          <div className="md:hidden relative">
            <div 
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
              style={{ scrollSnapType: 'x mandatory' }}
              onMouseEnter={pauseAutoPlay}
              onMouseLeave={resumeAutoPlay}
              onTouchStart={pauseAutoPlay}
            >
              {avaliacoes.map((avaliacao) => (
                <Card
                  key={avaliacao.id}
                  className="carousel-card bg-black border-0  transition-colors flex-shrink-0 w-80"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <User className="w-5 h-5 text-gray-400" />
                      <span className="text-white font-medium">{avaliacao.usuario}</span>
                    </div>

                    <div className="flex gap-1 mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= avaliacao.estrelas ? "text-yellow-400 fill-current" : "text-gray-400"
                          }`}
                        />
                      ))}
                    </div>

                    <p className="text-gray-300 mb-3">{avaliacao.texto}</p>

                    <p className="text-gray-500 text-sm">{new Date(avaliacao.data).toLocaleDateString("pt-BR")}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Controles do carrossel - só aparecem se tiver mais de 3 cards */}
            {showCarouselControls && (
              <>
                <Button
                  onClick={prevSlide}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 bg-[#151313] border border-[#262A2C] text-white hover:bg-[#1a1818] w-10 h-10 rounded-full p-0"
                  size="sm"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                
                <Button
                  onClick={nextSlide}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 bg-[#151313] border border-[#262A2C] text-white hover:bg-[#1a1818] w-10 h-10 rounded-full p-0"
                  size="sm"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="relative">
          {!user ? (
            <div className="flex justify-end mb-4">
              <Button
                onClick={handleGoogleLogin}
                variant="outline"
                size="sm"
                className="bg-[#151313  ]  text-white hover:bg-[#1a1818] text-xs"
              >
                <LogIn className="w-3 h-3 mr-1" />
                Entrar para avaliar
              </Button>
            </div>
          ) : (
            <Card className="bg-[#151313] border max-w-2xl mx-auto hover:bg-[#1a1818] transition-colors">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-white text-sm">Logado como: {user.email}</p>
                  <Button variant="outline" onClick={handleLogout} size="sm" className="text-xs bg-transparent">
                    Sair
                  </Button>
                </div>

                {!showForm ? (
                  <Button onClick={() => setShowForm(true)} className="w-full bg-white text-black hover:bg-gray-200">
                    Deixar Avaliação
                  </Button>
                ) : (
                  <form action={formAction} className="space-y-4">
                    <input type="hidden" name="usuario" value={user.email} />

                    <div>
                      <label className="block text-white mb-2">Avaliação (estrelas)</label>
                      <div className="flex gap-1 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-6 h-6 cursor-pointer ${
                              star <= rating ? "text-yellow-400 fill-current" : "text-gray-400"
                            }`}
                            onClick={() => setRating(star)}
                          />
                        ))}
                      </div>
                      <input type="hidden" name="estrelas" value={rating} />
                    </div>

                    <div>
                      <label className="block text-white mb-2">Comentário</label>
                      <Textarea
                        name="texto"
                        placeholder="Conte sobre sua experiência..."
                        className="bg-[#151313] border-[#262A2C] text-white"
                        rows={4}
                        required
                      />
                    </div>

                    {state?.error && <p className="text-red-400 text-sm">{state.error}</p>}

                    {state?.success && <p className="text-green-400 text-sm">{state.success}</p>}

                    <div className="flex gap-2">
                      <Button type="submit" className="bg-white text-black hover:bg-gray-200">
                        Enviar Avaliação
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowForm(false)}
                        className="bg-[#151313] border-[#262A2C] text-white hover:bg-[#1a1818]"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        <style jsx>{`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </section>
  )
}