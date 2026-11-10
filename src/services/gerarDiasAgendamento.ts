import type { Agenda } from "../types/agenda";

export function gerarDiasAgendamento(
  agendas: Agenda[],
  profissionalId: number,
): string[] {
  const hoje = new Date();
  const dataHoje = [
    hoje.getFullYear(),
    String(hoje.getMonth() + 1).padStart(2, "0"),
    String(hoje.getDate()).padStart(2, "0"),
  ].join("-");

  return [
    ...new Set(
      agendas
        .filter(
          (agenda) =>
            agenda.profissionalId === profissionalId &&
            agenda.data.slice(0, 10) >= dataHoje,
        )
        .map((agenda) => agenda.data.slice(0, 10)),
    ),
  ].sort();
}
