import { useEffect, useMemo, useState } from "react";
import {
  buscarAgendas,
  buscarConsultasPaciente,
  buscarEspecialidades,
  buscarHorariosOcupados,
  buscarProfissionais,
} from "../services";
import { pacienteTesteId } from "../services/pacienteTeste";
import { gerarDiasAgendamento } from "../services/gerarDiasAgendamento";
import { gerarHorariosAgendamento } from "../services/gerarHorariosAgendamento";
import { buscarHorarioOcupado } from "../services/buscarHorarioOcupado";
import { buscarConsultaCoincidente } from "../services/buscarConsultaCoincidente";
import type { Agenda } from "../types/agenda";
import type { Especialidade, Profissional } from "../types/catalogo";
import type { ConsultaHorario } from "../types/consulta";
import type { HorarioOcupado } from "../services/buscarHorariosOcupados";

interface DisponibilidadeHorarios {
  chave: string;
  horarios: HorarioOcupado[];
  erro: string | null;
}

const horariosOcupadosVazios: HorarioOcupado[] = [];

export function useAgendamentoPaciente() {
  const [especialidades, setEspecialidades] = useState<Especialidade[]>([]);
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [agendas, setAgendas] = useState<Agenda[]>([]);
  const [consultas, setConsultas] = useState<ConsultaHorario[]>([]);
  const [disponibilidadeHorarios, setDisponibilidadeHorarios] =
    useState<DisponibilidadeHorarios | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [especialidadeId, setEspecialidadeId] = useState("");
  const [profissionalId, setProfissionalId] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");

  useEffect(() => {
    let ativo = true;

    Promise.all([
      buscarEspecialidades(),
      buscarProfissionais(),
      buscarAgendas(),
      buscarConsultasPaciente(pacienteTesteId),
    ])
      .then(
        ([
          dadosEspecialidades,
          dadosProfissionais,
          dadosAgendas,
          dadosConsultas,
        ]) => {
          if (!ativo) return;
          setEspecialidades(dadosEspecialidades);
          setProfissionais(dadosProfissionais);
          setAgendas(dadosAgendas);
          setConsultas(dadosConsultas);
        },
      )
      .catch((erroApi: unknown) => {
        if (ativo) {
          setErro(
            erroApi instanceof Error
              ? erroApi.message
              : "Não foi possível carregar os dados para o agendamento.",
          );
        }
      })
      .finally(() => {
        if (ativo) setCarregando(false);
      });

    return () => {
      ativo = false;
    };
  }, []);

  useEffect(() => {
    const profissionalSelecionadoId = Number(profissionalId);
    if (!profissionalSelecionadoId || !data) return;

    const chave = `${profissionalSelecionadoId}:${data}`;
    let ativo = true;

    buscarHorariosOcupados(profissionalSelecionadoId, data)
      .then((dados) => {
        if (ativo) {
          setDisponibilidadeHorarios({ chave, horarios: dados, erro: null });
        }
      })
      .catch((erroApi: unknown) => {
        if (ativo) {
          setDisponibilidadeHorarios({
            chave,
            horarios: [],
            erro:
              erroApi instanceof Error
                ? erroApi.message
                : "Não foi possível verificar os horários já reservados.",
          });
        }
      });

    return () => {
      ativo = false;
    };
  }, [data, profissionalId]);

  const profissionalSelecionadoId = Number(profissionalId);
  const chaveDisponibilidade =
    profissionalSelecionadoId > 0 && data
      ? `${profissionalSelecionadoId}:${data}`
      : "";
  const disponibilidadeAtual =
    disponibilidadeHorarios?.chave === chaveDisponibilidade
      ? disponibilidadeHorarios
      : null;
  const horariosOcupados =
    disponibilidadeAtual?.horarios ?? horariosOcupadosVazios;
  const carregandoHorariosOcupados = Boolean(
    chaveDisponibilidade && !disponibilidadeAtual,
  );
  const erroHorariosOcupados = disponibilidadeAtual?.erro ?? null;

  const profissionaisDisponiveis = useMemo(
    () =>
      profissionais.filter((profissional) =>
        profissional.profissionalEspecialidades.some(
          ({ especialidade }) => especialidade.id === Number(especialidadeId),
        ),
      ),
    [especialidadeId, profissionais],
  );

  const diasDisponiveis = useMemo(
    () => gerarDiasAgendamento(agendas, Number(profissionalId)),
    [agendas, profissionalId],
  );

  const horariosDisponiveis = useMemo(
    () =>
      gerarHorariosAgendamento(
        agendas,
        Number(profissionalId),
        data,
      ),
    [agendas, data, profissionalId],
  );

  const horariosExibidos = useMemo(
    () =>
      carregandoHorariosOcupados || erroHorariosOcupados
        ? []
        : horariosDisponiveis.filter(
            (opcao) =>
              !buscarHorarioOcupado(data, opcao, horariosOcupados),
          ),
    [
      carregandoHorariosOcupados,
      data,
      erroHorariosOcupados,
      horariosDisponiveis,
      horariosOcupados,
    ],
  );

  const consultaCoincidente = useMemo(() => {
    if (!data || !horario) return undefined;
    return buscarConsultaCoincidente(data, horario, consultas);
  }, [consultas, data, horario]);

  const horarioOcupadoSelecionado = useMemo(() => {
    if (!data || !horario) return undefined;
    return buscarHorarioOcupado(data, horario, horariosOcupados);
  }, [data, horario, horariosOcupados]);

  const podeConfirmar = Boolean(
    !carregando &&
      !erro &&
      !carregandoHorariosOcupados &&
      !erroHorariosOcupados &&
      !consultaCoincidente &&
      !horarioOcupadoSelecionado &&
      especialidadeId &&
      profissionalId &&
      data &&
      horariosDisponiveis.includes(horario),
  );

  return {
    especialidades,
    profissionais: profissionaisDisponiveis,
    dias: diasDisponiveis,
    horarios: horariosDisponiveis,
    horariosExibidos,
    horariosOcupados,
    carregandoHorariosOcupados,
    erroHorariosOcupados,
    carregando,
    erro,
    especialidadeId,
    setEspecialidadeId,
    profissionalId,
    setProfissionalId,
    data,
    setData,
    horario,
    setHorario,
    consultaCoincidente,
    podeConfirmar,
  };
}
