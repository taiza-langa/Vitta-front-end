import { useCallback, useEffect, useState } from "react";
import { buscarConsultasPacienteExibicao } from "../services/buscarConsultasPacienteExibicao";
import type { ConsultaExibicao } from "../types/consulta";
import { useAgendaActions } from "./useAgendaActions";

export function useAgenda() {
  const [consultas, setConsultas] = useState<ConsultaExibicao[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [versao, setVersao] = useState(0);

  useEffect(() => {
    let ativo = true;

    buscarConsultasPacienteExibicao()
      .then((dados) => {
        if (ativo) {
          setConsultas(
            dados.filter(
              (consulta) => new Date(consulta.inicio_em).getTime() >= Date.now(),
            ),
          );
        }
      })
      .catch((erroApi: unknown) => {
        if (ativo) {
          setErro(
            erroApi instanceof Error
              ? erroApi.message
              : "Não foi possível carregar as consultas.",
          );
        }
      })
      .finally(() => {
        if (ativo) setCarregando(false);
      });

    return () => {
      ativo = false;
    };
  }, [versao]);

  const recarregarConsultas = useCallback(() => {
    setErro(null);
    setCarregando(true);
    setVersao((atual) => atual + 1);
  }, []);

  const actions = useAgendaActions(recarregarConsultas);

  return { consultas, carregando, erro, recarregarConsultas, ...actions };
}
