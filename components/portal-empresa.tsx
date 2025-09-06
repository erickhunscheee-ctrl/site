"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { FileText, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { buscarDadosPortal } from "@/lib/actions"

interface DadosPortal {
  empresa: string
  data_hora: string
  token: string
  pdf: string | null
  status_servico: "aberto" | "orçamento" | "em andamento" | "entregue"
}

export function PortalEmpresa() {
  const [token, setToken] = useState("")
  const [dados, setDados] = useState<DadosPortal | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleBuscar = async () => {
    if (!token.trim()) {
      setError("Digite um token válido")
      return
    }

    setLoading(true)
    setError("")

    const result = await buscarDadosPortal(token)

    if (result.error) {
      setError(result.error)
      setDados(null)
    } else {
      setDados(result.data)
    }

    setLoading(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "aberto":
        return <AlertCircle className="w-5 h-5 text-yellow-400" />
      case "orçamento":
        return <FileText className="w-5 h-5 text-blue-400" />
      case "em andamento":
        return <Clock className="w-5 h-5 text-orange-400" />
      case "entregue":
        return <CheckCircle className="w-5 h-5 text-green-400" />
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "aberto":
        return "bg-yellow-600"
      case "orçamento":
        return "bg-blue-600"
      case "em andamento":
        return "bg-orange-600"
      case "entregue":
        return "bg-green-600"
      default:
        return "bg-gray-600"
    }
  }

  return (
    <section className="py-20 px-4 ">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="texto-portal">Acesso aos Projetos e Programas</h2>
          <p className="texto-portal-pequeno">Tenha acesso a documentação e andamento dos projetos</p>
        </div>

        <Card className="bg-black border-0 border-l-4 border-[#ca1515] rounded-l-[20px] rounded-r-none md:rounded-r-none p-6 md:p-8 hover:border-l-[#cfc8c8] transition-colors group">
          <CardHeader>
            <CardTitle className="text-sm text-white">ACESSO VIA TOCKEN</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Input
                placeholder="Digite seu token de acesso"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="bg-transparent border-0"
              />
              <Button onClick={handleBuscar} disabled={loading} className="px-6 py-3 " >
                {loading ? "Buscando..." : "Buscar"}
                
              </Button>
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}
          </CardContent>
        </Card>

        {dados && (
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-[#151313] border border-[#262A2C] hover:bg-[#1a1818] transition-colors">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Informações do Projeto
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm">Empresa</label>
                  <p className="text-white font-medium">{dados.empresa}</p>
                </div>

                <div>
                  <label className="text-gray-400 text-sm">Data de Criação</label>
                  <p className="text-white">{new Date(dados.data_hora).toLocaleString("pt-BR")}</p>
                </div>

                <div>
                  <label className="text-gray-400 text-sm">Token</label>
                  <p className="text-white font-mono text-sm bg-gray-800 p-2 rounded">{dados.token}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#151313] border border-[#262A2C] hover:bg-[#1a1818] transition-colors">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  {getStatusIcon(dados.status_servico)}
                  Status do Serviço
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Badge className={`${getStatusColor(dados.status_servico)} text-white`}>
                    {dados.status_servico.toUpperCase()}
                  </Badge>
                </div>

                {dados.pdf && (
                  <div>
                    <label className="text-gray-400 text-sm">Orçamento PDF</label>
                    <div className="mt-2">
                      <Button
                        variant="outline"
                        className="w-full bg-transparent"
                        onClick={() => window.open(dados.pdf!, "_blank")}
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Visualizar PDF
                      </Button>
                    </div>
                  </div>
                )}

                {!dados.pdf && <p className="text-gray-400 text-sm">PDF do orçamento ainda não disponível</p>}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  )
}