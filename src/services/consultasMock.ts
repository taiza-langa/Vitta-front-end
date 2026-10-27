
import type { ConsultaExibicao } from "../types/consulta";

export const consultasMock: ConsultaExibicao[] = [
  {
    id: 1,
    medico: "Dra. Ana Oliveira",
    especialidade: "Cardiologia",
    inicio_em: "2026-11-18T14:30:00",
    fim_em: "2026-11-18T15:00:00",
    status: "AGENDADA",
  },
  {
    id: 2,
    medico: "Dr. Lucas Mendes",
    especialidade: "Clínico geral",
    inicio_em: "2026-11-25T09:30:00",
    fim_em: "2026-11-25T10:00:00",
    status: "AGENDADA",
  },
];
