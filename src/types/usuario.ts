
export type TipoUsuario = "PACIENTE" | "ADMIN";

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha_hash?: string;
  telefone?: string;
  tipo: TipoUsuario;
  data_nascimento?: string | null;
  criado_em?: string;
}
