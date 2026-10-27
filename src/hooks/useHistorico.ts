import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { buscarHistorico } from "../services/historicoService";
import type { ConsultaExibicao } from "../types/consulta";

export function useHistorico() {
  const [consultas, setConsultas] = useState<ConsultaExibicao[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let ativo = true;

    buscarHistorico()
      .then((dados) => {
        if (ativo) setConsultas(dados);
      })
      .catch((erroApi: unknown) => {
        if (ativo) {
          setErro(
            erroApi instanceof Error
              ? erroApi.message
              : "Não foi possível carregar o histórico.",
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

  const consultasConcluidas = consultas.filter(
    (consulta) => consulta.status.toUpperCase() === "CONCLUÍDA",
  );

  function agendarNovaConsulta() {
    navigate("/agenda");
  }

  return { consultasConcluidas, carregando, erro, agendarNovaConsulta };
}
