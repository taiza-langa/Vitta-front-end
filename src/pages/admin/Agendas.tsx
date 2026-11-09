import { useState } from "react";
import { CalendarDays, Pencil, Trash2 } from "lucide-react";
import { AgendaForm } from "../../components/forms/AgendaForm";
import { Toast } from "../../components/ui/Toast";
import { useAgendas } from "../../hooks/useAgendas";
import { useSalvarAgenda } from "../../hooks/useSalvarAgenda";
import { excluirAgenda } from "../../services/excluirAgenda";
import { formatarDataAgenda } from "../../services/formatarDataAgenda";
import { formatarHorarioAgenda } from "../../services/formatarHorarioAgenda";
import type { Agenda } from "../../types/agenda";

export default function Agendas() {
  const { agendas, setAgendas, profissionais, carregando, erro } = useAgendas();
  const [profissionalId, setProfissionalId] = useState("");
  const [data, setData] = useState("");
  const [horarioInicial, setHorarioInicial] = useState("");
  const [horarioFinal, setHorarioFinal] = useState("");
  const [agendaEditando, setAgendaEditando] = useState<Agenda | null>(null);
  const [salvando, setSalvando] = useState(false);
  const [excluindoId, setExcluindoId] = useState<number | null>(null);
  const [toast, setToast] = useState<{
    id: number;
    message: string;
    variant: "success" | "error";
  } | null>(null);
  const salvarAgenda = useSalvarAgenda({
    profissionalId,
    data,
    horarioInicial,
    horarioFinal,
    agendaEditando,
    setAgendas,
    setAgendaEditando,
    setProfissionalId,
    setData,
    setHorarioInicial,
    setHorarioFinal,
    setSalvando,
    setToast,
  });

  return (
    <section className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-start gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(19rem,0.9fr)] lg:gap-6">
        <section className="overflow-hidden rounded-3xl border border-[#DFE9E5] bg-white shadow-[0_8px_24px_rgba(25,63,57,0.06)]">
          <header className="border-b border-[#E8EFEC] px-5 py-5 sm:px-6">
            <h1 className="font-medium text-[#193F39]">Agendas disponíveis</h1>
            <p className="mt-1 text-xs text-[#7D9290]">
              {agendas.length} {agendas.length === 1 ? "registro" : "registros"}
            </p>
          </header>

          {erro && (
            <p
              role="alert"
              className="mx-5 mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 sm:mx-6"
            >
              {erro}
            </p>
          )}

          {carregando ? (
            <p className="px-5 py-12 text-center text-sm text-[#7D9290]">
              Carregando agendas...
            </p>
          ) : agendas.length === 0 ? (
            <div className="px-5 py-12 text-center">
              <CalendarDays className="mx-auto text-gray-400" size={32} />
              <p className="mt-3 text-sm text-[#7D9290]">
                Nenhum horário disponível cadastrado.
              </p>
            </div>
          ) : (
            <>
              <div className="hidden grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)_10rem] gap-4 bg-[#F5F8F7] px-5 py-3 text-[10px] font-semibold uppercase tracking-wide text-[#718884] sm:grid sm:px-6">
                <span>Nome / profissional</span>
                <span>Informação</span>
                <span>Detalhes</span>
                <span className="text-right">Ações</span>
              </div>
              <ul className="divide-y divide-[#E8EFEC]">
                {agendas.map((agenda) => (
                  <li
                    key={agenda.id}
                    className="flex flex-col gap-2 px-5 py-4 sm:grid sm:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)_10rem] sm:items-center sm:gap-4 sm:px-6"
                  >
                    <span className="break-words text-sm font-semibold text-[#193F39]">
                      {profissionais.find(
                        (profissional) => profissional.id === agenda.profissionalId,
                      )?.nome ?? `Profissional ${agenda.profissionalId}`}
                    </span>
                    <span className="text-xs text-[#718884]">
                      {formatarDataAgenda(agenda.data)}
                    </span>
                    <span className="text-xs text-[#718884]">
                      {formatarHorarioAgenda(agenda.horarioInicial)} –{" "}
                      {formatarHorarioAgenda(agenda.horarioFinal)}
                    </span>
                    <div className="flex items-center gap-2 sm:justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          setAgendaEditando(agenda);
                          setProfissionalId(String(agenda.profissionalId));
                          setData(agenda.data.split("T")[0]);
                          setHorarioInicial(formatarHorarioAgenda(agenda.horarioInicial));
                          setHorarioFinal(formatarHorarioAgenda(agenda.horarioFinal));
                        }}
                        disabled={salvando || excluindoId !== null}
                        aria-label={`Editar agenda de ${formatarDataAgenda(agenda.data)}`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[#D8E3DF] px-3 py-2 text-xs font-medium text-[#28796D] transition hover:bg-[#F0F8F5] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Pencil size={14} />
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          if (
                            !window.confirm(
                              "Deseja excluir este horário disponível?",
                            )
                          ) {
                            return;
                          }

                          setExcluindoId(agenda.id);
                          try {
                            await excluirAgenda(agenda.id);
                            setAgendas((atuais) =>
                              atuais.filter((item) => item.id !== agenda.id),
                            );
                            if (agendaEditando?.id === agenda.id) {
                              setAgendaEditando(null);
                              setProfissionalId("");
                              setData("");
                              setHorarioInicial("");
                              setHorarioFinal("");
                            }
                            setToast((atual) => ({
                              id: (atual?.id ?? 0) + 1,
                              message: "Agenda excluída com sucesso.",
                              variant: "success",
                            }));
                          } catch (erroApi: unknown) {
                            setToast((atual) => ({
                              id: (atual?.id ?? 0) + 1,
                              message:
                                erroApi instanceof Error
                                  ? erroApi.message
                                  : "Não foi possível excluir a agenda.",
                              variant: "error",
                            }));
                          } finally {
                            setExcluindoId(null);
                          }
                        }}
                        disabled={salvando || excluindoId !== null}
                        aria-label={`Excluir agenda de ${formatarDataAgenda(agenda.data)}`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Trash2 size={14} />
                        {excluindoId === agenda.id ? "Excluindo..." : "Excluir"}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>

        <AgendaForm
          profissionais={profissionais}
          profissionalId={profissionalId}
          data={data}
          horarioInicial={horarioInicial}
          horarioFinal={horarioFinal}
          editando={agendaEditando !== null}
          salvando={salvando}
          onProfissionalChange={(value) => setProfissionalId(value)}
          onDataChange={(value) => setData(value)}
          onHorarioInicialChange={(value) => setHorarioInicial(value)}
          onHorarioFinalChange={(value) => setHorarioFinal(value)}
          onSubmit={salvarAgenda}
          onCancelarEdicao={() => {
            setAgendaEditando(null);
            setProfissionalId("");
            setData("");
            setHorarioInicial("");
            setHorarioFinal("");
          }}
        />
      </div>

      {toast && (
        <Toast
          key={toast.id}
          message={toast.message}
          variant={toast.variant}
          onClose={() => setToast(null)}
        />
      )}
    </section>
  );
}
