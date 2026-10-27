export interface Especialidade {
  id: number;
  nome: string;
}

export interface Profissional {
  id: number;
  nome: string;
  email: string | null;
  telefone: string | null;
  profissionalEspecialidades: Array<{
    especialidade: Especialidade;
  }>;
}

export interface ProfissionalDados {
  nome: string;
  email: string | null;
  telefone: string | null;
  especialidade_ids: number[];
}
