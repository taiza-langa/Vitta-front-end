export interface Especialidade {
  id: number;
  nome: string;
}

export interface Profissional {
  id: number;
  nome: string;
  email: string | null;
  telefone: string | null;
}
