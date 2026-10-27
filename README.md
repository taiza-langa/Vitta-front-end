# Vitta Front-End

Site responsivo para agendamento de consultas médicas.

## Tecnologias
- React
- TypeScript
- Vite
- CSS

## Como executar

```bash
npm install
npm run dev
```

## Integração com o backend

O painel de profissionais permite cadastrar, editar e excluir registros, incluindo vínculo com múltiplas especialidades, e-mail e telefone.

Inicie o backend em outro terminal, na pasta `Vitta-back-end`, usando `npm run dev`. Ele deve estar disponível em `http://localhost:3000`; o Vite encaminha as chamadas de `/api` para esse servidor.

As telas administrativas de especialidades e profissionais carregam os dados do backend. A tela de especialidades também permite cadastrar, editar e excluir registros; a API impede a exclusão de especialidades vinculadas a consultas. As consultas continuam desconectadas: a API atual retorna consultas de todos os pacientes e ainda não há autenticação para restringi-las ao paciente correto.
