export function formatarDiaAgendamento(data: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date(`${data}T12:00:00`));
}
