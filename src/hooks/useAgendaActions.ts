import { useState } from "react";
import { cancelarConsulta as cancelarConsultaApi } from "../services/cancelarConsulta";
import type { ConsultaExibicao } from "../types/consulta";

export function useAgendaActions(onCancelada: () => void) {
  const [erroAcao, setErroAcao] = useState<string | null>(null);
  const [cancelandoId, setCancelandoId] = useState<number | null>(null);

  function reagendarConsulta() {
    alert("A função de reagendamento será implementada depois.");
  }

  async function cancelarConsulta(consulta: ConsultaExibicao): Promise<boolean> {
    const confirmado = window.confirm(
      "Tem certeza de que deseja cancelar esta consulta?",
    );
    if (!confirmado) return false;

    setErroAcao(null);
    setCancelandoId(consulta.id);

    try {
      await cancelarConsultaApi(
        consulta.id,
        consulta.inicio_em,
        consulta.fim_em,
      );
      onCancelada();
      return true;
    } catch (erroApi: unknown) {
      setErroAcao(
        erroApi instanceof Error
          ? erroApi.message
          : "Não foi possível cancelar a consulta.",
      );
      return false;
    } finally {
      setCancelandoId(null);
    }
  }

  return { reagendarConsulta, cancelarConsulta, cancelandoId, erroAcao };
}
