import { getJson } from "./getJson";

export interface HorarioOcupado {
  inicio_em: string;
  fim_em: string;
}

export async function buscarHorariosOcupados(
  profissionalId: number,
  data: string,
): Promise<HorarioOcupado[]> {
  const query = new URLSearchParams({
    profissional_id: String(profissionalId),
    data,
  });
  return getJson<HorarioOcupado[]>(
    `/consultas/horarios-ocupados?${query.toString()}`,
  );
}
