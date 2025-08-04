import { groq } from "@ai-sdk/groq"
import { generateText } from "ai"

export async function POST(req: Request) {
  try {
    const { message, context } = await req.json()

    if (!process.env.GROQ_API_KEY) {
      console.error("GROQ_API_KEY não encontrada nas variáveis de ambiente")
      return Response.json({
        message: "Desculpe, o serviço de chat está temporariamente indisponível. Tente novamente mais tarde.",
      })
    }

    const { text } = await generateText({
      model: groq("llama-3.1-8b-instant", {
        apiKey: process.env.GROQ_API_KEY,
      }),
      system: context || "Você é um assistente útil e profissional.",
      prompt: message,
      maxTokens: 500,
      temperature: 0.7,
    })

    return Response.json({ message: text })
  } catch (error) {
    console.error("Erro na API do chat:", error)

    return Response.json({
      message:
        "Desculpe, não consegui processar sua pergunta no momento. Nossa equipe foi notificada e está trabalhando para resolver o problema.",
    })
  }
}
