import type { FormEvent } from "react";
import { CheckboxMultiSelect } from "../ui/CheckboxMultiSelect";
import type { Especialidade } from "../../types/catalogo";

interface ProfissionalFormProps {
  nome: string;
  email: string;
  telefone: string;
  especialidadeIds: number[];
  especialidades: Especialidade[];
  editando: boolean;
  salvando: boolean;
  onNomeChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onTelefoneChange: (value: string) => void;
  onToggleEspecialidade: (id: number, selecionado: boolean) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onCancelarEdicao: () => void;
}

export function ProfissionalForm({
  nome,
  email,
  telefone,
  especialidadeIds,
  especialidades,
  editando,
  salvando,
  onNomeChange,
  onEmailChange,
  onTelefoneChange,
  onToggleEspecialidade,
  onSubmit,
  onCancelarEdicao,
}: ProfissionalFormProps) {
  return (
    <section className="overflow-visible rounded-3xl border border-[#DFE9E5] bg-white shadow-[0_8px_24px_rgba(25,63,57,0.06)]">
      <header className="border-b border-[#E8EFEC] px-5 py-5 sm:px-6">
        <h2 className="font-medium text-[#193F39]">
          {editando ? "Editar profissional" : "Novo profissional"}
        </h2>
        <p className="mt-1 text-xs text-[#7D9290]">
          {editando
            ? "Altere os dados do profissional"
            : "Preencha as informações abaixo"}
        </p>
      </header>

      <form className="space-y-4 p-5 sm:p-6" onSubmit={onSubmit}>
        <div>
          <label
            htmlFor="nome-profissional"
            className="mb-2 block text-xs font-semibold text-[#193F39]"
          >
            Nome completo
          </label>
          <input
            id="nome-profissional"
            name="nome"
            type="text"
            value={nome}
            onChange={(event) => onNomeChange(event.target.value)}
            placeholder="Nome completo"
            maxLength={150}
            required
            autoComplete="name"
            disabled={salvando}
            className="w-full rounded-xl border border-[#D8E3DF] px-3 py-3 text-sm text-[#193F39] outline-none transition placeholder:text-[#A0AFAC] focus:border-[#2D806F] focus:ring-2 focus:ring-[#2D806F]/15 disabled:bg-[#F4F7F6]"
          />
        </div>

        <div>
          <label
            htmlFor="email-profissional"
            className="mb-2 block text-xs font-semibold text-[#193F39]"
          >
            E-mail
          </label>
          <input
            id="email-profissional"
            name="email"
            type="email"
            value={email}
            onChange={(event) => onEmailChange(event.target.value)}
            placeholder="email@exemplo.com"
            maxLength={300}
            autoComplete="email"
            disabled={salvando}
            className="w-full rounded-xl border border-[#D8E3DF] px-3 py-3 text-sm text-[#193F39] outline-none transition placeholder:text-[#A0AFAC] focus:border-[#2D806F] focus:ring-2 focus:ring-[#2D806F]/15 disabled:bg-[#F4F7F6]"
          />
        </div>

        <div>
          <label
            htmlFor="telefone-profissional"
            className="mb-2 block text-xs font-semibold text-[#193F39]"
          >
            Telefone
          </label>
          <input
            id="telefone-profissional"
            name="telefone"
            type="tel"
            value={telefone}
            onChange={(event) => onTelefoneChange(event.target.value)}
            placeholder="(00) 00000-0000"
            maxLength={20}
            autoComplete="tel"
            disabled={salvando}
            className="w-full rounded-xl border border-[#D8E3DF] px-3 py-3 text-sm text-[#193F39] outline-none transition placeholder:text-[#A0AFAC] focus:border-[#2D806F] focus:ring-2 focus:ring-[#2D806F]/15 disabled:bg-[#F4F7F6]"
          />
        </div>

        <div>
          <fieldset disabled={salvando}>
            <legend className="mb-2 block text-xs font-semibold text-[#193F39]">
              Especialidades
            </legend>
            <CheckboxMultiSelect
              options={especialidades.map(({ id, nome }) => ({
                id,
                label: nome,
              }))}
              selectedIds={especialidadeIds}
              onChange={onToggleEspecialidade}
              disabled={salvando}
              emptyMessage="Cadastre uma especialidade primeiro."
            />
            <p className="mt-1.5 text-xs text-[#7D9290]">
              Selecione uma ou mais especialidades.
            </p>
          </fieldset>
        </div>

        <div className="space-y-2 pt-1">
          <button
            type="submit"
            disabled={
              salvando ||
              !nome.trim() ||
              especialidadeIds.length === 0 ||
              especialidades.length === 0
            }
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
