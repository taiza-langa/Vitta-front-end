import { apiRequest } from "./apiRequest";

export async function excluirEspecialidade(id: number): Promise<void> {
  await apiRequest(`/especialidades/${id}`, { method: "DELETE" });
}
