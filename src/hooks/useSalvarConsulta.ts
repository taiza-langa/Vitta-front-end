import { useState } from "react";
import { criarConsulta } from "../services/criarConsulta";
import { calcularFimConsulta } from "../services/calcularFimConsulta";
import { obterSessao } from "../services/obterSessao";

interface UseSalvarConsultaProps {
  especialidadeId: string;
  profissionalId: string;
  data: string;
  horario: string;
  onSuccess: () => void;
}

export function useSalvarConsulta({
  especialidadeId,
  profissionalId,
  data,
  horario,
  onSuccess,
}: UseSalvarConsultaProps) {
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function salvarConsulta() {
    const usuarioId = obterSessao()?.usuario.id;
    if (
      usuarioId === undefined ||
      !Number.isInteger(usuarioId) ||
      usuarioId < 1 ||
      !especialidadeId ||
      !profissionalId ||
      !data ||
      !horario
    ) {
      setErro("Selecione uma especialidade, profissional, dia e horário válidos.");
      return;
    }

    setSalvando(true);
    setErro(null);

    try {
      await criarConsulta({
        paciente_id: usuarioId,
        profissional_id: Number(profissionalId),
        especialidade_id: Number(especialidadeId),
        inicio_em: `${data}T${horario}:00`,
        fim_em: calcularFimConsulta(data, horario),
      });
      onSuccess();
    } catch (erroApi: unknown) {
      setErro(
        erroApi instanceof Error
          ? erroApi.message
          : "Não foi possível salvar o agendamento.",
      );
    } finally {
      setSalvando(false);
    }
  }

  return { salvarConsulta, salvando, erro };
}
