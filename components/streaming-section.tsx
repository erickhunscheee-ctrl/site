"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Star, Calendar } from "lucide-react"
import { LoadingSpinner } from "@/components/loading-spinner"

interface StreamingShow {
  id: string
  title: string
  overview: string
  releaseYear: number
  genres: Array<{ id: number; name: string }>
  rating: number
  imageSet: {
    verticalPoster: {
      w240: string
      w360: string
      w480: string
    }
  }
  streamingOptions: {
    [country: string]: Array<{
      service: {
        id: string
        name: string
        imageSet: {
          lightThemeImage: string
        }
      }
      type: string
      link: string
    }>
  }
}

interface StreamingData {
  shows: StreamingShow[]
  hasMore: boolean
}

export function StreamingSection() {
  const [data, setData] = useState<StreamingData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    country: "br",
    services: "netflix,prime,hbo,disney",
    orderBy: "popularity",
    type: "movie",
  })

  const itemsPerPage = 4

  const fetchData = async (page = 1) => {
    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams({
        ...filters,
        page: page.toString(),
      })

      console.log("[v0] Fetching streaming data with params:", params.toString())

      const response = await fetch(`/api/streaming?${params}`)
      const result = await response.json()

      console.log("[v0] Streaming API response:", result)

      if (!response.ok) {
        throw new Error(result.error || "Erro ao carregar dados")
      }

      setData(result)
    } catch (err) {
      console.error("[v0] Streaming fetch error:", err)
      setError(err instanceof Error ? err.message : "Erro desconhecido")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData(currentPage)
  }, [currentPage, filters])

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
    setCurrentPage(1)
  }

  const totalItems = data?.shows?.length || 0
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage))
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentItems = data?.shows?.slice(startIndex, startIndex + itemsPerPage) || []

  console.log("[v0] Streaming render state:", {
    loading,
    error,
    totalItems,
    currentItems: currentItems.length,
    currentPage,
    totalPages,
  })

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400 mb-4">{error}</p>
        <button
          onClick={() => fetchData(currentPage)}
          className="px-4 py-2 bg-[#262A2C] text-white rounded-lg hover:bg-[#1a1818] transition-colors"
        >
          Tentar novamente
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 justify-center">
        <select
          value={filters.type}
          onChange={(e) => handleFilterChange("type", e.target.value)}
          className="bg-[#151313] border border-[#262A2C] text-white px-3 py-2 rounded-lg text-sm"
        >
          <option value="movie">Filmes</option>
          <option value="series">Séries</option>
        </select>

        <select
          value={filters.orderBy}
          onChange={(e) => handleFilterChange("orderBy", e.target.value)}
          className="bg-[#151313] border border-[#262A2C] text-white px-3 py-2 rounded-lg text-sm"
        >
          <option value="popularity">Popularidade</option>
          <option value="imdb_rating">Nota IMDB</option>
          <option value="tmdb_rating">Nota TMDB</option>
        </select>

        <select
          value={filters.services}
          onChange={(e) => handleFilterChange("services", e.target.value)}
          className="bg-[#151313] border border-[#262A2C] text-white px-3 py-2 rounded-lg text-sm"
        >
          <option value="netflix,prime,hbo,disney">Todos os Serviços</option>
          <option value="netflix">Netflix</option>
          <option value="prime">Prime Video</option>
          <option value="hbo">HBO Max</option>
          <option value="disney">Disney+</option>
        </select>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {currentItems.length === 0 && !loading && !error ? (
          <div className="text-center py-8 text-gray-400">Nenhum conteúdo encontrado</div>
        ) : (
          currentItems.map((show) => (
            <div
              key={show.id}
              className="bg-[#151313] border border-[#262A2C] rounded-[15px] p-4 hover:bg-[#1a1818] transition-colors"
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <img
                    src={
                      show.imageSet?.verticalPoster?.w240 || "/placeholder.svg?height=120&width=80&query=movie+poster"
                    }
                    alt={show.title}
                    className="w-16 h-24 object-cover rounded-lg"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-white font-medium text-sm line-clamp-1">{show.title}</h3>
                    <div className="flex items-center gap-1 text-yellow-400 text-xs">
                      <Star className="w-3 h-3 fill-current" />
                      <span>{show.rating?.toFixed(1) || "N/A"}</span>
                    </div>
                  </div>

                  <p className="text-gray-400 text-xs mb-2 line-clamp-2">{show.overview}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>{show.releaseYear}</span>
                      {show.genres?.slice(0, 2).map((genre) => (
                        <span key={genre.id} className="bg-[#262A2C] px-2 py-1 rounded text-xs">
                          {genre.name}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-1">
                      {show.streamingOptions?.br?.slice(0, 3).map((option, index) => (
                        <img
                          key={index}
                          src={
                            option.service.imageSet?.lightThemeImage ||
                            "/placeholder.svg?height=16&width=16&query=streaming+service" ||
                            "/placeholder.svg"
                          }
                          alt={option.service.name}
                          className="w-4 h-4 rounded"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-full bg-[#151313] border border-[#262A2C] text-white hover:bg-[#1a1818] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                currentPage === page
                  ? "bg-white text-black"
                  : "bg-[#151313] border border-[#262A2C] text-white hover:bg-[#1a1818]"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-full bg-[#151313] border border-[#262A2C] text-white hover:bg-[#1a1818] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}
