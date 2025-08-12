"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, Search, ChevronLeft, ChevronRight } from "lucide-react"
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

interface Pagination {
  page: number
  totalPages: number
  total: number
  hasNext: boolean
  hasPrev: boolean
}

export function FootballSection() {
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    totalPages: 1,
    total: 0,
    hasNext: false,
    hasPrev: false,
  })

  // Filtros
  const [selectedLeague, setSelectedLeague] = useState<"brasileirao" | "premier-league">("brasileirao")
  const [searchTeam, setSearchTeam] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const leagues = [
    { id: "brasileirao", name: "Brasileirão", endpoint: "/api/brasileirao" },
    { id: "premier-league", name: "Premier League", endpoint: "/api/premier-league" },
  ]

  const fetchMatches = async (page = 1) => {
    setLoading(true)
    try {
      const currentLeague = leagues.find((l) => l.id === selectedLeague)
      if (!currentLeague) return

      const params = new URLSearchParams({
        page: page.toString(),
        limit: "4", // Reduzido de 6 para 4 como nas notícias
      })

      if (searchTeam) params.append("team", searchTeam)
      if (selectedDate) params.append("date", selectedDate)

      const response = await fetch(`${currentLeague.endpoint}?${params}`)
      const data = await response.json()

      if (data.error) {
        setError(data.error)
        setMatches([])
      } else {
        setMatches(data.matches || [])
        setPagination(data.pagination)
        setError("")
      }
    } catch (err) {
      setError("Erro ao carregar resultados")
      setMatches([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setCurrentPage(1)
    fetchMatches(1)
  }, [selectedLeague, searchTeam, selectedDate])

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
    fetchMatches(newPage)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1)
    fetchMatches(1)
  }

  return (
    <section
      id="futebol"
      className="relative z-10 px-4 md:px-16 py-8 md:py-16 max-w-[1920px] mx-auto"
      aria-labelledby="futebol-title"
    >
      <h2 id="futebol-title" className="text-white text-xl md:text-2xl font-normal mb-4 md:mb-6 text-center">
        Resultados do Futebol
      </h2>
      <p className="text-gray-300 text-sm md:text-lg text-center mb-6 md:mb-10 max-w-[700px] mx-auto px-4">
        Últimos resultados dos campeonatos em tempo real.
      </p>

      <div className="max-w-[1000px] mx-auto">
        <div className="mb-6 space-y-4">
          {/* Seletor de Liga */}
          <div className="flex flex-wrap gap-2 justify-center">
            {leagues.map((league) => (
              <Button
                key={league.id}
                variant={selectedLeague === league.id ? "default" : "outline"}
                onClick={() => setSelectedLeague(league.id as "brasileirao" | "premier-league")}
                className={
                  selectedLeague === league.id
                    ? "bg-white text-black hover:bg-gray-200 text-sm h-8"
                    : "bg-[#151313] border-[#262A2C] text-white hover:bg-[#1a1818] text-sm h-8"
                }
              >
                {league.name}
              </Button>
            ))}
          </div>

          {/* Filtros de busca */}
          <div className="flex flex-col md:flex-row gap-2 max-w-2xl mx-auto">
            <form onSubmit={handleSearch} className="flex gap-2 flex-1">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Buscar por time..."
                  value={searchTeam}
                  onChange={(e) => setSearchTeam(e.target.value)}
                  className="pl-10 bg-[#151313] border-[#262A2C] text-white placeholder-gray-400 h-8 text-sm"
                />
              </div>
              <Button type="submit" className="bg-white text-black hover:bg-gray-200 h-8 text-sm px-3">
                Buscar
              </Button>
            </form>

            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-[#151313] border-[#262A2C] text-white md:w-32 h-8 text-sm"
            />
          </div>
        </div>

        {loading ? (
          <ul className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <li key={i} className="bg-[#151313] border border-[#262A2C] rounded-[15px] p-4 md:p-5 animate-pulse">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#262A2C] rounded" />
                    <div className="h-4 bg-[#262A2C] rounded w-24" />
                  </div>
                  <div className="h-6 bg-[#262A2C] rounded w-8" />
                </div>
              </li>
            ))}
          </ul>
        ) : error ? (
          <div className="text-center text-red-400">{error}</div>
        ) : matches.length === 0 ? (
          <div className="text-center text-gray-400">Nenhum resultado encontrado.</div>
        ) : (
          /* Lista de jogos seguindo padrão das notícias */
          <ul className="space-y-3">
            {matches.map((match) => (
              <li
                key={match.id}
                className="bg-[#151313] border border-[#262A2C] rounded-[15px] p-4 md:p-5 hover:bg-[#1a1818] transition-colors"
              >
                <div className="space-y-3">
                  {/* Header com rodada e data */}
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs border-[#262A2C] text-gray-300">
                      {match.round}
                    </Badge>
                    <div className="flex items-center gap-1 text-gray-400 text-xs">
                      <Calendar className="w-3 h-3" />
                      {new Date(match.date).toLocaleDateString("pt-BR")}
                    </div>
                  </div>

                  {/* Time da casa */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 relative flex-shrink-0">
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
                  <div className="border-t border-[#262A2C]"></div>

                  {/* Time visitante */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 relative flex-shrink-0">
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
                  <div className="flex items-center justify-center">
                    <Badge className="bg-green-600 text-white text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      Finalizado
                    </Badge>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={!pagination.hasPrev || loading}
            className="w-10 h-10 bg-[#262A2C] rounded-full flex items-center justify-center hover:bg-[#2a2e30] disabled:opacity-50 transition-colors"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <div className="text-xs md:text-sm text-gray-300">
            Página {currentPage} {pagination.totalPages > 0 ? `de ${pagination.totalPages}` : ""}
          </div>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!pagination.hasNext || loading}
            className="w-10 h-10 bg-[#262A2C] rounded-full flex items-center justify-center hover:bg-[#2a2e30] disabled:opacity-50 transition-colors"
            aria-label="Próxima"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </section>
  )
}
