
import {
  CalendarDays,
  History as HistoryIcon,
} from "lucide-react";
import { useState } from "react";
import { AgendamentoModal } from "../components/modals/AgendamentoModal";
import { ConsultaCard } from "../components/ui/ConsultaCard";
import { Toast } from "../components/ui/Toast";
import { useHistorico } from "../hooks/useHistorico";

export default function Historico() {
  const [modalAberto, setModalAberto] = useState(false);
  const [toast, setToast] = useState<{ id: number; message: string } | null>(
    null,
  );
  const {
    consultasHistorico,
    carregando,
    erro,
  } = useHistorico();

  return (
    <section className="px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E1F2ED] text-[#28796D]">
            <HistoryIcon size={30} />
          </div>

          <h2 className="mt-4 text-2xl font-medium text-[#193F39] sm:text-3xl">
            Histórico
          </h2>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Consulte seus atendimentos anteriores.
          </p>
        </header>

        {erro ? (
          <p role="alert" className="rounded-xl bg-red-50 p-4 text-red-700">
            {erro}
          </p>
        ) : carregando ? (
          <p className="py-10 text-center text-gray-500">
            Carregando histórico...
          </p>
        ) : consultasHistorico.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
            <CalendarDays className="mx-auto text-gray-400" size={32} />

            <p className="mt-3 font-medium text-gray-700">
              Você ainda não possui consultas no histórico.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {consultasHistorico.map((consulta) => (
              <ConsultaCard
                key={consulta.id}
                consulta={consulta}
                modo="historico"
              />
            ))}
          </div>
        )}

        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setModalAberto(true)}
            className="w-full rounded-2xl bg-[#28796D] px-6 py-4 font-semibold text-white transition hover:bg-[#22695F] sm:w-auto sm:min-w-72"
          >
            Agendar nova consulta
          </button>
        </div>
      </div>

      {modalAberto && (
        <AgendamentoModal
          onClose={() => setModalAberto(false)}
          onConfirm={() => {
            setModalAberto(false);
            setToast((atual) => ({
              id: (atual?.id ?? 0) + 1,
              message: "Consulta agendada com sucesso.",
            }));
          }}
        />
      )}

      {toast && (
        <Toast
          key={toast.id}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </section>
  );
}
