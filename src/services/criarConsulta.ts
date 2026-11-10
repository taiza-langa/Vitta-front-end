import { apiRequest } from "./apiRequest";
import type { ConsultaCriada, ConsultaDados } from "../types/consulta";

export async function criarConsulta(
  dados: ConsultaDados,
): Promise<ConsultaCriada> {
  const response = await apiRequest("/consultas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });

  const consulta: ConsultaCriada = await response.json();
  return consulta;
}
