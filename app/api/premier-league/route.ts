import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "6")
  const team = searchParams.get("team") || ""
  const date = searchParams.get("date") || ""

  if (!process.env.RAPIDAPI_KEY) {
    return NextResponse.json({
      error: "RAPIDAPI_KEY não configurada",
      matches: [],
      pagination: { page: 1, totalPages: 1, total: 0 },
    })
  }

  try {
    // Liga 39 = Premier League
    let url = `https://api-football-v1.p.rapidapi.com/v3/fixtures?league=39&season=2024&status=FT`

    if (date) {
      url += `&date=${date}`
    }

    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
        "x-rapidapi-key": process.env.RAPIDAPI_KEY,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (!data.response) {
      return NextResponse.json({
        error: "Erro na API",
        matches: [],
        pagination: { page: 1, totalPages: 1, total: 0 },
      })
    }

    let matches = data.response.map((fixture: any) => ({
      id: fixture.fixture.id,
      date: fixture.fixture.date,
      homeTeam: {
        name: fixture.teams.home.name,
        logo: fixture.teams.home.logo,
        score: fixture.goals.home || 0,
      },
      awayTeam: {
        name: fixture.teams.away.name,
        logo: fixture.teams.away.logo,
        score: fixture.goals.away || 0,
      },
      status: fixture.fixture.status.long,
      round: fixture.league.round,
    }))

    // Filtrar por time se especificado
    if (team) {
      matches = matches.filter(
        (match: any) =>
          match.homeTeam.name.toLowerCase().includes(team.toLowerCase()) ||
          match.awayTeam.name.toLowerCase().includes(team.toLowerCase()),
      )
    }

    // Ordenar por data mais recente
    matches.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())

    // Paginação
    const total = matches.length
    const totalPages = Math.ceil(total / limit)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedMatches = matches.slice(startIndex, endIndex)

    return NextResponse.json({
      matches: paginatedMatches,
      pagination: {
        page,
        totalPages,
        total,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    })
  } catch (error) {
    console.error("Erro ao buscar dados da Premier League:", error)
    return NextResponse.json({
      error: "Erro interno do servidor",
      matches: [],
      pagination: { page: 1, totalPages: 1, total: 0 },
    })
  }
}
