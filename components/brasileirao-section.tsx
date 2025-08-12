"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Calendar, Clock } from "lucide-react"
import Image from "next/image"

interface Match {
  id: number
  date: string
  homeTeam: {
    name: string
    logo: string
    score: number
  }
  awayTeam: {
    name: string
    logo: string
    score: number
  }
  status: string
  round: string
}

export function BrasileiraSection() {
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch("/api/brasileirao")
        const data = await response.json()

        if (data.error) {
          setError(data.error)
        } else {
          setMatches(data.matches || [])
        }
      } catch (err) {
        setError("Erro ao carregar resultados")
      } finally {
        setLoading(false)
      }
    }

    fetchMatches()
  }, [])

  if (loading) {
    return (
      <section className="py-20 px-4 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Brasileirão 2025</h2>
            <p className="text-gray-400 text-lg">Últimos resultados do campeonato</p>
          </div>
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            <p className="text-gray-400 mt-4">Carregando resultados...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-20 px-4 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Brasileirão 2025</h2>
            <p className="text-gray-400 text-lg">Últimos resultados do campeonato</p>
          </div>
          <Card className="bg-[#151313] border border-[#262A2C] max-w-md mx-auto">
            <CardContent className="p-6 text-center">
              <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-red-400">{error}</p>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4 bg-gray-950">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Brasileirão 2025</h2>
          <p className="text-gray-400 text-lg">Últimos resultados do campeonato</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((match) => (
            <Card key={match.id} className="bg-[#151313] border border-[#262A2C] hover:bg-[#1a1818] transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {match.round}
                  </Badge>
                  <div className="flex items-center gap-1 text-gray-400 text-xs">
                    <Calendar className="w-3 h-3" />
                    {new Date(match.date).toLocaleDateString("pt-BR")}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-4">
                  {/* Time da casa */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 relative">
                        <Image
                          src={match.homeTeam.logo || "/placeholder.svg"}
                          alt={match.homeTeam.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="text-white font-medium text-sm">{match.homeTeam.name}</span>
                    </div>
                    <span className="text-white font-bold text-lg">{match.homeTeam.score}</span>
                  </div>

                  {/* Divisor */}
                  <div className="border-t border-gray-700"></div>

                  {/* Time visitante */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 relative">
                        <Image
                          src={match.awayTeam.logo || "/placeholder.svg"}
                          alt={match.awayTeam.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="text-white font-medium text-sm">{match.awayTeam.name}</span>
                    </div>
                    <span className="text-white font-bold text-lg">{match.awayTeam.score}</span>
                  </div>

                  {/* Status */}
                  <div className="flex items-center justify-center pt-2">
                    <Badge className="bg-green-600 text-white text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      Finalizado
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {matches.length === 0 && (
          <Card className="bg-[#151313] border border-[#262A2C] max-w-md mx-auto">
            <CardContent className="p-6 text-center">
              <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">Nenhum resultado disponível no momento</p>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  )
}
