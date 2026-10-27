
export async function apiRequest(
  path: string,
  options?: RequestInit,
): Promise<Response> {
  const response = await fetch(`/api${path}`, options);

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

export async function getJson<T>(path: string): Promise<T> {
  const response = await apiRequest(path);
  return response.json() as Promise<T>;
}
