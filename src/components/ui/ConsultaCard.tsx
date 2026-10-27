
import {
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import type { ConsultaExibicao } from "../../types/consulta";

interface ConsultaCardProps {
  consulta: ConsultaExibicao;
  modo: "agenda" | "historico";
  onReagendar?: (id: number) => void;
  onCancelar?: (id: number) => void;
}

export function ConsultaCard({
  consulta,
  modo,
  onReagendar,
  onCancelar,
}: ConsultaCardProps) {
  const [ano, mes, dia] = consulta.inicio_em.split("T")[0].split("-");

  const data = {
    dia: dia.padStart(2, "0"),
    mes: new Date(Number(ano), Number(mes) - 1, Number(dia))
      .toLocaleDateString("pt-BR", { month: "short" })
      .replace(".", "")
      .toUpperCase(),
  };

  const horario = consulta.inicio_em.split("T")[1]?.slice(0, 5) ?? "";
  const cancelada = consulta.status.toUpperCase() === "CANCELADA";
  const concluida = consulta.status.toUpperCase() === "CONCLUÍDA";

  return (
    <article className="rounded-3xl border border-gray-200/80 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6">
      <div className="flex gap-4">
        <div className="flex h-20 w-[68px] shrink-0 flex-col items-center justify-center rounded-2xl bg-[#E4F3EF] text-[#28796D]">
          <span className="text-2xl font-semibold">{data.dia}</span>
          <span className="mt-1 text-[10px] font-semibold">{data.mes}</span>
        </div>

        <div className="min-w-0 flex-1">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
              cancelada
                ? "bg-red-50 text-red-600"
                : "bg-[#E4F3EF] text-[#28796D]"
            }`}
          >
            {modo === "historico" || concluida ? (
              <CheckCircle2 size={12} />
            ) : cancelada ? (
              <XCircle size={12} />
            ) : null}
            {consulta.status}
          </span>

          <h3 className="mt-2 break-words font-medium text-gray-800">
            {consulta.medico}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            {consulta.especialidade}
          </p>

          <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
            <Clock size={15} />
            {horario}
          </div>
        </div>
      </div>

      {modo === "agenda" && !cancelada && !concluida && (
        <div className="mt-6 flex flex-wrap justify-end gap-2 border-t border-gray-100 pt-4">
          <button
            type="button"
            onClick={() => onReagendar?.(consulta.id)}
            className="rounded-xl border border-[#C9E0D9] px-3 py-2 text-xs font-medium text-[#28796D] transition hover:bg-[#F0F8F5]"
          >
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 size={14} />
              Reagendar
            </span>
          </button>

          <button
            type="button"
            onClick={() => onCancelar?.(consulta.id)}
            className="rounded-xl border border-red-200 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50"
          >
            <span className="inline-flex items-center gap-1.5">
              <XCircle size={14} />
              Cancelar
            </span>
          </button>
        </div>
      )}
    </article>
  );
}
