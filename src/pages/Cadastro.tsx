import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthCard from "../components/auth/AuthCard";
import CampoAutenticacao from "../components/forms/CampoAutenticacao";
import { cadastrarUsuario } from "../services/cadastrarUsuario";
import { loginUsuario } from "../services/loginUsuario";
import { salvarSessao } from "../services/salvarSessao";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [senha, setSenha] = useState("");
  const [dataLimiteNascimento] = useState(() => {
    const hoje = new Date();
    hoje.setMinutes(hoje.getMinutes() - hoje.getTimezoneOffset());
    return hoje.toISOString().slice(0, 10);
  });
  const [erro, setErro] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);
  const navigate = useNavigate();

  async function cadastrar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro(null);
    setEnviando(true);

    try {
      await cadastrarUsuario({
        nome: nome.trim(),
        email: email.trim(),
        senha,
        data_nascimento: dataNascimento,
      });
      const sessao = await loginUsuario(email.trim(), senha);
      salvarSessao(sessao);
      navigate("/", { replace: true });
    } catch (erroApi: unknown) {
      setErro(
        erroApi instanceof Error
          ? erroApi.message
          : "Não foi possível criar sua conta.",
      );
    } finally {
      setEnviando(false);
    }
  }

  return (
    <AuthCard
      titulo="Crie sua conta"
      descricao="Cadastre-se para acompanhar e organizar seus atendimentos."
    >
      <form onSubmit={cadastrar} className="space-y-4">
        <CampoAutenticacao
          id="nome"
          label="Nome completo"
          type="text"
          value={nome}
          onChange={setNome}
          autoComplete="name"
        />
        <CampoAutenticacao
          id="email"
          label="E-mail"
          type="email"
          value={email}
          onChange={setEmail}
          autoComplete="email"
        />
        <CampoAutenticacao
          id="data_nascimento"
          label="Data de nascimento"
          type="date"
          value={dataNascimento}
          onChange={setDataNascimento}
          autoComplete="bday"
          max={dataLimiteNascimento}
        />
        <CampoAutenticacao
          id="senha"
          label="Senha (mínimo de 8 caracteres)"
          type="password"
          value={senha}
          onChange={setSenha}
          autoComplete="new-password"
          minLength={8}
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
          {enviando ? "Criando conta..." : "Criar conta"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Já tem uma conta?{" "}
        <Link to="/login" className="font-semibold text-[#28796D] hover:underline">
          Entrar
        </Link>
      </p>
    </AuthCard>
  );
}
