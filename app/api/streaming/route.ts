export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const country = searchParams.get("country") || "br" // Mudando padrão para Brasil
    const service = searchParams.get("service") || "netflix"
    const showType = searchParams.get("showType") || "movie"

    const RAPID_API_KEY = process.env.RAPIDAPI_KEY

    if (!RAPID_API_KEY) {
      return Response.json({ error: "RAPIDAPI_KEY não configurada" }, { status: 500 })
    }

    const url = `https://streaming-availability.p.rapidapi.com/shows/top`
    const params = new URLSearchParams({
      country: country,
      service: service,
      show_type: showType,
    })

    console.log("[v0] Fetching top shows with URL:", `${url}?${params}`)

    const response = await fetch(`${url}?${params}`, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": RAPID_API_KEY,
        "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
    })

    if (!response.ok) {
      console.log("[v0] API Error:", response.status, response.statusText)
      throw new Error(`API Error: ${response.status}`)
    }

    const data = await response.json()
    console.log("[v0] API Response:", data)

    const transformedData = {
      shows: (data || []).slice(0, 10).map((show: any, index: number) => ({
        id: show.id || `top-${index}`,
        title: show.title,
        overview: show.overview || "Sem descrição disponível",
        releaseYear: show.releaseYear || new Date().getFullYear(),
        genres: show.genres || [],
        rating: show.rating || 0,
        rank: index + 1,
        isNew: show.releaseYear >= 2024,
        isTrending: index < 3, // Top 3 são considerados em alta
        lastUpdated: new Date().toISOString(),
        imageSet: show.imageSet || {
          verticalPoster: {
            w240: `/placeholder.svg?height=240&width=160&query=${encodeURIComponent(show.title || "movie poster")}`,
          },
        },
        streamingOptions: show.streamingOptions || {},
      })),
      hasMore: false,
      metadata: {
        country: country,
        service: service,
        showType: showType,
        lastUpdated: new Date().toISOString(),
        isLive: true,
      },
    }

    return Response.json(transformedData)
  } catch (error) {
    console.error("[v0] Streaming API Error:", error)

    const mockData = {
      shows: [
        {
          id: "mock-1",
          title: "Squid Game 2",
          overview: "A aguardada segunda temporada da série sul-coreana que conquistou o mundo.",
          releaseYear: 2024,
          genres: [
            { id: 1, name: "Drama" },
            { id: 2, name: "Thriller" },
          ],
          rating: 9.2,
          rank: 1,
          isNew: true,
          isTrending: true,
          lastUpdated: new Date().toISOString(),
          imageSet: {
            verticalPoster: {
              w240: `/placeholder.svg?height=240&width=160&query=squid+game+2`,
            },
          },
          streamingOptions: {},
        },
        {
          id: "mock-2",
          title: "Wednesday 2",
          overview: "Mais aventuras da filha da Família Addams na Nevermore Academy.",
          releaseYear: 2024,
          genres: [
            { id: 3, name: "Comédia" },
            { id: 4, name: "Horror" },
          ],
          rating: 8.8,
          rank: 2,
          isNew: true,
          isTrending: true,
          lastUpdated: new Date().toISOString(),
          imageSet: {
            verticalPoster: {
              w240: `/placeholder.svg?height=240&width=160&query=wednesday+season+2`,
            },
          },
          streamingOptions: {},
        },
        {
          id: "mock-3",
          title: "Cidade Invisível 3",
          overview: "A terceira temporada da série brasileira de fantasia urbana.",
          releaseYear: 2024,
          genres: [
            { id: 5, name: "Fantasia" },
            { id: 6, name: "Drama" },
          ],
          rating: 8.5,
          rank: 3,
          isNew: true,
          isTrending: true,
          lastUpdated: new Date().toISOString(),
          imageSet: {
            verticalPoster: {
              w240: `/placeholder.svg?height=240&width=160&query=cidade+invisivel+3`,
            },
          },
          streamingOptions: {},
        },
        ...Array.from({ length: 7 }, (_, i) => ({
          id: `mock-${i + 4}`,
          title: `Top ${i + 4} - Conteúdo em Alta`,
          overview: `Conteúdo popular que está dominando as telas brasileiras.`,
          releaseYear: 2024,
          genres: [
            { id: i + 7, name: i % 2 === 0 ? "Ação" : "Drama" },
            { id: i + 8, name: i % 2 === 0 ? "Aventura" : "Romance" },
          ],
          rating: 8.0 - i * 0.1,
          rank: i + 4,
          isNew: i < 3,
          isTrending: i < 2,
          lastUpdated: new Date().toISOString(),
          imageSet: {
            verticalPoster: {
              w240: `/placeholder.svg?height=240&width=160&query=top+content+${i + 4}`,
            },
          },
          streamingOptions: {},
        })),
      ],
      hasMore: false,
      metadata: {
        country: "br",
        service: "netflix",
        showType: "movie",
        lastUpdated: new Date().toISOString(),
        isLive: false,
      },
    }

    return Response.json(mockData)
  }
}
