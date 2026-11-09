import { apiRequest } from "./apiRequest";
import { mapearAgenda } from "./mapearAgenda";
import type { Agenda, AgendaApi, AgendaDados } from "../types/agenda";

export async function atualizarAgenda(
  id: number,
  dados: AgendaDados,
): Promise<Agenda> {
  const response = await apiRequest(`/agendas/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });

  const agenda: AgendaApi = await response.json();
  return mapearAgenda(agenda);
}
