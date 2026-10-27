
import { Bell } from "lucide-react";
import { useLocation } from "react-router-dom";

type HeaderProps = {
  area: "paciente" | "admin";
};

const titulos: Record<string, string> = {
  "/": "Início",
  "/agenda": "Agenda",
  "/historico": "Histórico",
  "/perfil": "Perfil",
  "/admin": "Especialidades",
  "/admin/profissionais": "Profissionais",
  "/admin/agendas": "Agendas",
  "/admin/pacientes": "Pacientes",
};

export default function Header({ area }: HeaderProps) {
  const location = useLocation();
  const isAdmin = area === "admin";
  const titulo = titulos[location.pathname] || "Início";

  return (
    <header className="flex min-h-20 items-center justify-between gap-3 border-b border-gray-200 bg-white px-4 py-4 sm:px-6 lg:px-8">
      <div className="min-w-0">
        {isAdmin && (
          <p className="text-[10px] text-gray-500 sm:text-xs">
            Painel administrativo
          </p>
        )}

        <h1 className="text-lg font-bold text-[#193F39] sm:text-xl">
          {titulo}
        </h1>

        {!isAdmin && (
          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            {new Date().toLocaleDateString("pt-BR", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </p>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <button
          type="button"
          aria-label="Notificações"
          className="rounded-xl p-2 text-gray-600 transition hover:bg-gray-100 sm:p-3"
        >
          <Bell size={21} />
        </button>
      </div>
    </header>
  );
}
