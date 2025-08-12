"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Star, User, LogIn } from "lucide-react"
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

  return (
    <section className="py-20 px-4 bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Avaliações dos Clientes</h2>
          <p className="text-gray-400 text-lg">Veja o que nossos clientes dizem sobre nossos serviços</p>
        </div>

        {/* Avaliações públicas */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {avaliacoes.map((avaliacao) => (
            <Card
              key={avaliacao.id}
              className="bg-[#151313] border border-[#262A2C] hover:bg-[#1a1818] transition-colors"
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

        <div className="relative">
          {!user ? (
            <div className="flex justify-end mb-4">
              <Button
                onClick={handleGoogleLogin}
                variant="outline"
                size="sm"
                className="bg-[#151313] border-[#262A2C] text-white hover:bg-[#1a1818] text-xs"
              >
                <LogIn className="w-3 h-3 mr-1" />
                Entrar para avaliar
              </Button>
            </div>
          ) : (
            <Card className="bg-[#151313] border border-[#262A2C] max-w-2xl mx-auto hover:bg-[#1a1818] transition-colors">
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
      </div>
    </section>
  )
}
