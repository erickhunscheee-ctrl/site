import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const country = searchParams.get("country") || "br"
  const services = searchParams.get("services") || "netflix,prime,hbo,disney"
  const orderBy = searchParams.get("order_by") || "popularity"
  const type = searchParams.get("type") || "movie"
  const page = searchParams.get("page") || "1"

  const rapidApiKey = process.env.RAPIDAPI_KEY

  if (!rapidApiKey) {
    return NextResponse.json({ error: "RAPIDAPI_KEY não configurada" }, { status: 500 })
  }

  try {
    const url = `https://streaming-availability.p.rapidapi.com/shows/search/filters?country=${country}&services=${services}&order_by=${orderBy}&type=${type}&page=${page}&output_language=pt`

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "streaming-availability.p.rapidapi.com",
        "x-rapidapi-key": rapidApiKey,
      },
      cache: "no-store", // evita cache no Next.js
    })

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Erro ao buscar dados de streaming:", error)
    return NextResponse.json({ error: "Erro ao buscar dados de streaming" }, { status: 500 })
  }
}
