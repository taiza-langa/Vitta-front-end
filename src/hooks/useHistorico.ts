import { useEffect, useState } from "react";
import { buscarConsultasPacienteExibicao } from "../services/buscarConsultasPacienteExibicao";
import type { ConsultaExibicao } from "../types/consulta";

export function useHistorico() {
  const [consultasHistorico, setConsultasHistorico] = useState<
    ConsultaExibicao[]
  >([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  useEffect(() => {
    let ativo = true;

    buscarConsultasPacienteExibicao()
      .then((dados) => {
        if (ativo) {
          const agora = Date.now();
          setConsultasHistorico(
            dados.filter(
              (consulta) =>
                consulta.status.toUpperCase() === "CONCLUÍDA" ||
                (consulta.status.toUpperCase() === "CANCELADA" &&
                  new Date(consulta.inicio_em).getTime() < agora),
            ),
          );
        }
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

  return { consultasHistorico, carregando, erro };
}
