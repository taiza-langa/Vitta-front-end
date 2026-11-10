import { apiRequest } from "./apiRequest";

export async function cancelarConsulta(
  id: number,
  inicioEm: string,
  fimEm: string,
): Promise<void> {
  await apiRequest(`/consultas/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      inicio_em: inicioEm.slice(0, 19),
      fim_em: fimEm.slice(0, 19),
      status: "cancelada",
    }),
  });
}
