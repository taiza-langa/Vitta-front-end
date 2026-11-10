import type { Agenda } from "../types/agenda";
import {
  duracaoConsultaMinutos,
  intervaloHorariosAgendamentoMinutos,
} from "./configuracaoAgendamento";

export function gerarHorariosAgendamento(
  agendas: Agenda[],
  profissionalId: number,
  data: string,
): string[] {
  const horarios = new Set<string>();
  const agora = new Date();
  const dataHoje = [
    agora.getFullYear(),
    String(agora.getMonth() + 1).padStart(2, "0"),
    String(agora.getDate()).padStart(2, "0"),
  ].join("-");
  const horarioAtualEmMinutos = agora.getHours() * 60 + agora.getMinutes();

  agendas
    .filter(
      (agenda) =>
        agenda.profissionalId === profissionalId &&
        agenda.data.slice(0, 10) === data,
    )
    .forEach((agenda) => {
      const inicioTexto = agenda.horarioInicial.slice(11, 16);
      const fimTexto = agenda.horarioFinal.slice(11, 16);
      const [horaInicial, minutoInicial] = inicioTexto.split(":").map(Number);
      const [horaFinal, minutoFinal] = fimTexto.split(":").map(Number);
      const inicio = horaInicial * 60 + minutoInicial;
      const fim = horaFinal * 60 + minutoFinal;

      for (
        let horario = inicio;
        horario + duracaoConsultaMinutos <= fim;
        horario += duracaoConsultaMinutos + intervaloHorariosAgendamentoMinutos
      ) {
        if (data === dataHoje && horario <= horarioAtualEmMinutos) continue;
        const horas = String(Math.floor(horario / 60)).padStart(2, "0");
        const minutos = String(horario % 60).padStart(2, "0");
        horarios.add(`${horas}:${minutos}`);
      }
    });

  return [...horarios].sort();
}
