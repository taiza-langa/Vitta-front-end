
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
import Especialidades from "./pages/admin/Especialidades";
import Profissionais from "./pages/admin/Profissionais";
import AdminPlaceholder from "./pages/admin/AdminPlaceholder";

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
          <Route path="/admin/profissionais" element={<Profissionais />} />
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
