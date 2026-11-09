import type { Profissional, ProfissionalApi } from "../types/catalogo";

export function mapearProfissional(api: ProfissionalApi): Profissional {
  return {
    id: api.id,
    nome: api.nome,
    email: api.email,
    telefone: api.telefone,
    profissionalEspecialidades: api.profissional_especialidades.map(
      ({ especialidade }) => ({ especialidade }),
    ),
  };
}
