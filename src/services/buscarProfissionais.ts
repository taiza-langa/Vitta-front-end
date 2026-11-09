import { getJson } from "./getJson";
import { mapearProfissional } from "./mapearProfissional";
import type { Profissional, ProfissionalApi } from "../types/catalogo";

export async function buscarProfissionais(): Promise<Profissional[]> {
  const profissionais = await getJson<ProfissionalApi[]>("/profissionais");
  return profissionais.map(mapearProfissional);
}
