import type { Agenda, AgendaApi } from "../types/agenda";

export function mapearAgenda(api: AgendaApi): Agenda {
  return {
    id: api.id,
    profissionalId: api.profissional_id,
    data: api.data,
    horarioInicial: api.horario_inicial,
    horarioFinal: api.horario_final,
    criadoPor: api.criado_por,
    criadoEm: api.criado_em,
  };
}
