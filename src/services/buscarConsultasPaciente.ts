import { getJson } from "./getJson";
import type { ConsultaHorario } from "../types/consulta";

export async function buscarConsultasPaciente(
  pacienteId: number,
): Promise<ConsultaHorario[]> {
  return getJson<ConsultaHorario[]>(
    `/consultas?paciente_id=${encodeURIComponent(pacienteId)}`,
  );
}
