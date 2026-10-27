import { CalendarDays, ArrowUpRight } from "lucide-react";

export default function Inicio() {
  return (
    <section className="p-5 sm:p-8 lg:p-10">
      <div className="flex flex-col gap-8 border-b border-gray-200/80 pb-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div className="min-w-0 flex-1">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-[#28796D]">
            <span className="h-2 w-2 rounded-full bg-[#28796D]" />
            Sua saúde em primeiro lugar
          </span>

          <h2 className="mt-5 max-w-xl text-3xl font-semibold leading-tight tracking-tight text-[#193F39] sm:text-4xl lg:text-5xl">
            Como podemos cuidar de você hoje?
          </h2>

          <p className="mt-4 max-w-md text-sm leading-6 text-gray-500 sm:text-base">
            Cuide do seu bem-estar com praticidade. Encontre o atendimento
            ideal para você.
          </p>
        </div>

        <button
          type="button"
          className="group flex w-full items-center gap-4 rounded-3xl bg-gradient-to-br from-[#318779] to-[#20665B] p-5 text-left text-white shadow-lg shadow-emerald-900/10 transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-6 lg:w-[440px] lg:shrink-0"
        >
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/15">
            <CalendarDays size={27} strokeWidth={1.8} />
          </span>

          <span className="min-w-0 flex-1">
            <span className="block text-base font-semibold sm:text-lg">
              Agendar consulta
            </span>

            <span className="mt-1 block text-xs leading-5 text-emerald-50/90 sm:text-sm">
              Encontre o melhor horário para você
            </span>
          </span>

          <ArrowUpRight
            size={21}
            className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </button>
      </div>
    </section>
  );
}