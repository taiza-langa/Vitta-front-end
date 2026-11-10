import type { ConsultaHorario } from "../types/consulta";
import { duracaoConsultaMinutos } from "./configuracaoAgendamento";

export function buscarConsultaCoincidente(
  data: string,
  horario: string,
  consultas: ConsultaHorario[],
): ConsultaHorario | undefined {
  const [horaSelecionada, minutoSelecionado] = horario.split(":").map(Number);
  const inicioSelecionado = horaSelecionada * 60 + minutoSelecionado;
  const fimSelecionado = inicioSelecionado + duracaoConsultaMinutos;

  return consultas.find((consulta) => {
    if (
      consulta.status.toUpperCase() === "CANCELADA" ||
      consulta.inicio_em.slice(0, 10) !== data
    ) {
      return false;
    }

    const [horaInicio, minutoInicio] = consulta.inicio_em
      .slice(11, 16)
      .split(":")
      .map(Number);
    const [horaFim, minutoFim] = consulta.fim_em
      .slice(11, 16)
      .split(":")
      .map(Number);
    const inicioConsulta = horaInicio * 60 + minutoInicio;
    const fimConsulta = horaFim * 60 + minutoFim;

    return inicioSelecionado < fimConsulta && fimSelecionado > inicioConsulta;
  });
}
