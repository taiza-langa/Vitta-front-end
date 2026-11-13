import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { obterSessao } from "../../services/obterSessao";

export default function RotaProtegida() {
  const [autenticado, setAutenticado] = useState(() => Boolean(obterSessao()));
  const location = useLocation();

  useEffect(() => {
    function encerrarSessaoExpirada() {
      setAutenticado(false);
    }

    window.addEventListener("vitta:session-expired", encerrarSessaoExpirada);
    return () =>
      window.removeEventListener(
        "vitta:session-expired",
        encerrarSessaoExpirada,
      );
  }, []);

  if (!autenticado) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
