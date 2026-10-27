import { useEffect, useState } from "react";
import { buscarProfissionais } from "../services/buscarProfissionais";
import type { Profissional } from "../types/catalogo";

export function useProfissionais() {
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    let ativo = true;

    buscarProfissionais()
      .then((dados) => {
        if (ativo) setProfissionais(dados);
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

  return { profissionais, carregando, erro };
}
