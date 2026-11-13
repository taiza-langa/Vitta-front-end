import { obterSessao } from "./obterSessao";
import { removerSessao } from "./removerSessao";

export async function apiRequest(
  path: string,
  options?: RequestInit,
): Promise<Response> {
  const headers = new Headers(options?.headers);
  const sessao = obterSessao();
  if (sessao && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${sessao.token}`);
  }

  const response = await fetch(`/api${path}`, {
    ...options,
    headers,
  });

  if (
    response.status === 401 &&
    path !== "/login" &&
    path !== "/register" &&
    sessao
  ) {
    removerSessao();
    window.dispatchEvent(new Event("vitta:session-expired"));
  }

  if (!response.ok) {
    const body: unknown = await response.json().catch(() => undefined);
    const mensagem =
      typeof body === "object" &&
      body !== null &&
      "erro" in body &&
      typeof body.erro === "string"
        ? body.erro
        : `O backend respondeu com erro (${response.status}).`;

    throw new Error(mensagem);
  }

  return response;
}
