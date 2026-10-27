
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Inicio from "./pages/Inicio";
import Agenda from "./pages/Agenda";
import Historico from "./pages/Historico";
import Perfil from "./pages/Perfil";

function Especialidades() {
  return (
    <section className="p-6 sm:p-8">
      <h2 className="text-xl font-semibold text-[#193F39]">
        Especialidades cadastradas
      </h2>
      <p className="mt-2 text-sm text-gray-500">
        Aqui ficará o gerenciamento de especialidades.
      </p>
    </section>
  );
}

function AdminPlaceholder({ titulo }: { titulo: string }) {
  return (
    <section className="p-6 sm:p-8">
      <h2 className="text-xl font-semibold text-[#193F39]">{titulo}</h2>
      <p className="mt-2 text-sm text-gray-500">
        Esta área será implementada em breve.
      </p>
    </section>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Inicio />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/historico" element={<Historico />} />
          <Route path="/perfil" element={<Perfil />} />

          <Route path="/admin" element={<Especialidades />} />
          <Route
            path="/admin/profissionais"
            element={<AdminPlaceholder titulo="Profissionais" />}
          />
          <Route
            path="/admin/agendas"
            element={<AdminPlaceholder titulo="Agendas" />}
          />
          <Route
            path="/admin/pacientes"
            element={<AdminPlaceholder titulo="Pacientes" />}
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
