"use client"

import { useEffect, useState } from "react"
import { ExternalLink, Newspaper, ChevronLeft, ChevronRight } from "lucide-react"

type NewsItem = {
  id: string
  title: string
  url: string | null
  source: string
  createdAt: string
}

type ApiData = {
  items: NewsItem[]
  page: number
  nbPages: number
}

export function NewsFeed() {
  const [items, setItems] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(0)
  const [nbPages, setNbPages] = useState(0)

  async function load(pageToLoad = 0) {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/news?page=${pageToLoad}&translate=1`, { cache: "no-store" })
      if (!res.ok) throw new Error("Falha ao carregar notícias")
      const data = (await res.json()) as ApiData
      setItems(data.items ?? [])
      setPage(data.page ?? 0)
      setNbPages(data.nbPages ?? 0)
    } catch (e: any) {
      setError(e?.message || "Erro ao carregar notícias")
      setItems([])
      setPage(0)
      setNbPages(0)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const canPrev = page > 0
  const canNext = nbPages > 0 && page < nbPages - 1

  return (
    <section
      id="noticias"
      className="relative z-10 px-4 md:px-16 py-8 md:py-16 max-w-[1920px] mx-auto"
      aria-labelledby="noticias-title"
    >
      <h2 id="noticias-title" className="text-white text-xl md:text-2xl font-normal mb-4 md:mb-6 text-center">
        Notícias do Dia
      </h2>
      <p className="text-gray-300 text-sm md:text-lg text-center mb-6 md:mb-10 max-w-[700px] mx-auto px-4">
        Manchetes atualizadas em tempo real, traduzidas para PT-BR.
      </p>

      {/* List layout, aligned with chat style */}
      <div className="max-w-[1000px] mx-auto">
        {loading ? (
          <ul className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <li key={i} className="bg-[#151313] border border-[#262A2C] rounded-[15px] p-4 md:p-5 animate-pulse">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-[#262A2C] rounded-full" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-[#262A2C] rounded w-3/4" />
                    <div className="h-4 bg-[#262A2C] rounded w-1/4" />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : error ? (
          <div className="text-center text-red-400">{error}</div>
        ) : items.length === 0 ? (
          <div className="text-center text-gray-400">Sem notícias no momento.</div>
        ) : (
          <ul className="space-y-3">
            {items.map((n) => (
              <li
                key={n.id}
                className="bg-[#151313] border border-[#262A2C] rounded-[15px] p-4 md:p-5 hover:bg-[#1a1818] transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-[#262A2C] rounded-full flex items-center justify-center flex-shrink-0">
                    <Newspaper className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white text-sm md:text-base font-medium leading-relaxed">{n.title}</h3>
                    <div className="text-xs text-gray-400 mt-1">
                      <span className="uppercase tracking-wide">{n.source}</span>
                      <span className="mx-1">•</span>
                      <span>{new Date(n.createdAt).toLocaleString("pt-BR")}</span>
                    </div>
                    <div className="mt-2">
                      {n.url ? (
                        <a
                          href={n.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-white text-xs md:text-sm underline hover:opacity-80"
                        >
                          Ler matéria <ExternalLink className="w-4 h-4" />
                        </a>
                      ) : (
                        <span className="text-gray-400 text-xs">Sem link disponível</span>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Pagination controls */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={() => load(page - 1)}
            disabled={!canPrev || loading}
            className="w-10 h-10 bg-[#262A2C] rounded-full flex items-center justify-center hover:bg-[#2a2e30] disabled:opacity-50 transition-colors"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <div className="text-xs md:text-sm text-gray-300">
            Página {page + 1} {nbPages > 0 ? `de ${nbPages}` : ""}
          </div>
          <button
            onClick={() => load(page + 1)}
            disabled={!canNext || loading}
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
