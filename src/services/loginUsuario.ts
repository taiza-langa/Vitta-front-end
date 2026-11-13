import { apiRequest } from "./apiRequest";
import type { Sessao } from "../types/usuario";

export async function loginUsuario(email: string, senha: string): Promise<Sessao> {
  const response = await apiRequest("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha }),
  });

  return response.json() as Promise<Sessao>;
}
