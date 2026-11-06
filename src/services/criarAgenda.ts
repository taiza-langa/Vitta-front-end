import { apiRequest } from "./apiRequest";
import type { Agenda, AgendaDados } from "../types/agenda";

export async function criarAgenda(dados: AgendaDados): Promise<Agenda> {
  const response = await apiRequest("/agendas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });

  return response.json() as Promise<Agenda>;
}
