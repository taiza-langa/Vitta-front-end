
import type { ConsultaExibicao } from "../types/consulta";
import { historicoMock } from "./historicoMock";

export async function buscarHistorico(): Promise<ConsultaExibicao[]> {
  return historicoMock;
}
