import { useCallback, useEffect, useState } from "react";
import type { FormEvent } from "react";
import {
  atualizarEspecialidade,
  buscarEspecialidades,
  criarEspecialidade,
  excluirEspecialidade,
} from "../services";
import type { Especialidade } from "../types/catalogo";
import type { ToastVariant } from "../components/ui/Toast";

export function useEspecialidades() {
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

  function mostrarToast(message: string, variant: ToastVariant = "success") {
    setToast((atual) => ({ id: (atual?.id ?? 0) + 1, message, variant }));
  }

  const fecharToast = useCallback(() => setToast(null), []);

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

  return {
    especialidades,
    especialidadeEditando,
    nome,
    setNome,
    carregando,
    salvando,
    excluindoId,
    erro,
    toast,
    iniciarEdicao,
    cancelarEdicao,
    salvarEspecialidade,
    removerEspecialidade,
    fecharToast,
  };
}
