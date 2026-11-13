import type { Sessao } from "../types/usuario";

export function obterSessao(): Sessao | null {
  const valor = localStorage.getItem("vitta-sessao");
  if (!valor) return null;

  try {
    const sessao: unknown = JSON.parse(valor);
    if (
      typeof sessao === "object" &&
      sessao !== null &&
      "token" in sessao &&
      typeof sessao.token === "string" &&
      "usuario" in sessao &&
      typeof sessao.usuario === "object" &&
      sessao.usuario !== null &&
      "id" in sessao.usuario &&
      typeof sessao.usuario.id === "number" &&
      "nome" in sessao.usuario &&
      typeof sessao.usuario.nome === "string" &&
      "email" in sessao.usuario &&
      typeof sessao.usuario.email === "string" &&
      "tipo" in sessao.usuario &&
      typeof sessao.usuario.tipo === "string"
    ) {
      return sessao as Sessao;
    }
  } catch {
    localStorage.removeItem("vitta-sessao");
    return null;
  }

  localStorage.removeItem("vitta-sessao");
  return null;
}
