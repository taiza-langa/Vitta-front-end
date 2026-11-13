
import { UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { obterSessao } from "../services/obterSessao";
import { removerSessao } from "../services/removerSessao";

export default function Perfil() {
  const navigate = useNavigate();
  const usuario = obterSessao()?.usuario;
  const isAdmin = usuario?.tipo.toLowerCase() === "admin";

  return (
    <section className="px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E1F2ED] text-[#28796D]">
            <UserRound size={30} />
          </div>

          <h2 className="mt-4 text-2xl font-medium text-[#193F39] sm:text-3xl">
            Perfil
          </h2>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Gerencie seus dados e preferências.
          </p>
        </div>

        <div className="space-y-3">
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-5">
            <p className="font-semibold text-[#193F39]">{usuario?.nome}</p>
            <p className="mt-1 text-sm text-gray-500">{usuario?.email}</p>
          </div>

          {isAdmin && (
            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="w-full rounded-2xl border border-[#28796D] bg-white px-6 py-4 font-semibold text-[#28796D] transition hover:bg-[#F0F8F5]"
            >
              Acessar painel administrativo
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              removerSessao();
              navigate("/login", { replace: true });
            }}
            className="w-full rounded-2xl border border-[#F0D2CD] bg-white px-6 py-4 font-semibold text-[#B94D40] transition hover:bg-red-50"
          >
            Sair da conta
          </button>
        </div>
      </div>
    </section>
  );
}
