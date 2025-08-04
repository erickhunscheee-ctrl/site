import { Hero } from "@/components/hero"
import { Portfolio } from "@/components/portfolio"
import { BlogPreview } from "@/components/blog-preview"
import { VercelV0Chat } from "@/components/ui/v0-ai-chat"

export default function Home() {
  return (
    <>
      <Hero />
      <section className="py-20 bg-[#0a0a0a]">
        <VercelV0Chat />
      </section>
      <Portfolio />
      <BlogPreview />
    </>
  )
}
