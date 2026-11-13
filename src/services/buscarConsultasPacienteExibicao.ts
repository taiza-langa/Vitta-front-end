import { buscarConsultasPaciente } from "./buscarConsultasPaciente";
import { buscarProfissionais } from "./buscarProfissionais";
import { buscarEspecialidades } from "./buscarEspecialidades";
import { obterSessao } from "./obterSessao";
import type { ConsultaExibicao } from "../types/consulta";

export async function buscarConsultasPacienteExibicao(): Promise<
  ConsultaExibicao[]
> {
  const sessao = obterSessao();
  if (!sessao) {
    throw new Error("Faça login para consultar seus agendamentos.");
  }

  const [consultas, profissionais, especialidades] = await Promise.all([
    buscarConsultasPaciente(sessao.usuario.id),
    buscarProfissionais(),
    buscarEspecialidades(),
  ]);
  const profissionaisPorId = new Map(
    profissionais.map((profissional) => [profissional.id, profissional.nome]),
  );
  const especialidadesPorId = new Map(
    especialidades.map((especialidade) => [especialidade.id, especialidade.nome]),
  );

  return consultas
    .map((consulta) => {
      const medico = profissionaisPorId.get(consulta.profissional_id);
      const especialidade = especialidadesPorId.get(consulta.especialidade_id);

      if (!medico || !especialidade) {
        throw new Error(
          "Não foi possível encontrar o profissional ou a especialidade de uma consulta.",
        );
      }

      return {
        id: consulta.id,
        medico,
        especialidade,
        inicio_em: consulta.inicio_em,
        fim_em: consulta.fim_em,
        status: consulta.status.toUpperCase(),
      };
    })
    .sort(
      (consultaA, consultaB) =>
        new Date(consultaA.inicio_em).getTime() -
        new Date(consultaB.inicio_em).getTime(),
    );
}
