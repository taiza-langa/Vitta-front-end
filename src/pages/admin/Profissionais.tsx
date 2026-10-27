import { useEffect, useState } from "react";
import { buscarProfissionais } from "../../services/catalogoService";
import type { Profissional } from "../../services/catalogoService";

export default function Profissionais() {
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

  return (
    <section className="p-6 sm:p-8">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-xl font-semibold text-[#193F39]">
          Profissionais cadastrados
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Profissionais disponíveis no sistema.
        </p>

        {carregando ? (
          <p className="py-10 text-center text-gray-500">
            Carregando profissionais...
          </p>
        ) : erro ? (
          <p role="alert" className="mt-6 rounded-xl bg-red-50 p-4 text-red-700">
            {erro}
          </p>
        ) : profissionais.length === 0 ? (
          <p className="mt-6 rounded-xl border border-gray-200 bg-white p-6 text-center text-gray-500">
            Nenhum profissional cadastrado.
          </p>
        ) : (
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {profissionais.map((profissional) => (
              <li
                key={profissional.id}
                className="rounded-2xl border border-gray-200 bg-white p-5 font-medium text-[#193F39]"
              >
                {profissional.nome}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
