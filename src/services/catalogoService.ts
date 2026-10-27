import { apiRequest, getJson } from "./api";

export interface Especialidade {
  id: number;
  nome: string;
}

export interface Profissional {
  id: number;
  nome: string;
  email: string | null;
  telefone: string | null;
}

export function buscarEspecialidades(): Promise<Especialidade[]> {
  return getJson<Especialidade[]>("/especialidades");
}

export async function criarEspecialidade(nome: string): Promise<Especialidade> {
  const response = await apiRequest("/especialidades", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome }),
  });

  return response.json() as Promise<Especialidade>;
}

export async function atualizarEspecialidade(
  id: number,
  nome: string,
): Promise<Especialidade> {
  const response = await apiRequest(`/especialidades/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome }),
  });

  return response.json() as Promise<Especialidade>;
}

export async function excluirEspecialidade(id: number): Promise<void> {
  await apiRequest(`/especialidades/${id}`, { method: "DELETE" });
}

export function buscarProfissionais(): Promise<Profissional[]> {
  return getJson<Profissional[]>("/profissionais");
}
