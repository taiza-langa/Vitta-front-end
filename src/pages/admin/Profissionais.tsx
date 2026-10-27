import { Pencil, Trash2 } from "lucide-react";
import { ProfissionalForm } from "../../components/forms/ProfissionalForm";
import { Toast } from "../../components/ui/Toast";
import { useProfissionais } from "../../hooks/useProfissionais";

export default function Profissionais() {
  const {
    profissionais,
    especialidades,
    profissionalEditando,
    nome,
    setNome,
    email,
    setEmail,
    telefone,
    setTelefone,
    especialidadeIds,
    carregando,
    salvando,
    excluindoId,
    erro,
    toast,
    iniciarEdicao,
    cancelarEdicao,
    salvarProfissional,
    removerProfissional,
    fecharToast,
    alternarEspecialidade,
  } = useProfissionais();

  return (
    <section className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-start gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(19rem,0.9fr)] lg:gap-6">
        <section className="overflow-hidden rounded-3xl border border-[#DFE9E5] bg-white shadow-[0_8px_24px_rgba(25,63,57,0.06)]">
          <header className="border-b border-[#E8EFEC] px-5 py-5 sm:px-6">
            <h1 className="font-medium text-[#193F39]">
              Profissionais cadastrados
            </h1>
            <p className="mt-1 text-xs text-[#7D9290]">
              {profissionais.length}{" "}
              {profissionais.length === 1 ? "registro" : "registros"}
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
              Carregando profissionais...
            </p>
          ) : profissionais.length === 0 ? (
            <p className="px-5 py-12 text-center text-sm text-[#7D9290]">
              Nenhum profissional cadastrado. Use o formulário para adicionar o
              primeiro.
            </p>
          ) : (
            <>
              <div className="hidden grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)_8.5rem] gap-4 bg-[#F5F8F7] px-5 py-3 text-[10px] font-semibold uppercase tracking-wide text-[#718884] sm:grid sm:px-6">
                <span>Nome / profissional</span>
                <span>Contato</span>
                <span>Especialidade</span>
                <span className="text-right">Ações</span>
              </div>

              <ul className="divide-y divide-[#E8EFEC]">
                {profissionais.map((profissional) => (
                  <li
                    key={profissional.id}
                    className="flex flex-col gap-3 px-5 py-4 sm:grid sm:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)_8.5rem] sm:items-center sm:gap-4 sm:px-6"
                  >
                    <span className="break-words text-sm font-semibold text-[#193F39]">
                      {profissional.nome}
                    </span>
                    <span className="break-all text-xs leading-5 text-[#718884]">
                      {profissional.email || profissional.telefone ? (
                        <>
                          {profissional.email && (
                            <span className="block">{profissional.email}</span>
                          )}
                          {profissional.telefone && (
                            <span className="block">{profissional.telefone}</span>
                          )}
                        </>
                      ) : (
                        "Sem contato informado"
                      )}
                    </span>
                    <span className="text-xs text-[#718884]">
                      {profissional.profissionalEspecialidades.length > 0
                        ? profissional.profissionalEspecialidades
                            .map(({ especialidade }) => especialidade.nome)
                            .join(", ")
                        : "Sem especialidade vinculada"}
                    </span>
                    <div className="flex items-center gap-2 sm:justify-end">
                      <button
                        type="button"
                        onClick={() => iniciarEdicao(profissional)}
                        disabled={salvando || excluindoId !== null}
                        aria-label={`Editar ${profissional.nome}`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[#D8E3DF] px-3 py-2 text-xs font-medium text-[#28796D] transition hover:bg-[#F0F8F5] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Pencil size={14} />
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => removerProfissional(profissional)}
                        disabled={salvando || excluindoId !== null}
                        aria-label={`Excluir ${profissional.nome}`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Trash2 size={14} />
                        {excluindoId === profissional.id
                          ? "Excluindo..."
                          : "Excluir"}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>

        <ProfissionalForm
          nome={nome}
          email={email}
          telefone={telefone}
          especialidadeIds={especialidadeIds}
          especialidades={especialidades}
          editando={profissionalEditando !== null}
          salvando={salvando}
          onNomeChange={setNome}
          onEmailChange={setEmail}
          onTelefoneChange={setTelefone}
          onToggleEspecialidade={alternarEspecialidade}
          onSubmit={salvarProfissional}
          onCancelarEdicao={cancelarEdicao}
        />
      </div>

      {toast && (
        <Toast
          key={toast.id}
          message={toast.message}
          variant={toast.variant}
          onClose={fecharToast}
        />
      )}
    </section>
  );
}
