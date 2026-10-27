import { apiRequest } from "./apiRequest";
import type { Profissional, ProfissionalDados } from "../types/catalogo";

export async function criarProfissional(
  dados: ProfissionalDados,
): Promise<Profissional> {
  const response = await apiRequest("/profissionais", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });

  return response.json() as Promise<Profissional>;
}
