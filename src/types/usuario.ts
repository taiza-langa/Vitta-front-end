
export interface Usuario {
  id: number;
  nome: string;
  email: string;
  tipo: string;
  telefone?: string;
  data_nascimento?: string | null;
  criado_em?: string;
}

export interface Sessao {
  token: string;
  usuario: Usuario;
}
