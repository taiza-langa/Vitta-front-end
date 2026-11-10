import type { HorarioOcupado } from "./buscarHorariosOcupados";
import { duracaoConsultaMinutos } from "./configuracaoAgendamento";

export function buscarHorarioOcupado(
  data: string,
  horario: string,
  horariosOcupados: HorarioOcupado[],
): HorarioOcupado | undefined {
  const [horaSelecionada, minutoSelecionado] = horario.split(":").map(Number);
  const inicioSelecionado = horaSelecionada * 60 + minutoSelecionado;
  const fimSelecionado = inicioSelecionado + duracaoConsultaMinutos;

  return horariosOcupados.find((consulta) => {
    if (consulta.inicio_em.slice(0, 10) !== data) return false;

    const [horaInicio, minutoInicio] = consulta.inicio_em
      .slice(11, 16)
      .split(":")
      .map(Number);
    const [horaFim, minutoFim] = consulta.fim_em
      .slice(11, 16)
      .split(":")
      .map(Number);

    return (
      inicioSelecionado < horaFim * 60 + minutoFim &&
      fimSelecionado > horaInicio * 60 + minutoInicio
    );
  });
}
