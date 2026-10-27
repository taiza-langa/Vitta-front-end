import { apiRequest } from "./apiRequest";

export async function getJson<T>(path: string): Promise<T> {
  const response = await apiRequest(path);
  return response.json() as Promise<T>;
}
