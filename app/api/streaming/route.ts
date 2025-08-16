export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const country = searchParams.get("country") || "us"
    const services = searchParams.get("services") || "netflix"
    const orderBy = searchParams.get("orderBy") || "popularity"
    const type = searchParams.get("type") || "movie"
    const page = Number.parseInt(searchParams.get("page") || "1")

    const RAPID_API_KEY = process.env.RAPIDAPI_KEY

    if (!RAPID_API_KEY) {
      return Response.json({ error: "RAPIDAPI_KEY não configurada" }, { status: 500 })
    }

    // Usando fetch direto para a API do RapidAPI
    const url = `https://streaming-availability.p.rapidapi.com/shows/search/filters`
    const params = new URLSearchParams({
      country: country,
      services: services.split(",")[0], // Pega apenas o primeiro serviço por simplicidade
      order_by: orderBy === "popularity" ? "popularity_1week" : orderBy,
      show_type: type,
      page: page.toString(),
    })

    const response = await fetch(`${url}?${params}`, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": RAPID_API_KEY,
        "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
      },
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    const data = await response.json()

    // Transformar os dados para o formato esperado pelo componente
    const transformedData = {
      shows: (data.shows || []).map((show: any) => ({
        id: show.id,
        title: show.title,
        overview: show.overview || "Sem descrição disponível",
        releaseYear: show.releaseYear || new Date().getFullYear(),
        genres: show.genres || [],
        rating: show.rating || 0,
        imageSet: show.imageSet || {
          verticalPoster: {
            w240: `/placeholder.svg?height=240&width=160&query=${encodeURIComponent(show.title || "movie poster")}`,
          },
        },
        streamingOptions: show.streamingOptions || {},
      })),
      hasMore: data.hasMore || false,
    }

    return Response.json(transformedData)
  } catch (error) {
    console.error("Streaming API Error:", error)

    // Retornar dados mock em caso de erro
    const mockData = {
      shows: [
        {
          id: "1",
          title: "Filme Popular 1",
          overview: "Uma história emocionante sobre aventura e descoberta.",
          releaseYear: 2024,
          genres: [
            { id: 1, name: "Ação" },
            { id: 2, name: "Aventura" },
          ],
          rating: 8.5,
          imageSet: {
            verticalPoster: {
              w240: "/placeholder.svg?height=240&width=160",
            },
          },
          streamingOptions: {
            br: [
              {
                service: {
                  id: "netflix",
                  name: "Netflix",
                  imageSet: {
                    lightThemeImage: "/placeholder.svg?height=16&width=16",
                  },
                },
                type: "subscription",
                link: "#",
              },
            ],
          },
        },
        {
          id: "2",
          title: "Série Trending 2",
          overview: "Uma série dramática que conquistou o público mundial.",
          releaseYear: 2023,
          genres: [
            { id: 3, name: "Drama" },
            { id: 4, name: "Thriller" },
          ],
          rating: 9.2,
          imageSet: {
            verticalPoster: {
              w240: "/placeholder.svg?height=240&width=160",
            },
          },
          streamingOptions: {
            br: [
              {
                service: {
                  id: "prime",
                  name: "Prime Video",
                  imageSet: {
                    lightThemeImage: "/placeholder.svg?height=16&width=16",
                  },
                },
                type: "subscription",
                link: "#",
              },
            ],
          },
        },
      ],
      hasMore: true,
    }

    return Response.json(mockData)
  }
}
