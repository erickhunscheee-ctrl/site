import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactPage() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-2xl text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">Entre em Contato</h1>
        <p className="text-lg text-neutral-300 mb-12">
          Adoraríamos ouvir sobre seu projeto. Conte-nos como podemos ajudar.
        </p>
        <form className="space-y-6 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input type="text" placeholder="Seu Nome" className="bg-[#1a1a1a] border-neutral-700 text-white" />
            <Input type="email" placeholder="Seu E-mail" className="bg-[#1a1a1a] border-neutral-700 text-white" />
          </div>
          <Input type="text" placeholder="Empresa" className="bg-[#1a1a1a] border-neutral-700 text-white" />
          <Input type="text" placeholder="Assunto" className="bg-[#1a1a1a] border-neutral-700 text-white" />
          <Textarea
            placeholder="Conte-nos sobre seu projeto..."
            rows={6}
            className="bg-[#1a1a1a] border-neutral-700 text-white"
          />
          <div className="text-center">
            <Button
              type="submit"
              size="lg"
              className="bg-white text-black hover:bg-neutral-200 font-bold text-lg px-10 py-6"
            >
              Enviar Mensagem
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
