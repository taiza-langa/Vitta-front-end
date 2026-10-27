
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
