import { NextResponse } from "next/server"

// Optional: AI translation via Groq using the AI SDK
import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"

export const dynamic = "force-dynamic"

type Hit = {
  objectID: string
  title: string
  url: string | null
  created_at: string
}

type NewsResponse = {
  items: Array<{
    id: string
    title: string
    url: string | null
    source: string
    createdAt: string
  }>
  page: number
  nbPages: number
}

async function translateTitlesToPtBR(titles: string[]): Promise<string[]> {
  try {
    if (!process.env.GROQ_API_KEY) return titles
    // Join titles with a separator so we get deterministic splitting
    const joined = titles.join(" ||| ")
    const { text } = await generateText({
      model: groq("llama-3.1-8b-instant"),
      system:
        "Você é um tradutor. Traduza para o português brasileiro mantendo nomes próprios e concisão. " +
        "Responda somente com o texto traduzido, sem comentários extras.",
      prompt:
        "Traduza os seguintes títulos do inglês para PT-BR. " +
        "Separe cada título traduzido usando o mesmo separador ' ||| '.\n\n" +
        joined,
    })
    // Split back using our separator; if counts mismatch, fall back
    const split = text
      .split(" ||| ")
      .map((s) => s.trim())
      .filter(Boolean)
    return split.length === titles.length ? split : titles
  } catch {
    // Fail open to original titles
    return titles
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const pageParam = searchParams.get("page") || "0"
    const translateParam = searchParams.get("translate") || "1"
    const page = Number.isNaN(Number(pageParam)) ? 0 : Number(pageParam)
    const hitsPerPage = 10 // list view; can be tuned

    // Hacker News Algolia API supports pagination
    const url = `https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=${hitsPerPage}&page=${page}`
    const res = await fetch(url, { cache: "no-store" })
    if (!res.ok) {
      return NextResponse.json<NewsResponse>({ items: [], page: 0, nbPages: 0 }, { status: 200 })
    }
    const data = (await res.json()) as {
      hits: Hit[]
      page: number
      nbPages: number
    }

    const titles = data.hits.map((h) => h.title)
    const shouldTranslate = translateParam !== "0"
    const translated = shouldTranslate && titles.length > 0 ? await translateTitlesToPtBR(titles) : titles

    const items = data.hits.map((h, i) => ({
      id: h.objectID,
      title: translated[i] ?? h.title,
      url: h.url,
      source: "Hacker News",
      createdAt: h.created_at,
    }))

    return NextResponse.json<NewsResponse>({ items, page: data.page, nbPages: data.nbPages }, { status: 200 })
  } catch {
    return NextResponse.json<NewsResponse>({ items: [], page: 0, nbPages: 0 }, { status: 200 })
  }
}
