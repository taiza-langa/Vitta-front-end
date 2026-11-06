export interface Agenda {
  id: number;
  profissionalId: number;
  data: string;
  horarioInicial: string;
  horarioFinal: string;
  criadoPor: number | null;
  criadoEm: string;
}

export interface AgendaDados {
  profissional_id: number;
  data: string;
  horario_inicial: string;
  horario_final: string;
}
