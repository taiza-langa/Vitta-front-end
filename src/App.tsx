
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import RotaProtegida from "./components/auth/RotaProtegida";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Inicio from "./pages/Inicio";
import Agenda from "./pages/Agenda";
import Historico from "./pages/Historico";
import Perfil from "./pages/Perfil";
import Especialidades from "./pages/admin/Especialidades";
import Profissionais from "./pages/admin/Profissionais";
import AdminPlaceholder from "./pages/admin/AdminPlaceholder";
import Agendas from "./pages/admin/Agendas";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        <Route element={<RotaProtegida />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Inicio />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/historico" element={<Historico />} />
            <Route path="/perfil" element={<Perfil />} />

            <Route path="/admin" element={<Especialidades />} />
            <Route path="/admin/profissionais" element={<Profissionais />} />
            <Route path="/admin/agendas" element={<Agendas />} />
            <Route
              path="/admin/pacientes"
              element={<AdminPlaceholder titulo="Pacientes" />}
            />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
