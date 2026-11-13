import type { ReactNode } from "react";
import { Plus } from "lucide-react";

interface AuthCardProps {
  titulo: string;
  descricao: string;
  children: ReactNode;
}

export default function AuthCard({
  titulo,
  descricao,
  children,
}: AuthCardProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F3F8F6] px-4 py-10">
      <section className="w-full max-w-md rounded-3xl border border-emerald-900/5 bg-white p-6 shadow-xl shadow-emerald-950/5 sm:p-9">
        <div className="mb-7 flex flex-col items-center text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E1F2ED] text-[#28796D]">
            <Plus size={27} />
          </span>
          <p className="mt-3 text-sm font-bold text-[#28796D]">Vitta Saúde</p>
          <h1 className="mt-5 text-2xl font-semibold text-[#193F39]">
            {titulo}
          </h1>
          <p className="mt-2 text-sm leading-6 text-gray-500">{descricao}</p>
        </div>
        {children}
      </section>
    </main>
  );
}
