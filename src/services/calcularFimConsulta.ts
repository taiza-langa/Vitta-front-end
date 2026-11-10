import { duracaoConsultaMinutos } from "./configuracaoAgendamento";

export function calcularFimConsulta(data: string, horario: string): string {
  const [ano, mes, dia] = data.split("-").map(Number);
  const [hora, minuto] = horario.split(":").map(Number);

  return new Date(
    Date.UTC(ano, mes - 1, dia, hora, minuto + duracaoConsultaMinutos),
  )
    .toISOString()
    .slice(0, 19);
}
