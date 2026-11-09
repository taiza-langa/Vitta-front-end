import { apiRequest } from "./apiRequest";

export async function excluirAgenda(id: number): Promise<void> {
  await apiRequest(`/agendas/${id}`, { method: "DELETE" });
}
