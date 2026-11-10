
import { CalendarDays } from "lucide-react";
import { useState } from "react";
import { AgendamentoModal } from "../components/modals/AgendamentoModal";
import { ConsultaCard } from "../components/ui/ConsultaCard";
import { Toast } from "../components/ui/Toast";
import { useAgenda } from "../hooks/useAgenda";

export default function Agenda() {
  const [modalAberto, setModalAberto] = useState(false);
  const [toast, setToast] = useState<{ id: number; message: string } | null>(
    null,
  );
  const {
    consultas,
    carregando,
    erro,
    erroAcao,
    recarregarConsultas,
    reagendarConsulta,
    cancelarConsulta,
    cancelandoId,
  } = useAgenda();

  return (
    <section className="px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E1F2ED] text-[#28796D]">
            <CalendarDays size={30} />
          </div>

          <h2 className="mt-4 text-2xl font-medium text-[#193F39] sm:text-3xl">
            Agenda
          </h2>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Suas próximas consultas ficam organizadas aqui.
          </p>
        </div>

        {erroAcao && (
          <p role="alert" className="mb-4 rounded-xl bg-red-50 p-4 text-red-700">
            {erroAcao}
          </p>
        )}

        {erro ? (
          <p role="alert" className="rounded-xl bg-red-50 p-4 text-red-700">
            {erro}
          </p>
        ) : carregando ? (
          <p className="py-10 text-center text-gray-500">
            Carregando consultas...
          </p>
        ) : consultas.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
            <CalendarDays className="mx-auto text-gray-400" size={32} />
            <p className="mt-3 font-medium text-gray-700">
              Você ainda não tem consultas agendadas.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {consultas.map((consulta) => (
              <ConsultaCard
                key={consulta.id}
                consulta={consulta}
                modo="agenda"
                onReagendar={reagendarConsulta}
                onCancelar={(consulta) => {
                  void cancelarConsulta(consulta).then((cancelada) => {
                    if (cancelada) {
                      setToast((atual) => ({
                        id: (atual?.id ?? 0) + 1,
                        message: "Consulta cancelada com sucesso.",
                      }));
                    }
                  });
                }}
                cancelando={cancelandoId === consulta.id}
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
            recarregarConsultas();
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
