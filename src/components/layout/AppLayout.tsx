
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppLayout() {
  const location = useLocation();
  const area = location.pathname.startsWith("/admin")
    ? "admin"
    : "paciente";

  return (
    <div className="flex min-h-screen bg-[#F7F9F8]">
      <Sidebar area={area} />

      <main className="min-w-0 flex-1">
        <Header area={area} />
        <Outlet />
      </main>
    </div>
  );
}
