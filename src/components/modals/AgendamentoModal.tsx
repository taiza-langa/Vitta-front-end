import { AlertCircle, CalendarDays, Plus, X } from "lucide-react";
import { useAgendamentoPaciente } from "../../hooks/useAgendamentoPaciente";
import { useModalAcessibilidade } from "../../hooks/useModalAcessibilidade";
import { useSalvarConsulta } from "../../hooks/useSalvarConsulta";
import { formatarDiaAgendamento } from "../../services/formatarDiaAgendamento";
import { formatarHorarioAgenda } from "../../services/formatarHorarioAgenda";

interface AgendamentoModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

export function AgendamentoModal({
  onClose,
  onConfirm,
}: AgendamentoModalProps) {
  useModalAcessibilidade(onClose);

  const {
    especialidades,
    profissionais,
    dias,
    horarios,
    horariosExibidos,
    carregando,
    carregandoHorariosOcupados,
    erro,
    erroHorariosOcupados,
    especialidadeId,
    setEspecialidadeId,
    profissionalId,
    setProfissionalId,
    data,
    setData,
    horario,
    setHorario,
    consultaCoincidente,
    podeConfirmar,
  } = useAgendamentoPaciente();
  const { salvarConsulta, salvando, erro: erroSalvar } = useSalvarConsulta({
    especialidadeId,
    profissionalId,
    data,
    horario,
    onSuccess: onConfirm,
  });

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-[#12332E]/45 p-0 backdrop-blur-sm sm:items-center sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="agendamento-titulo"
        className="relative max-h-[92vh] w-full max-w-[37rem] overflow-y-auto rounded-t-[2rem] bg-white p-5 shadow-2xl sm:rounded-[2rem] sm:p-6 md:p-8"
      >
        <div className="mx-auto mb-5 h-1 w-12 rounded-full bg-[#D8E3DF] sm:hidden" />
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar agendamento"
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-[#F0F5F3] text-[#718884] transition hover:bg-[#E1F2ED] hover:text-[#193F39] sm:right-6 sm:top-6"
        >
          <X size={18} />
        </button>

        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#4A9689]">
          Novo agendamento
        </p>
        <h2
          id="agendamento-titulo"
          className="mt-1 pr-12 text-xl font-medium text-[#344C48] sm:text-2xl"
        >
          Escolha seu horário
        </h2>

        <div className="mt-6 space-y-5">
          {erro && (
            <p
              role="alert"
              className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {erro}
            </p>
          )}

          {erroSalvar && (
            <p
              role="alert"
              className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {erroSalvar}
            </p>
          )}

          {erroHorariosOcupados && (
            <p
              role="alert"
              className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {erroHorariosOcupados}
            </p>
          )}

          {carregando && (
            <p role="status" className="text-sm text-[#718884]">
              Carregando especialidades, profissionais e horários disponíveis...
            </p>
          )}

          <div>
            <label
              htmlFor="especialidade-agendamento"
              className="mb-2 block text-xs font-semibold text-[#344C48]"
            >
              1. Escolha a especialidade
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-xl bg-[#E4F3EF] text-[#28796D]">
                <Plus size={18} strokeWidth={2.5} />
              </span>
              <select
                id="especialidade-agendamento"
                value={especialidadeId}
                disabled={carregando || Boolean(erro)}
                onChange={(event) => {
                  setEspecialidadeId(event.target.value);
                  setProfissionalId("");
                  setData("");
                  setHorario("");
                }}
                className="w-full appearance-none rounded-2xl border border-[#DFE9E5] bg-white py-3.5 pl-14 pr-10 text-sm text-[#193F39] outline-none transition focus:border-[#4A9689] focus:ring-2 focus:ring-[#4A9689]/15"
              >
                <option value="">
                  {especialidades.length
                    ? "Selecione uma especialidade"
                    : "Nenhuma especialidade cadastrada"}
                </option>
                {especialidades.map((especialidade) => (
                  <option key={especialidade.id} value={especialidade.id}>
                    {especialidade.nome}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#718884]">
                ˅
              </span>
            </div>
          </div>

          <div>
            <label
              htmlFor="profissional-agendamento-paciente"
              className="mb-2 block text-xs font-semibold text-[#344C48]"
            >
              2. Selecione o profissional
            </label>
            <select
              id="profissional-agendamento-paciente"
              value={profissionalId}
              onChange={(event) => {
                setProfissionalId(event.target.value);
                setData("");
                setHorario("");
              }}
              disabled={carregando || Boolean(erro) || !especialidadeId}
              className="w-full rounded-2xl border border-[#DFE9E5] bg-white px-4 py-3.5 text-sm text-[#193F39] outline-none transition focus:border-[#4A9689] focus:ring-2 focus:ring-[#4A9689]/15 disabled:bg-[#F5F8F7] disabled:text-[#9AABA7]"
            >
              <option value="">Selecione um profissional</option>
              {profissionais.map((profissional) => (
                <option key={profissional.id} value={profissional.id}>
                  {profissional.nome}
                </option>
              ))}
            </select>
            {!carregando &&
              especialidadeId &&
              profissionais.length === 0 && (
                <p className="mt-2 text-xs text-[#7D9290]">
                  Não há profissionais cadastrados para essa especialidade.
                </p>
              )}
          </div>

          <div>
            <label
              htmlFor="dia-agendamento-paciente"
              className="mb-2 block text-xs font-semibold text-[#344C48]"
            >
              3. Escolha o dia
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-xl bg-[#E4F3EF] text-[#28796D]">
                <CalendarDays size={18} />
              </span>
              <select
                id="dia-agendamento-paciente"
                value={data}
                onChange={(event) => {
                  setData(event.target.value);
                  setHorario("");
                }}
                disabled={
                  carregando ||
                  Boolean(erro) ||
                  !profissionalId ||
                  dias.length === 0
                }
                className="w-full appearance-none rounded-2xl border border-[#DFE9E5] bg-white py-3.5 pl-14 pr-10 text-sm capitalize text-[#193F39] outline-none transition focus:border-[#4A9689] focus:ring-2 focus:ring-[#4A9689]/15 disabled:bg-[#F5F8F7] disabled:text-[#9AABA7]"
              >
                <option value="">Selecione uma data</option>
                {dias.map((dia) => (
                  <option key={dia} value={dia}>
                    {formatarDiaAgendamento(dia)}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#718884]">
                ˅
              </span>
            </div>
            {!carregando &&
              !erro &&
              profissionalId &&
              dias.length === 0 && (
                <p className="mt-2 text-xs text-[#7D9290]">
                  Não há datas futuras disponíveis para este profissional.
                </p>
              )}
          </div>

          <fieldset>
            <legend className="mb-2 block text-xs font-semibold text-[#344C48]">
              4. Escolha o horário
            </legend>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
              {horariosExibidos.map((opcao) => (
                  <button
                    key={opcao}
                    type="button"
                    disabled={!data}
                    aria-pressed={horario === opcao}
                    onClick={() => setHorario(opcao)}
                    className={`rounded-xl border px-2 py-3 text-xs font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${
                      horario === opcao
                        ? "border-[#62A99C] bg-[#E4F3EF] font-semibold text-[#28796D]"
                        : "border-[#DFE9E5] bg-white text-[#718884] hover:border-[#8EBEB4] hover:bg-[#F5FAF8]"
                    }`}
                  >
                    {opcao}
                  </button>
              ))}
            </div>
          </fieldset>

          {carregandoHorariosOcupados && (
            <p role="status" className="text-xs text-[#7D9290]">
              Carregando horários disponíveis...
            </p>
          )}

          {!carregandoHorariosOcupados &&
            !erroHorariosOcupados &&
            data &&
            horarios.length > 0 &&
            horariosExibidos.length === 0 && (
              <p className="text-xs text-[#7D9290]">
                Não há horários disponíveis para este dia.
              </p>
            )}

          {data && horarios.length === 0 && (
            <p className="text-xs text-[#7D9290]">
              Não há horários disponíveis cadastrados para este dia.
            </p>
          )}

          {consultaCoincidente && (
            <div
              role="status"
              className="flex gap-3 rounded-2xl border border-[#F4D6D1] bg-[#FFF2F0] p-3 text-[#B95449]"
            >
              <AlertCircle size={20} className="mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-semibold">
                  Atenção: horários coincidentes
                </p>
                <p className="mt-1 text-[11px] leading-4">
                  Você já possui uma consulta em{" "}
                  {formatarDiaAgendamento(data)} às{" "}
                  {formatarHorarioAgenda(consultaCoincidente.inicio_em)}.
                  Escolha outro horário para continuar.
                </p>
              </div>
            </div>
          )}

          <button
            type="button"
            disabled={!podeConfirmar || salvando}
            onClick={salvarConsulta}
            className="w-full rounded-2xl bg-[#2D806F] px-4 py-4 text-sm font-bold text-white transition hover:bg-[#246F60] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {salvando ? "Salvando agendamento..." : "Confirmar agendamento"}
          </button>
        </div>
      </section>
    </div>
  );
}
