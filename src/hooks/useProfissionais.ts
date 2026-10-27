import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import {
  atualizarProfissional,
  buscarEspecialidades,
  buscarProfissionais,
  criarProfissional,
  excluirProfissional,
} from "../services";
import type {
  Especialidade,
  Profissional,
  ProfissionalDados,
} from "../types/catalogo";
import type { ToastVariant } from "../components/ui/Toast";

export function useProfissionais() {
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [especialidades, setEspecialidades] = useState<Especialidade[]>([]);
  const [profissionalEditando, setProfissionalEditando] =
    useState<Profissional | null>(null);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [especialidadeIds, setEspecialidadeIds] = useState<number[]>([]);
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

    Promise.all([buscarProfissionais(), buscarEspecialidades()])
      .then(([dadosProfissionais, dadosEspecialidades]) => {
        if (ativo) {
          setProfissionais(dadosProfissionais);
          setEspecialidades(dadosEspecialidades);
        }
      })
      .catch((erroApi: unknown) => {
        if (ativo) {
          setErro(
            erroApi instanceof Error
              ? erroApi.message
              : "Não foi possível carregar os profissionais.",
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

  function mostrarToast(message: string, variant: ToastVariant = "success") {
    setToast((atual) => ({ id: (atual?.id ?? 0) + 1, message, variant }));
  }

  function iniciarEdicao(profissional: Profissional) {
    setProfissionalEditando(profissional);
    setNome(profissional.nome);
    setEmail(profissional.email ?? "");
    setTelefone(profissional.telefone ?? "");
    setEspecialidadeIds(profissional.especialidades.map(({ id }) => id));
    setErro(null);
  }

  function cancelarEdicao() {
    setProfissionalEditando(null);
    setNome("");
    setEmail("");
    setTelefone("");
    setEspecialidadeIds([]);
    setErro(null);
  }

  async function salvarProfissional(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nomeNormalizado = nome.trim();
    if (!nomeNormalizado || especialidadeIds.length === 0) return;

    const dados: ProfissionalDados = {
      nome: nomeNormalizado,
      email: email.trim() || null,
      telefone: telefone.trim() || null,
      especialidade_ids: especialidadeIds,
    };

    setSalvando(true);
    setErro(null);

    try {
      if (profissionalEditando) {
        const atualizado = await atualizarProfissional(
          profissionalEditando.id,
          dados,
        );
        setProfissionais((atuais) =>
          atuais.map((item) =>
            item.id === atualizado.id ? atualizado : item,
          ),
        );
        mostrarToast("Profissional atualizado com sucesso.");
      } else {
        const criado = await criarProfissional(dados);
        setProfissionais((atuais) =>
          [...atuais, criado].sort((a, b) => a.id - b.id),
        );
        mostrarToast("Profissional cadastrado com sucesso.");
      }

      cancelarEdicao();
    } catch (erroApi: unknown) {
      mostrarToast(
        erroApi instanceof Error
          ? erroApi.message
          : "Não foi possível salvar o profissional.",
        "error",
      );
    } finally {
      setSalvando(false);
    }
  }

  async function removerProfissional(profissional: Profissional) {
    const confirmar = window.confirm(
      `Deseja excluir o profissional "${profissional.nome}"?`,
    );
    if (!confirmar) return;

    setExcluindoId(profissional.id);
    setErro(null);

    try {
      await excluirProfissional(profissional.id);
      setProfissionais((atuais) =>
        atuais.filter((item) => item.id !== profissional.id),
      );
      if (profissionalEditando?.id === profissional.id) cancelarEdicao();
      mostrarToast("Profissional excluído com sucesso.");
    } catch (erroApi: unknown) {
      mostrarToast(
        erroApi instanceof Error
          ? erroApi.message
          : "Não foi possível excluir o profissional.",
        "error",
      );
    } finally {
      setExcluindoId(null);
    }
  }

  function fecharToast() {
    setToast(null);
  }

  function alternarEspecialidade(id: number, selecionado: boolean) {
    setEspecialidadeIds((atuais) =>
      selecionado
        ? [...new Set([...atuais, id])]
        : atuais.filter((especialidadeId) => especialidadeId !== id),
    );
  }

  return {
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
  };
}
