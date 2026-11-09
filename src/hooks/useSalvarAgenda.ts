import { useCallback } from "react";
import type { FormEvent, Dispatch, SetStateAction } from "react";
import { atualizarAgenda } from "../services/atualizarAgenda";
import { criarAgenda } from "../services/criarAgenda";
import { intervaloAgendaValido } from "../services/intervaloAgendaValido";
import type { Agenda, AgendaDados } from "../types/agenda";

interface ToastState {
  id: number;
  message: string;
  variant: "success" | "error";
}

interface UseSalvarAgendaProps {
  profissionalId: string;
  data: string;
  horarioInicial: string;
  horarioFinal: string;
  agendaEditando: Agenda | null;
  setAgendas: Dispatch<SetStateAction<Agenda[]>>;
  setAgendaEditando: Dispatch<SetStateAction<Agenda | null>>;
  setProfissionalId: Dispatch<SetStateAction<string>>;
  setData: Dispatch<SetStateAction<string>>;
  setHorarioInicial: Dispatch<SetStateAction<string>>;
  setHorarioFinal: Dispatch<SetStateAction<string>>;
  setSalvando: Dispatch<SetStateAction<boolean>>;
  setToast: Dispatch<SetStateAction<ToastState | null>>;
}

export function useSalvarAgenda({
  profissionalId,
  data,
  horarioInicial,
  horarioFinal,
  agendaEditando,
  setAgendas,
  setAgendaEditando,
  setProfissionalId,
  setData,
  setHorarioInicial,
  setHorarioFinal,
  setSalvando,
  setToast,
}: UseSalvarAgendaProps) {
  return useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (
        !profissionalId ||
        !data ||
        !horarioInicial ||
        !horarioFinal ||
        !intervaloAgendaValido(horarioInicial, horarioFinal)
      ) {
        return;
      }

      const dados: AgendaDados = {
        profissional_id: Number(profissionalId),
        data,
        horario_inicial: horarioInicial,
        horario_final: horarioFinal,
      };

      setSalvando(true);
      try {
        if (agendaEditando) {
          const atualizada = await atualizarAgenda(agendaEditando.id, dados);
          setAgendas((atuais) =>
            atuais
              .map((item) => (item.id === atualizada.id ? atualizada : item))
              .sort((a, b) =>
                `${a.data}${a.horarioInicial}`.localeCompare(
                  `${b.data}${b.horarioInicial}`,
                ),
              ),
          );
        } else {
          const criada = await criarAgenda(dados);
          setAgendas((atuais) =>
            [...atuais, criada].sort((a, b) =>
              `${a.data}${a.horarioInicial}`.localeCompare(
                `${b.data}${b.horarioInicial}`,
              ),
            ),
          );
        }

        setAgendaEditando(null);
        setProfissionalId("");
        setData("");
        setHorarioInicial("");
        setHorarioFinal("");
        setToast((atual) => ({
          id: (atual?.id ?? 0) + 1,
          message: agendaEditando
            ? "Agenda atualizada com sucesso."
            : "Agenda cadastrada com sucesso.",
          variant: "success",
        }));
      } catch (erroApi: unknown) {
        setToast((atual) => ({
          id: (atual?.id ?? 0) + 1,
          message:
            erroApi instanceof Error
              ? erroApi.message
              : "Não foi possível salvar a agenda.",
          variant: "error",
        }));
      } finally {
        setSalvando(false);
      }
    },
    [
      agendaEditando,
      data,
      horarioFinal,
      horarioInicial,
      profissionalId,
      setAgendaEditando,
      setAgendas,
      setData,
      setHorarioFinal,
      setHorarioInicial,
      setProfissionalId,
      setSalvando,
      setToast,
    ],
  );
}
