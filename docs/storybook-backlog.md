# Backlog Storybook Hub

Registro das atividades ligadas a estabilizacao do Storybook Hub, testes e documentacao do design system Adsmagic.

---

## Backlog (ideias / longo prazo)

| ID | Prioridade | Tarefa | Descricao | Observacoes |
| --- | --- | --- | --- | --- |
| SB-13 | P3 | Monorepo management avancado | Implementar estrategia de releases independentes e versionamento granular. | Changesets ja configurado, mas pode ser otimizado. |
| SB-14 | P2 | Performance monitoring | Adicionar metricas de build time, bundle size e load time. | Ferramentas como Bundle Analyzer e Lighthouse CI. |
| SB-15 | P2 | Acessibilidade avancada | Implementar testes WCAG 2.1 AA completos e automacao. | Axe-core ja integrado, expandir cobertura. |
| SB-16 | P2 | Integracao Figma MCP | Conectar design system com Figma via MCP para sync automatico. | Documentado em `docs/figma-mcp.md`, implementar integracao. |
| SB-17 | P3 | Otimizacao de bundles | Analisar e otimizar tamanhos de pacotes, tree-shaking e lazy loading. | Focar em reduzir bundle size dos componentes. |
| SB-18 | P3 | Documentacao API | Gerar documentacao OpenAPI/Swagger para componentes programaticos. | Complementar Storybook com docs tecnicas. |
| SB-19 | P2 | Testes de integracao E2E | Expandir cobertura E2E para fluxos completos de usuario. | Alem dos testes atuais, adicionar cenarios complexos. |
| SB-20 | P3 | Internacionalizacao (i18n) | Implementar suporte multi-idioma nos componentes. | Preparar para expansao global. |

## A Fazer (proximas prioridades)

| ID | Prioridade | Tarefa | Descricao | Observacoes |
| --- | --- | --- | --- | --- |
| SB-23 | P0 | Sincronizar infraestrutura Playwright | Ajustar porta do servidor legado (4100 vs 8000) e validar workflow `visual-regression`. | Executar smoke local e em CI apos ajuste. |
| SB-32 | P0 | Corrigir servidor legado para testes visuais | Resolver problema de conectividade do servidor HTTP na porta 4100 necessário para baseline visual das 11 telas. | Bloqueia execução dos 55 testes visuais configurados. |
| SB-24 | P0 | Completar baseline visual legado | Capturar as 11 telas do legado e revisar tolerancias de screenshot. | Atualizar `snapshots/visual` e o guia de regressao. |
| SB-27 | P0 | Testes do dashboard no CI | Adicionar smoke/unit tests do app React e conectar `npm run test` ao pipeline principal. | Evitar regressao em rotas principais e hooks de performance. |
| SB-25 | P1 | Revisar monitoramento e alertas | Ativar Sentry/RUM/alertService com feature flags e validacoes de ambiente. | Remover placeholders e tratar falhas de rede. |
| SB-26 | P1 | Atualizar documentacao e changelog | Corrigir indicadores superestimados (95% pronto, 55 testes rodando) e registrar riscos conhecidos. | Revisar `CHANGELOG.md`, `docs/visual-regression.md` e `README-TESTING.md`. |
| SB-31 | P2 | Remover estilos inline do dashboard | Extrair estilos inline recorrentes para camadas de estilo reutilizaveis (CSS Modules, Tailwind ou tokens). | Mapear componentes de `apps/dashboard-react` e `packages/react-components` com maior incidencia. |

## Fazendo

| ID | Prioridade | Tarefa | Descricao | Observacoes |
| --- | --- | --- | --- | --- |
| -- | - | Nenhum item ativo | | |

## Bloqueios Atuais

| ID | Tarefa | Descricao | Impedimento |
| --- | --- | --- | --- |
| BL-01 | Testes visuais precisam do servidor legado funcionando | Os 55 testes de regressão visual estão configurados mas não podem executar porque o servidor legado na porta 4100 não está respondendo. | Servidor HTTP legado (porta 4100) com problema de conectividade - necessário para baseline visual das 11 telas HTML. |

## Feito

| ID | Prioridade | Tarefa | Descricao | Observacoes |
| --- | --- | --- | --- | --- |
| SB-01 | P1 | Migrar lint para configuracao flat | Substituir `.eslintrc` por `eslint.config.mjs` com React, Hooks e MDX. | `npm run lint --workspace @adsmagic/storybook-hub` estavel. |
| SB-02 | P1 | Normalizar README-TESTING.md | Corrigir caracteres corrompidos e reorganizar guia Playwright. | Arquivo reescrito em pt-BR e comandos validados. |
| SB-03 | P1 | Ampliar testes unitarios React/Vue | Cobrir componentes principais com Vitest + Testing Library. | Suites `@adsmagic/react` e `@adsmagic/vue` passam. |
| SB-04 | P1 | Build estatico do hub | Garantir `npm run build --workspace @adsmagic/storybook-hub` sem erros. | Build gera saida em `apps/storybook-hub/storybook-static`. |
| SB-05 | P1 | Documentacao do hub | Docs em MDX renderizando sem erros. | Navegacao principal carregando corretamente. |
| SB-06 | P1 | Smoke test Playwright do hub | Teste de fumaca para docs e navegacao. | Validado via `playwright.storybook.config.ts`. |
| SB-07 | P2 | Revisao/garantia da documentacao | Textos em ASCII e links funcionais. | Baseline pronto para iteracoes futuras. |
| SB-08 | P1 | Checklist de CI/CD | Definir pipeline lint/test/build + publicacao do hub. | Workflow `storybook-hub-ci.yml` criado com lint, build e smoke automatico. |
| SB-09 | P1 | Estrategia de versao dos pacotes | Formalizar SemVer, changelog e release notes para `@adsmagic/*`. | Implementado conventional commits, semantic-release e workflow automatico. |
| SB-10 | P1 | Integracao de regressao visual | Selecionar ferramenta (Chromatic/Percy) e configurar. | Implementado com Playwright Visual Comparison - CI/CD, screenshots e guia completo. |
| SB-11 | P1 | Publicacao do Storybook Hub | Deploy automatico via GitHub Pages apos CI passar. | Workflow atualizado com job de deploy; URL: https://fabioaap.github.io/Adsmagic-prot-tipo/ |
| SB-12 | P1 | Publicacao NPM automatica | Configurar Changesets para releases independentes dos pacotes `@adsmagic/*`. | Changesets configurado, CI/CD atualizado, documentacao criada em `docs/NPM_PUBLISHING.md`. |
| SB-21 | P0 | Corrigir inconsistencias de tokens | Expandir tipografia, cores e alias compartilhados para eliminar `undefined` em tempo de execucao. | `packages/tokens` atualizado com novos tamanhos, cores warning/info/gray e alias `borderRadius`. |
| SB-22 | P0 | Paridade Vue/React dos componentes | Reescrever graficos e listas Vue para usar tokens compartilhados em vez de utilitarios Tailwind. | `ChannelsChart`, `FunnelChart`, `RevenueChart`, `ContactsSalesChart`, `InteractionsList` e `SalesList` agora espelham estilos React. |
| SB-28 | P0 | Corrigir acessibilidade AlertConfiguration | Associar labels e nomes acessiveis aos campos da configuracao de alertas, incluindo canais dinamicos. | Inputs e selects ligados via `htmlFor`/`id`, labels visuais/ocultos e `aria-label` para configuracoes especificas. |
| SB-29 | P0 | Corrigir acessibilidade PerformanceBudgets | Garantir que o formulario de orcamentos possua rotulos mapeados a todos os campos, incluindo checkbox e textarea. | IDs unicos adicionados, labels vinculados e controles prontos para validacao com axe. |
| SB-30 | P0 | Normalizar atributos ARIA core | Ajustar componentes base para usar valores booleanos em atributos ARIA e garantir texto acessivel. | `Button` e `StatusDropdown` revisados com booleanos nativos e heuristicas de texto acessivel. |

---

## Status do Projeto

### Metricas Atuais
- 17 itens concluidos (ver secao Feito); 7 pendencias prioritarias em aberto (SB-23, SB-24, SB-25, SB-26, SB-27, SB-31, SB-32; 4 delas P0).
- Pacotes `@adsmagic/*` aguardam revisao dos tokens antes de release publico.
- Testes automatizados: unit tests React/Vue verdes; Playwright visual configurado com baseline parcial (3 de 11 telas) mas BLOQUEADO pelo servidor legado não funcionando.
- Documentacao: Storybook Hub publicado com 9 guias; guias tecnicos precisam atualizacao (SB-26).
- Acessibilidade: correcoes aplicadas para campos sem nome acessivel e atributos ARIA (SB-28 a SB-30); executar validacao axe/teclado para confirmar.
- CI/CD: workflows de lint/build ativos; regressao visual bloqueada por conflito de porta (SB-23) e servidor legado não funcionando (BL-01).

### Componentes Implementados
**React Components (18):**
- AvatarHighlight, Badge, Button, Card, ChannelsChart, ContactsSalesChart, DataTable, Drawer, FunnelChart, Header, InteractionsList, RevenueChart, SalesList, Sidebar, StatusDropdown, SummaryCard, SummaryCardGrid, WhatsAppIndicator

**Vue Components (18):**
- DsAvatarHighlight, DsBadge, DsButton, DsCard, DsChannelsChart, DsContactsSalesChart, DsDataTable, DsDrawer, DsFunnelChart, DsHeader, DsInteractionsList, DsRevenueChart, DsSalesList, DsSidebar, DsStatusDropdown, DsSummaryCard, DsSummaryCardGrid, DsWhatsAppIndicator

**Tokens:**
- Sistema completo de design tokens (cores, espaçamentos, tipografia, sombras, bordas)

### Infraestrutura
- Monorepo com workspaces npm, builds Vite e tsup.
- Lint e testes unitarios integrados; smoke do Storybook rodando em CI.
- Workflows GitHub Actions para lint/build e deploy do hub; job visual pendente (SB-23).
 - Changesets e semantic-release configurados; releases aguardam validacao dos componentes apos ajustes de tokens (SB-22).


---

### Foco imediato
- **BLOQUEIO ATUAL:** Testes visuais precisam do servidor legado funcionando (BL-01)
- SB-32: corrigir servidor legado para testes visuais.
- SB-23: sincronizar infraestrutura Playwright e destravar regressao visual.
- SB-24: completar baseline visual do legado.
- SB-27: acoplar testes do dashboard React ao CI.
- SB-25: revisar monitoramento, alertas e feature flags.
- SB-26: atualizar documentacao e changelog com status real.

### Roadmap Q4 2025
- **BLOQUEIO CRÍTICO:** Resolver servidor legado para destravar testes visuais (SB-32).
- Integrar Figma MCP com tokens e bibliotecas (SB-16).
- Retomar otimizacao de bundles e medir novamente ganhos (SB-17).
- Expandir documentacao de API, testes E2E e i18n apos estabilizar pendencias (SB-18 a SB-20).
