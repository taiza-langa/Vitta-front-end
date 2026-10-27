
import type { ConsultaExibicao } from "../types/consulta";

export const historicoMock: ConsultaExibicao[] = [
  {
    id: 5,
    medico: "Dr. Lucas Mendes",
    especialidade: "Clínico geral",
    inicio_em: "2026-05-12T10:15:00",
    fim_em: "2026-05-12T10:45:00",
    status: "CONCLUÍDA",
  },
  {
    id: 6,
    medico: "Dra. Ana Oliveira",
    especialidade: "Cardiologia",
    inicio_em: "2026-04-20T14:30:00",
    fim_em: "2026-04-20T15:00:00",
    status: "CONCLUÍDA",
  },
];
