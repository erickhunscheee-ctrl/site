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

// Fallback translator (agora também traduz do inglês)
async function translateTitlesToPtBR(titles: string[]): Promise<string[]> {
  try {
    if (!process.env.GROQ_API_KEY) return titles
    const joined = titles.join(" ||| ")
    const { text } = await generateText({
      model: groq("llama-3.1-8b-instant"),
      system:
        "Você é um tradutor profissional. Traduza para o português brasileiro mantendo nomes próprios, siglas e termos técnicos. " +
        "Mantenha a concisão e clareza. Responda somente com o texto traduzido, sem comentários extras.",
      prompt: "Traduza os seguintes títulos de notícias do inglês para PT-BR. Separe com ' ||| '.\n\n" + joined,
    })
    const split = text
      .split(" ||| ")
      .map((s) => s.trim())
      .filter(Boolean)
    return split.length === titles.length ? split : titles
  } catch (error) {
    console.log('Translation failed, using original titles:', error)
    return titles
  }
}

// Fallback image extractor
async function fetchOgImage(url: string, timeoutMs = 6000): Promise<string | null> {
  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), timeoutMs)
    const res = await fetch(url, { 
      signal: controller.signal, 
      redirect: "follow",
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; NewsBot/1.0)'
      }
    })
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

// Tentar múltiplas estratégias com a News API focando em 2025
async function fetchNewsAPI(pageSize: number, page: number): Promise<NewsResponse | null> {
  if (!process.env.NEWS_API_KEY) {
    console.log('No NEWS_API_KEY found')
    return null
  }

  // Data de 2025 para filtrar notícias recentes
  const from2025 = '2025-01-01'
  const currentDate = new Date().toISOString().split('T')[0]

  const strategies = [
    // Estratégia 1: Top headlines dos EUA (mais atual)
    {
      name: 'EUA Top Headlines',
      url: `https://newsapi.org/v2/top-headlines?country=us&pageSize=${pageSize}&page=${page + 1}`,
    },
    // Estratégia 2: Notícias recentes de 2025 dos EUA
    {
      name: 'EUA 2025 Recentes',
      url: `https://newsapi.org/v2/everything?q=*&from=${from2025}&to=${currentDate}&sortBy=publishedAt&language=en&pageSize=${pageSize}&page=${page + 1}`,
    },
    // Estratégia 3: Fontes principais dos EUA
    {
      name: 'Fontes EUA Principais',
      url: `https://newsapi.org/v2/top-headlines?sources=cnn,bbc-news,reuters,associated-press,the-washington-post,the-wall-street-journal&pageSize=${pageSize}&page=${page + 1}`,
    },
    // Estratégia 4: Notícias de tecnologia (sempre tem conteúdo)
    {
      name: 'Tecnologia EUA',
      url: `https://newsapi.org/v2/top-headlines?country=us&category=technology&pageSize=${pageSize}&page=${page + 1}`,
    },
    // Estratégia 5: Notícias de negócios EUA
    {
      name: 'Negócios EUA',
      url: `https://newsapi.org/v2/top-headlines?country=us&category=business&pageSize=${pageSize}&page=${page + 1}`,
    },
    // Estratégia 6: Top headlines globais (fallback)
    {
      name: 'Top Headlines Globais',
      url: `https://newsapi.org/v2/top-headlines?pageSize=${pageSize}&page=${page + 1}`,
    }
  ]

  for (const strategy of strategies) {
    try {
      console.log(`Tentando estratégia: ${strategy.name}`)
      console.log(`URL: ${strategy.url}`)
      
      const res = await fetch(strategy.url, {
        headers: { 
          "X-Api-Key": process.env.NEWS_API_KEY!,
          "User-Agent": "NewsApp/1.0"
        },
        cache: "no-store",
      })

      if (!res.ok) {
        console.error(`Estratégia ${strategy.name} falhou: ${res.status} ${res.statusText}`)
        continue
      }

      const data = (await res.json()) as {
        status: string
        totalResults: number
        articles: Array<{
          title: string
          url: string | null
          urlToImage: string | null
          publishedAt: string
          source: { name: string }
        }>
        code?: string
        message?: string
      }

      if (data.status !== "ok") {
        console.error(`Estratégia ${strategy.name} - erro da API:`, data.message)
        continue
      }

      const total = data.totalResults || 0
      console.log(`Estratégia ${strategy.name} - ${total} resultados, ${data.articles?.length || 0} artigos`)
      
      if (total === 0 || !data.articles?.length) {
        console.log(`Estratégia ${strategy.name} - sem resultados, tentando próxima...`)
        continue
      }

      // Sucesso! Processar resultados
      const nbPages = Math.ceil(total / pageSize)
      const items: NewsItem[] = data.articles
        .filter(article => article.title && article.title !== "[Removed]")
        .map((a, i) => ({
          id: `newsapi-usa-${strategy.name.replace(/\s+/g, '-').toLowerCase()}-${page}-${i}-${Date.now()}`,
          title: a.title,
          url: a.url,
          source: a.source?.name || "News API",
          createdAt: a.publishedAt,
          image: a.urlToImage ?? null,
        }))

      console.log(`✅ Estratégia ${strategy.name} funcionou! ${items.length} itens`)
      return { items, page, nbPages }

    } catch (error) {
      console.error(`Estratégia ${strategy.name} - erro:`, error)
      continue
    }
  }

  console.log('Todas as estratégias da News API falharam')
  return null
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const pageParam = searchParams.get("page") || "0"
    const translateParam = searchParams.get("translate") || "1"
    const page = Number.isNaN(Number(pageParam)) ? 0 : Math.max(0, Number(pageParam))
    const pageSize = 4

    // Tentar News API com múltiplas estratégias (foco em EUA 2025)
    const newsApiResult = await fetchNewsAPI(pageSize, page)
    if (newsApiResult && newsApiResult.items.length > 0) {
      // Traduzir títulos se solicitado
      const shouldTranslate = translateParam !== "0"
      if (shouldTranslate && process.env.GROQ_API_KEY) {
        const titles = newsApiResult.items.map(item => item.title)
        const translatedTitles = await translateTitlesToPtBR(titles)
        newsApiResult.items = newsApiResult.items.map((item, i) => ({
          ...item,
          title: translatedTitles[i] ?? item.title
        }))
        console.log('✅ Títulos traduzidos com sucesso')
      }
      return NextResponse.json<NewsResponse>(newsApiResult, { status: 200 })
    }

    // Fallback: Hacker News
    console.log('Usando fallback: Hacker News')
    const hnUrl = `https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=${pageSize}&page=${page}`
    const hnRes = await fetch(hnUrl, { 
      cache: "no-store",
      headers: {
        'User-Agent': 'NewsApp/1.0'
      }
    })
    
    if (!hnRes.ok) {
      console.error(`Hacker News API erro: ${hnRes.status}`)
      return NextResponse.json<NewsResponse>({ 
        items: [], 
        page: 0, 
        nbPages: 0 
      }, { status: 200 })
    }

    const hn = (await hnRes.json()) as {
      hits: Array<{ objectID: string; title: string; url: string | null; created_at: string }>
      page: number
      nbPages: number
    }

    const titles = hn.hits.map((h) => h.title)
    const shouldTranslate = translateParam !== "0"
    const translated = shouldTranslate && titles.length > 0 ? await translateTitlesToPtBR(titles) : titles

    // Buscar imagens apenas para alguns artigos para melhorar performance
    const images = await Promise.all(
      hn.hits.slice(0, 2).map((h) => (h.url ? fetchOgImage(h.url) : Promise.resolve(null)))
    )
    // Preencher o resto com null
    while (images.length < hn.hits.length) {
      images.push(null)
    }

    const items: NewsItem[] = hn.hits.map((h, i) => ({
      id: h.objectID,
      title: translated[i] ?? h.title,
      url: h.url,
      source: "Hacker News",
      createdAt: h.created_at,
      image: images[i],
    }))

    console.log(`✅ Hacker News fallback funcionou! ${items.length} itens`)
    return NextResponse.json<NewsResponse>({ 
      items, 
      page: hn.page, 
      nbPages: hn.nbPages 
    }, { status: 200 })

  } catch (error) {
    console.error('Erro geral da API:', error)
    return NextResponse.json<NewsResponse>({ 
      items: [], 
      page: 0, 
      nbPages: 0 
    }, { status: 500 })
  }
}
