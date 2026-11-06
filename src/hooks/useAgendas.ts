import { useEffect, useState } from "react";
import { buscarAgendas, buscarProfissionais } from "../services";
import type { Agenda } from "../types/agenda";
import type { Profissional } from "../types/catalogo";

export function useAgendas() {
  const [agendas, setAgendas] = useState<Agenda[]>([]);
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    let ativo = true;

    Promise.all([buscarAgendas(), buscarProfissionais()])
      .then(([dadosAgendas, dadosProfissionais]) => {
        if (ativo) {
          setAgendas(dadosAgendas);
          setProfissionais(dadosProfissionais);
        }
      })
      .catch((erroApi: unknown) => {
        if (ativo) {
          setErro(
            erroApi instanceof Error
              ? erroApi.message
              : "Não foi possível carregar as agendas.",
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

  return { agendas, setAgendas, profissionais, carregando, erro };
}
