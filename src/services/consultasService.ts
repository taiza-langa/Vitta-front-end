
import type { ConsultaExibicao } from "../types/consulta";
import { consultasMock } from "./consultasMock";

export async function buscarConsultas(): Promise<ConsultaExibicao[]> {
  return consultasMock;
}
