import type { FormEvent } from "react";
import type { Profissional } from "../../types/catalogo";
import { intervaloAgendaValido } from "../../services/intervaloAgendaValido";

interface AgendaFormProps {
  profissionais: Profissional[];
  profissionalId: string;
  data: string;
  horarioInicial: string;
  horarioFinal: string;
  salvando: boolean;
  onProfissionalChange: (value: string) => void;
  onDataChange: (value: string) => void;
  onHorarioInicialChange: (value: string) => void;
  onHorarioFinalChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function AgendaForm({
  profissionais,
  profissionalId,
  data,
  horarioInicial,
  horarioFinal,
  salvando,
  onProfissionalChange,
  onDataChange,
  onHorarioInicialChange,
  onHorarioFinalChange,
  onSubmit,
}: AgendaFormProps) {
  return (
    <section className="overflow-visible rounded-3xl border border-[#DFE9E5] bg-white shadow-[0_8px_24px_rgba(25,63,57,0.06)]">
      <header className="border-b border-[#E8EFEC] px-5 py-5 sm:px-6">
        <h2 className="font-medium text-[#193F39]">Nova agenda</h2>
        <p className="mt-1 text-xs text-[#7D9290]">
          Preencha as informações abaixo
        </p>
      </header>

      <form className="space-y-4 p-5 sm:p-6" onSubmit={onSubmit}>
        <div>
          <label
            htmlFor="profissional-agenda"
            className="mb-2 block text-xs font-semibold text-[#193F39]"
          >
            Profissional
          </label>
          <select
            id="profissional-agenda"
            value={profissionalId}
            onChange={(event) => onProfissionalChange(event.target.value)}
            required
            disabled={salvando || profissionais.length === 0}
            className="w-full rounded-xl border border-[#D8E3DF] bg-white px-3 py-3 text-sm text-[#193F39] outline-none transition focus:border-[#2D806F] focus:ring-2 focus:ring-[#2D806F]/15 disabled:bg-[#F4F7F6]"
          >
            <option value="">
              {profissionais.length
                ? "Selecione uma opção"
                : "Cadastre um profissional primeiro"}
            </option>
            {profissionais.map((profissional) => (
              <option key={profissional.id} value={profissional.id}>
                {profissional.nome}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="data-agenda"
            className="mb-2 block text-xs font-semibold text-[#193F39]"
          >
            Data
          </label>
          <input
            id="data-agenda"
            type="date"
            value={data}
            onChange={(event) => onDataChange(event.target.value)}
            required
            disabled={salvando}
            className="w-full rounded-xl border border-[#D8E3DF] px-3 py-3 text-sm text-[#193F39] outline-none transition focus:border-[#2D806F] focus:ring-2 focus:ring-[#2D806F]/15 disabled:bg-[#F4F7F6]"
          />
        </div>

        <div>
          <label
            htmlFor="horario-inicial-agenda"
            className="mb-2 block text-xs font-semibold text-[#193F39]"
          >
            Horário inicial
          </label>
          <input
            id="horario-inicial-agenda"
            type="time"
            value={horarioInicial}
            onChange={(event) => onHorarioInicialChange(event.target.value)}
            required
            disabled={salvando}
            className="w-full rounded-xl border border-[#D8E3DF] px-3 py-3 text-sm text-[#193F39] outline-none transition focus:border-[#2D806F] focus:ring-2 focus:ring-[#2D806F]/15 disabled:bg-[#F4F7F6]"
          />
        </div>

        <div>
          <label
            htmlFor="horario-final-agenda"
            className="mb-2 block text-xs font-semibold text-[#193F39]"
          >
            Horário final
          </label>
          <input
            id="horario-final-agenda"
            type="time"
            value={horarioFinal}
            onChange={(event) => onHorarioFinalChange(event.target.value)}
            required
            disabled={salvando}
            className="w-full rounded-xl border border-[#D8E3DF] px-3 py-3 text-sm text-[#193F39] outline-none transition focus:border-[#2D806F] focus:ring-2 focus:ring-[#2D806F]/15 disabled:bg-[#F4F7F6]"
          />
        </div>

        <button
          type="submit"
          disabled={
            salvando ||
            profissionais.length === 0 ||
            !profissionalId ||
            !data ||
            !horarioInicial ||
            !horarioFinal ||
            !intervaloAgendaValido(horarioInicial, horarioFinal)
          }
          className="w-full rounded-xl bg-[#2D806F] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#246F60] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {salvando ? "Salvando..." : "Salvar cadastro"}
        </button>
      </form>
    </section>
  );
}
