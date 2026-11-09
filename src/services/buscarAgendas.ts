import { getJson } from "./getJson";
import { mapearAgenda } from "./mapearAgenda";
import type { Agenda, AgendaApi } from "../types/agenda";

export async function buscarAgendas(): Promise<Agenda[]> {
  const agendas = await getJson<AgendaApi[]>("/agendas");
  return agendas.map(mapearAgenda);
}
