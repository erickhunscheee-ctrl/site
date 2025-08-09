import { NextResponse } from "next/server"

// Optional: AI translation via Groq using the AI SDK (used only in fallback mode)
import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"

export const dynamic = "force-dynamic"

type NewsItem = {
  id: string
  title: string
  url: string | null
  source: string
  createdAt: string
  image?: string | null
}

type NewsResponse = {
  items: NewsItem[]
  page: number
  nbPages: number
}

// Fallback translator (Hacker News only)
async function translateTitlesToPtBR(titles: string[]): Promise<string[]> {
  try {
    if (!process.env.GROQ_API_KEY) return titles
    const joined = titles.join(" ||| ")
    const { text } = await generateText({
      model: groq("llama-3.1-8b-instant"),
      system:
        "Você é um tradutor. Traduza para o português brasileiro mantendo nomes próprios e concisão. " +
        "Responda somente com o texto traduzido, sem comentários extras.",
      prompt: "Traduza os seguintes títulos do inglês para PT-BR. Separe com ' ||| '.\n\n" + joined,
    })
    const split = text
      .split(" ||| ")
      .map((s) => s.trim())
      .filter(Boolean)
    return split.length === titles.length ? split : titles
  } catch {
    return titles
  }
}

// Fallback image extractor for HN articles without images
async function fetchOgImage(url: string, timeoutMs = 6000): Promise<string | null> {
  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), timeoutMs)
    const res = await fetch(url, { signal: controller.signal, redirect: "follow" })
    clearTimeout(timer)
    if (!res.ok) return null
    const html = await res.text()
    const ogMatch = html.match(/<meta\s+[^>]*property=["']og:image["'][^>]*>/i)
    if (ogMatch) {
      const content = ogMatch[0].match(/content=["']([^"']+)["']/i)
      if (content?.[1]) return content[1]
    }
    const twMatch = html.match(/<meta\s+[^>]*name=["']twitter:image["'][^>]*>/i)
    if (twMatch) {
      const content = twMatch[0].match(/content=["']([^"']+)["']/i)
      if (content?.[1]) return content[1]
    }
    return null
  } catch {
    return null
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const pageParam = searchParams.get("page") || "0"
    const translateParam = searchParams.get("translate") || "1"
    const page = Number.isNaN(Number(pageParam)) ? 0 : Number(pageParam)
    const pageSize = 4 // 4 notícias por página, conforme solicitado

    // Prefer NewsAPI if key is configured
    if (process.env.NEWS_API_KEY) {
      // NewsAPI: top-headlines do Brasil
      const url = `https://newsapi.org/v2/top-headlines?country=br&pageSize=${pageSize}&page=${page + 1}`
      const res = await fetch(url, {
        headers: { "X-Api-Key": process.env.NEWS_API_KEY },
        cache: "no-store",
      })
      if (!res.ok) return NextResponse.json<NewsResponse>({ items: [], page: 0, nbPages: 0 }, { status: 200 })

      const data = (await res.json()) as {
        totalResults: number
        articles: Array<{
          title: string
          url: string | null
          urlToImage: string | null
          publishedAt: string
          source: { name: string }
        }>
      }

      const total = data.totalResults || 0
      const nbPages = Math.max(1, Math.ceil(total / pageSize))

      const items: NewsItem[] = (data.articles ?? []).map((a, i) => ({
        id: `${page}-${i}-${a.url ?? "sem-url"}`,
        title: a.title,
        url: a.url,
        source: a.source?.name || "Notícias",
        createdAt: a.publishedAt,
        image: a.urlToImage ?? null,
      }))

      return NextResponse.json<NewsResponse>({ items, page, nbPages }, { status: 200 })
    }

    // Fallback: Hacker News (com tradução opcional e tentativa de extrair imagem)
    const hnUrl = `https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=${pageSize}&page=${page}`
    const hnRes = await fetch(hnUrl, { cache: "no-store" })
    if (!hnRes.ok) {
      return NextResponse.json<NewsResponse>({ items: [], page: 0, nbPages: 0 }, { status: 200 })
    }

    const hn = (await hnRes.json()) as {
      hits: Array<{ objectID: string; title: string; url: string | null; created_at: string }>
      page: number
      nbPages: number
    }

    const titles = hn.hits.map((h) => h.title)
    const shouldTranslate = translateParam !== "0"
    const translated = shouldTranslate && titles.length > 0 ? await translateTitlesToPtBR(titles) : titles

    const images = await Promise.all(hn.hits.map((h) => (h.url ? fetchOgImage(h.url) : Promise.resolve(null))))

    const items: NewsItem[] = hn.hits.map((h, i) => ({
      id: h.objectID,
      title: translated[i] ?? h.title,
      url: h.url,
      source: "Hacker News",
      createdAt: h.created_at,
      image: images[i],
    }))

    return NextResponse.json<NewsResponse>({ items, page: hn.page, nbPages: hn.nbPages }, { status: 200 })
  } catch {
    return NextResponse.json<NewsResponse>({ items: [], page: 0, nbPages: 0 }, { status: 200 })
  }
}
