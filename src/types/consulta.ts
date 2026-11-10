
export interface Consulta {
  id: number;
  paciente_id: number;
  profissional_id: number;
  especialidade_id: number;
  inicio_em: string;
  fim_em: string;
  status: string;
  cancelado_em: string | null;
  cancelador_por: number | null;
  criado_por: number;
  criado_em: string;
  atualizado_em: string;
}

export interface ConsultaExibicao {
  id: number;
  medico: string;
  especialidade: string;
  inicio_em: string;
  fim_em: string;
  status: string;
}

export interface ConsultaDados {
  paciente_id: number;
  profissional_id: number;
  especialidade_id: number;
  inicio_em: string;
  fim_em: string;
}

export interface ConsultaCriada {
  id: number;
  paciente_id: number;
  profissional_id: number;
  especialidade_id: number;
  inicio_em: string;
  fim_em: string;
  status: string;
  cancelado_em: string | null;
  criado_em: string;
}

export interface ConsultaHorario {
  id: number;
  paciente_id: number;
  profissional_id: number;
  especialidade_id: number;
  inicio_em: string;
  fim_em: string;
  status: string;
}
