"use server"

import { createServerClient } from "@/lib/supabase/server"

export async function adicionarAvaliacao(formData: FormData) {
  const usuario = formData.get("usuario")?.toString()
  const texto = formData.get("texto")?.toString()
  const estrelas = Number.parseInt(formData.get("estrelas")?.toString() || "5")

  if (!usuario || !texto) {
    return { error: "Usuário e texto são obrigatórios" }
  }

  const supabase = createServerClient()

  const { error } = await supabase.from("avaliacoes").insert([{ usuario, texto, estrelas }])

  if (error) {
    return { error: error.message }
  }

  return { success: "Avaliação adicionada com sucesso!" }
}

export async function buscarDadosPortal(token: string) {
  if (!token) {
    return { error: "Token é obrigatório" }
  }

  const supabase = createServerClient()

  const { data, error } = await supabase.from("portal_empresa").select("*").eq("token", token).single()

  if (error) {
    return { error: "Token não encontrado" }
  }

  return { data }
}

export async function buscarAvaliacoes() {
  const supabase = createServerClient()

  const { data, error } = await supabase.from("avaliacoes").select("*").order("data", { ascending: false }).limit(10)

  if (error) {
    return { error: error.message }
  }

  return { data }
}
