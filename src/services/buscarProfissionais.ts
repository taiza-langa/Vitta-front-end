import { getJson } from "./getJson";
import type { Profissional } from "../types/catalogo";

export function buscarProfissionais(): Promise<Profissional[]> {
  return getJson<Profissional[]>("/profissionais");
}
