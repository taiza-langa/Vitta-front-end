export function formatarDataAgenda(data: string): string {
  const [ano, mes, dia] = data.split("T")[0].split("-").map(Number);
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    timeZone: "UTC",
  })
    .format(new Date(Date.UTC(ano, mes - 1, dia)))
    .replace(".", "");
}
