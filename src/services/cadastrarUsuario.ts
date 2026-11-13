import { apiRequest } from "./apiRequest";
import type { Usuario } from "../types/usuario";

export interface DadosCadastro {
  nome: string;
  email: string;
  senha: string;
  data_nascimento: string;
}

export async function cadastrarUsuario(dados: DadosCadastro): Promise<Usuario> {
  const response = await apiRequest("/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });

  return response.json() as Promise<Usuario>;
}
