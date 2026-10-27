import { getJson } from "./getJson";
import type { Especialidade } from "../types/catalogo";

export function buscarEspecialidades(): Promise<Especialidade[]> {
  return getJson<Especialidade[]>("/especialidades");
}
