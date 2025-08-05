import { streamText } from 'ai'
import { groq } from '@ai-sdk/groq'

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    if (!process.env.GROQ_API_KEY) {
      return Response.json(
        { error: 'GROQ API key não configurada' },
        { status: 500 }
      )
    }

    const result = await streamText({
      model: groq('llama-3.1-70b-versatile'),
      messages: [
        {
          role: 'system',
          content: `Você é um assistente da empresa MOUND, uma empresa de desenvolvimento de software. 
          Responda de forma profissional e útil sobre a empresa, seus serviços (desenvolvimento web, mobile, soluções personalizadas) e tecnologias. 
          Mantenha as respostas concisas e focadas no contexto da empresa.
          A empresa está localizada em Roca Sales e oferece soluções para todas as áreas envolvidas no desenvolvimento de software.`
        },
        {
          role: 'user',
          content: message
        }
      ],
      maxTokens: 500,
      temperature: 0.7,
    })

    // Convert stream to text
    let fullResponse = ''
    for await (const chunk of result.textStream) {
      fullResponse += chunk
    }

    return Response.json({ message: fullResponse })
  } catch (error) {
    console.error('Erro na API do chat:', error)
    return Response.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
