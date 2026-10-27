import { apiRequest } from "./apiRequest";

export async function excluirProfissional(id: number): Promise<void> {
  await apiRequest(`/profissionais/${id}`, { method: "DELETE" });
}
