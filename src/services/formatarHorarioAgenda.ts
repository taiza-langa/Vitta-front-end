export function formatarHorarioAgenda(horario: string): string {
  return horario.includes("T") ? horario.slice(11, 16) : horario.slice(0, 5);
}
