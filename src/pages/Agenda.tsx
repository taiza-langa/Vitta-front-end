
import { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";
import { buscarConsultas } from "../services/consultasService";
import type { ConsultaExibicao } from "../types/consulta";
import { ConsultaCard } from "../components/ui/ConsultaCard";

export default function Agenda() {
  const [consultas, setConsultas] = useState<ConsultaExibicao[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    buscarConsultas()
      .then(setConsultas)
      .finally(() => setCarregando(false));
  }, []);

  function reagendarConsulta() {
    alert("A função de reagendamento será implementada depois.");
  }

  function cancelarConsulta() {
    alert("A função de cancelamento será implementada depois.");
  }

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

        {carregando ? (
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
                onCancelar={cancelarConsulta}
              />
            ))}
          </div>
        )}

        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() =>
              alert("O fluxo de agendamento será implementado depois.")
            }
            className="w-full rounded-2xl bg-[#28796D] px-6 py-4 font-semibold text-white transition hover:bg-[#22695F] sm:w-auto sm:min-w-72"
          >
            Agendar nova consulta
          </button>
        </div>
      </div>
    </section>
  );
}
