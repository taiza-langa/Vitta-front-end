import { useCallback, useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { EspecialidadeForm } from "../../components/forms/EspecialidadeForm";
import { Toast } from "../../components/ui/Toast";
import type { ToastVariant } from "../../components/ui/Toast";
import {
  atualizarEspecialidade,
  buscarEspecialidades,
  criarEspecialidade,
  excluirEspecialidade,
} from "../../services/catalogoService";
import type { Especialidade } from "../../services/catalogoService";

export default function Especialidades() {
  const [especialidades, setEspecialidades] = useState<Especialidade[]>([]);
  const [especialidadeEditando, setEspecialidadeEditando] =
    useState<Especialidade | null>(null);
  const [nome, setNome] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [excluindoId, setExcluindoId] = useState<number | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    id: number;
    message: string;
    variant: ToastVariant;
  } | null>(null);

  function mostrarToast(message: string, variant: ToastVariant = "success") {
    setToast((atual) => ({ id: (atual?.id ?? 0) + 1, message, variant }));
  }

  const fecharToast = useCallback(() => setToast(null), []);

  useEffect(() => {
    let ativo = true;

    buscarEspecialidades()
      .then((dados) => {
        if (ativo) setEspecialidades(dados);
      })
      .catch((erroApi: unknown) => {
        if (ativo) {
          setErro(
            erroApi instanceof Error
              ? erroApi.message
              : "Não foi possível carregar as especialidades.",
          );
        }
      })
      .finally(() => {
        if (ativo) setCarregando(false);
      });

    return () => {
      ativo = false;
    };
  }, []);

  function iniciarEdicao(especialidade: Especialidade) {
    setEspecialidadeEditando(especialidade);
    setNome(especialidade.nome);
    setErro(null);
  }

  function cancelarEdicao() {
    setEspecialidadeEditando(null);
    setNome("");
    setErro(null);
  }

  async function salvarEspecialidade(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nomeNormalizado = nome.trim();
    if (!nomeNormalizado) return;

    setSalvando(true);
    setErro(null);

    try {
      if (especialidadeEditando) {
        const atualizada = await atualizarEspecialidade(
          especialidadeEditando.id,
          nomeNormalizado,
        );
        setEspecialidades((atuais) =>
          atuais.map((item) =>
            item.id === atualizada.id ? atualizada : item,
          ),
        );
        mostrarToast("Especialidade atualizada com sucesso.");
      } else {
        const criada = await criarEspecialidade(nomeNormalizado);
        setEspecialidades((atuais) =>
          [...atuais, criada].sort((a, b) => a.id - b.id),
        );
        mostrarToast("Especialidade cadastrada com sucesso.");
      }

      setEspecialidadeEditando(null);
      setNome("");
    } catch (erroApi: unknown) {
      mostrarToast(
        erroApi instanceof Error
          ? erroApi.message
          : "Não foi possível salvar a especialidade.",
        "error",
      );
    } finally {
      setSalvando(false);
    }
  }

  async function removerEspecialidade(especialidade: Especialidade) {
    const confirmar = window.confirm(
      `Deseja excluir a especialidade "${especialidade.nome}"?`,
    );
    if (!confirmar) return;

    setExcluindoId(especialidade.id);
    setErro(null);

    try {
      await excluirEspecialidade(especialidade.id);
      setEspecialidades((atuais) =>
        atuais.filter((item) => item.id !== especialidade.id),
      );
      if (especialidadeEditando?.id === especialidade.id) {
        cancelarEdicao();
      }
      mostrarToast("Especialidade excluída com sucesso.");
    } catch (erroApi: unknown) {
      mostrarToast(
        erroApi instanceof Error
          ? erroApi.message
          : "Não foi possível excluir a especialidade.",
        "error",
      );
    } finally {
      setExcluindoId(null);
    }
  }

  return (
    <section className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-start gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(18rem,0.9fr)] lg:gap-6">
        <section className="overflow-hidden rounded-3xl border border-[#DFE9E5] bg-white shadow-[0_8px_24px_rgba(25,63,57,0.06)]">
          <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E8EFEC] px-5 py-5 sm:px-6">
            <div>
              <h1 className="font-medium text-[#193F39]">
                Especialidades cadastradas
              </h1>
              <p className="mt-1 text-xs text-[#7D9290]">
                {especialidades.length}{" "}
                {especialidades.length === 1 ? "registro" : "registros"}
              </p>
            </div>

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
              Carregando especialidades...
            </p>
          ) : especialidades.length === 0 ? (
            <p className="px-5 py-12 text-center text-sm text-[#7D9290]">
              Nenhuma especialidade cadastrada. Use o formulário para adicionar
              a primeira.
            </p>
          ) : (
            <>
              <div className="hidden grid-cols-[minmax(0,1fr)_5rem_7rem] gap-4 bg-[#F5F8F7] px-5 py-3 text-[10px] font-semibold uppercase tracking-wide text-[#718884] sm:grid sm:px-6">
                <span>Nome da especialidade</span>
                <span>ID</span>
                <span className="text-right">Ações</span>
              </div>

              <ul className="divide-y divide-[#E8EFEC]">
                {especialidades.map((especialidade) => (
                  <li
                    key={especialidade.id}
                    className="flex flex-col gap-3 px-5 py-4 sm:grid sm:grid-cols-[minmax(0,1fr)_5rem_7rem] sm:items-center sm:gap-4 sm:px-6"
                  >
                    <span className="break-words text-sm font-semibold text-[#193F39]">
                      {especialidade.nome}
                    </span>
                    <span className="text-xs text-[#7D9290]">
                      <span className="sm:hidden">ID: </span>
                      {especialidade.id}
                    </span>
                    <div className="flex items-center gap-2 sm:justify-end">
                      <button
                        type="button"
                        onClick={() => iniciarEdicao(especialidade)}
                        disabled={salvando || excluindoId !== null}
                        aria-label={`Editar ${especialidade.nome}`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[#D8E3DF] px-3 py-2 text-xs font-medium text-[#28796D] transition hover:bg-[#F0F8F5] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Pencil size={14} />
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => removerEspecialidade(especialidade)}
                        disabled={salvando || excluindoId !== null}
                        aria-label={`Excluir ${especialidade.nome}`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Trash2 size={14} />
                        {excluindoId === especialidade.id
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

        <EspecialidadeForm
          nome={nome}
          editando={especialidadeEditando !== null}
          salvando={salvando}
          onNomeChange={setNome}
          onSubmit={salvarEspecialidade}
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
