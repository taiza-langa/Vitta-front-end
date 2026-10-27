import { apiRequest } from "./apiRequest";
import type { Especialidade } from "../types/catalogo";

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
