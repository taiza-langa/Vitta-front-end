import { useEffect, useState } from "react";
import { buscarConsultas } from "../services/consultasService";
import type { ConsultaExibicao } from "../types/consulta";
import { useAgendaActions } from "./useAgendaActions";

export function useAgenda() {
  const [consultas, setConsultas] = useState<ConsultaExibicao[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const actions = useAgendaActions();

  useEffect(() => {
    let ativo = true;

    buscarConsultas()
      .then((dados) => {
        if (ativo) setConsultas(dados);
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
  }, []);

  return { consultas, carregando, erro, ...actions };
}
