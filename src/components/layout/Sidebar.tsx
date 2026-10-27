
import { NavLink, useNavigate } from "react-router-dom";
import {
  Plus,
  House,
  CalendarDays,
  History,
  UserRound,
  Users,
  ChevronLeft,
  Stethoscope,
} from "lucide-react";

type SidebarProps = {
  area: "paciente" | "admin";
};

const linksPaciente = [
  { name: "Início", path: "/", icon: House },
  { name: "Agenda", path: "/agenda", icon: CalendarDays },
  { name: "Histórico", path: "/historico", icon: History },
  { name: "Perfil", path: "/perfil", icon: UserRound },
];

const linksAdmin = [
  { name: "Especialidades", path: "/admin", icon: History },
  {
    name: "Profissionais",
    path: "/admin/profissionais",
    icon: Stethoscope,
  },
  { name: "Agendas", path: "/admin/agendas", icon: CalendarDays },
  { name: "Pacientes", path: "/admin/pacientes", icon: Users },
];

export default function Sidebar({ area }: SidebarProps) {
  const navigate = useNavigate();
  const isAdmin = area === "admin";
  const links = isAdmin ? linksAdmin : linksPaciente;

  return (
    <aside className="flex min-h-screen w-16 shrink-0 flex-col bg-[#193F39] p-2 text-white sm:w-20 sm:p-3 lg:w-64 lg:p-4">
      <div className="flex items-center justify-center gap-3 px-1 py-3 lg:justify-start lg:px-2">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-700">
          <Plus size={24} />
        </span>

        <span className="hidden text-xl font-bold lg:block">
          Vitta Saúde
        </span>
      </div>

      {isAdmin && (
        <p className="mt-8 hidden px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8CB6AD] lg:block">
          Administração
        </p>
      )}

      <nav className={`${isAdmin ? "mt-3" : "mt-8 sm:mt-12"} flex flex-col gap-2`}>
        {links.map(({ name, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === "/" || path === "/admin"}
            title={name}
            aria-label={name}
            className={({ isActive }) =>
              `flex items-center justify-center gap-4 rounded-xl px-3 py-4 transition-colors lg:justify-start lg:px-4 ${
                isActive
                  ? "bg-[#2D534C] font-semibold text-white"
                  : "text-emerald-100 hover:bg-[#254C45]"
              }`
            }
          >
            <Icon size={21} strokeWidth={1.8} />
            <span className="hidden lg:inline">{name}</span>
          </NavLink>
        ))}
      </nav>

      {isAdmin && (
        <div className="mt-auto border-t border-white/10 pt-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex w-full items-center justify-center gap-3 rounded-xl px-3 py-3 text-sm text-emerald-100 transition hover:bg-[#254C45] lg:justify-start lg:px-4"
            title="Voltar ao app"
          >
            <ChevronLeft size={20} />
            <span className="hidden lg:block">Voltar ao app</span>
          </button>
        </div>
      )}
    </aside>
  );
}
