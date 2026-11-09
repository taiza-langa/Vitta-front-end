import { apiRequest } from "./apiRequest";
import { mapearProfissional } from "./mapearProfissional";
import type {
  Profissional,
  ProfissionalApi,
  ProfissionalDados,
} from "../types/catalogo";

export async function criarProfissional(
  dados: ProfissionalDados,
): Promise<Profissional> {
  const response = await apiRequest("/profissionais", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });

  const profissional: ProfissionalApi = await response.json();
  return mapearProfissional(profissional);
}
