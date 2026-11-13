import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthCard from "../components/auth/AuthCard";
import CampoAutenticacao from "../components/forms/CampoAutenticacao";
import { loginUsuario } from "../services/loginUsuario";
import { salvarSessao } from "../services/salvarSessao";

interface EstadoNavegacao {
  from?: {
    pathname?: string;
  };
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const destino = (location.state as EstadoNavegacao | null)?.from?.pathname ?? "/";

  async function entrar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro(null);
    setEnviando(true);

    try {
      const sessao = await loginUsuario(email.trim(), senha);
      salvarSessao(sessao);
      navigate(destino, { replace: true });
    } catch (erroApi: unknown) {
      setErro(
        erroApi instanceof Error
          ? erroApi.message
          : "Não foi possível entrar na sua conta.",
      );
    } finally {
      setEnviando(false);
    }
  }

  return (
    <AuthCard
      titulo="Entre na sua conta"
      descricao="Acesse seus agendamentos e continue cuidando da sua saúde."
    >
      <form onSubmit={entrar} className="space-y-4">
        <CampoAutenticacao
          id="email"
          label="E-mail"
          type="email"
          value={email}
          onChange={setEmail}
          autoComplete="email"
        />
        <CampoAutenticacao
          id="senha"
          label="Senha"
          type="password"
          value={senha}
          onChange={setSenha}
          autoComplete="current-password"
        />

        {erro && (
          <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {erro}
          </p>
        )}

        <button
          type="submit"
          disabled={enviando}
          className="w-full rounded-xl bg-[#28796D] px-5 py-3.5 font-semibold text-white transition hover:bg-[#22695F] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {enviando ? "Entrando..." : "Entrar"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Ainda não tem uma conta?{" "}
        <Link to="/cadastro" className="font-semibold text-[#28796D] hover:underline">
          Cadastre-se
        </Link>
      </p>
    </AuthCard>
  );
}
