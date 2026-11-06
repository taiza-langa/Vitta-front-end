import { getJson } from "./getJson";
import type { Agenda } from "../types/agenda";

export function buscarAgendas(): Promise<Agenda[]> {
  return getJson<Agenda[]>("/agendas");
}
