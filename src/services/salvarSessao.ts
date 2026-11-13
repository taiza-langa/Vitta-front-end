import type { Sessao } from "../types/usuario";

export function salvarSessao(sessao: Sessao): void {
  localStorage.setItem("vitta-sessao", JSON.stringify(sessao));
}
