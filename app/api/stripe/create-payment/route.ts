import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { amount, description } = await req.json()

    // If Stripe is set, create a real Checkout Session in test mode
    const key = process.env.STRIPE_SECRET_KEY
    if (key) {
      const { default: Stripe } = await import("stripe")
      const stripe = new Stripe(key, { apiVersion: "2024-06-20" })

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "brl",
              product_data: { name: description || "Pagamento" },
              unit_amount: Number(amount) || 100,
            },
            quantity: 1,
          },
        ],
        success_url: "https://example.com/sucesso",
        cancel_url: "https://example.com/cancelado",
      })

      return NextResponse.json({ url: session.url }, { status: 200 })
    }

    // Fallback demo: simulate a checkout link
    const demoUrl = "https://checkout.stripe.com/test/demo"
    return NextResponse.json(
      { url: demoUrl, note: "Modo demonstração: configure STRIPE_SECRET_KEY para links reais." },
      { status: 200 },
    )
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Erro ao criar pagamento" }, { status: 400 })
  }
}
