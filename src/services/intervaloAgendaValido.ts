export function intervaloAgendaValido(
  horarioInicial: string,
  horarioFinal: string,
): boolean {
  const [horaInicial, minutoInicial] = horarioInicial.split(":").map(Number);
  const [horaFinal, minutoFinal] = horarioFinal.split(":").map(Number);
  const inicioEmMinutos = horaInicial * 60 + minutoInicial;
  const fimEmMinutos = horaFinal * 60 + minutoFinal;

  return fimEmMinutos - inicioEmMinutos >= 60;
}
