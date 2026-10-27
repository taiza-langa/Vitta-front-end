import type { FormEvent } from "react";

interface EspecialidadeFormProps {
  nome: string;
  editando: boolean;
  salvando: boolean;
  onNomeChange: (nome: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onCancelarEdicao: () => void;
}

export function EspecialidadeForm({
  nome,
  editando,
  salvando,
  onNomeChange,
  onSubmit,
  onCancelarEdicao,
}: EspecialidadeFormProps) {
  return (
    <section className="overflow-hidden rounded-3xl border border-[#DFE9E5] bg-white shadow-[0_8px_24px_rgba(25,63,57,0.06)]">
      <header className="border-b border-[#E8EFEC] px-5 py-5 sm:px-6">
        <h2 className="font-medium text-[#193F39]">
          {editando ? "Editar especialidade" : "Nova especialidade"}
        </h2>
        <p className="mt-1 text-xs text-[#7D9290]">
          {editando
            ? "Altere o nome da especialidade"
            : "Preencha as informações abaixo"}
        </p>
      </header>

      <form className="space-y-5 p-5 sm:p-6" onSubmit={onSubmit}>
        <div>
          <label
            htmlFor="nome-especialidade"
            className="mb-2 block text-xs font-semibold text-[#193F39]"
          >
            Nome da especialidade
          </label>
          <input
            id="nome-especialidade"
            name="nome"
            type="text"
            value={nome}
            onChange={(event) => onNomeChange(event.target.value)}
            placeholder="Nome da especialidade"
            maxLength={150}
            required
            autoComplete="off"
            disabled={salvando}
            className="w-full rounded-xl border border-[#D8E3DF] px-3 py-3 text-sm text-[#193F39] outline-none transition placeholder:text-[#A0AFAC] focus:border-[#2D806F] focus:ring-2 focus:ring-[#2D806F]/15 disabled:bg-[#F4F7F6]"
          />
        </div>

        <div className="space-y-2">
          <button
            type="submit"
            disabled={salvando || !nome.trim()}
            className="w-full rounded-xl bg-[#2D806F] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#246F60] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {salvando
              ? "Salvando..."
              : editando
                ? "Salvar alterações"
                : "Salvar cadastro"}
          </button>

          {editando && (
            <button
              type="button"
              onClick={onCancelarEdicao}
              disabled={salvando}
              className="w-full rounded-xl border border-[#D8E3DF] px-4 py-3 text-sm font-semibold text-[#45615B] transition hover:bg-[#F4F8F6] disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancelar edição
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
