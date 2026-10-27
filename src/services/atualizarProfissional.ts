import { apiRequest } from "./apiRequest";
import type { Profissional, ProfissionalDados } from "../types/catalogo";

export async function atualizarProfissional(
  id: number,
  dados: ProfissionalDados,
): Promise<Profissional> {
  const response = await apiRequest(`/profissionais/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });

  return response.json() as Promise<Profissional>;
}
