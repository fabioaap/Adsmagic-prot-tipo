# Backlog Storybook Hub

Registro das atividades ligadas a estabilizacao do Storybook Hub, testes e documentacao do design system Adsmagic.

---

## Backlog (ideias / longo prazo)

| ID | Tarefa | Descricao | Observacoes |
| --- | --- | --- | --- |
| SB-13 | Monorepo management avancado | Implementar estrategia de releases independentes e versionamento granular. | Changesets ja configurado, mas pode ser otimizado. |
| SB-14 | Performance monitoring | Adicionar metricas de build time, bundle size e load time. | Ferramentas como Bundle Analyzer e Lighthouse CI. |
| SB-15 | Acessibilidade avancada | Implementar testes WCAG 2.1 AA completos e automacao. | Axe-core ja integrado, expandir cobertura. |
| SB-16 | Integracao Figma MCP | Conectar design system com Figma via MCP para sync automatico. | Documentado em `docs/figma-mcp.md`, implementar integracao. |
| SB-17 | Otimizacao de bundles | Analisar e otimizar tamanhos de pacotes, tree-shaking e lazy loading. | Focar em reduzir bundle size dos componentes. |
| SB-18 | Documentacao API | Gerar documentacao OpenAPI/Swagger para componentes programaticos. | Complementar Storybook com docs tecnicas. |
| SB-19 | Testes de integracao E2E | Expandir cobertura E2E para fluxos completos de usuario. | Alem dos testes atuais, adicionar cenarios complexos. |
| SB-20 | Internacionalizacao (i18n) | Implementar suporte multi-idioma nos componentes. | Preparar para expansao global. |

## A Fazer (proximas prioridades)

| ID | Tarefa | Descricao | Observacoes |
| --- | --- | --- | --- |
| SB-13 | Monorepo management avancado | Implementar estrategia de releases independentes e versionamento granular. | Changesets ja configurado, focar em otimizacao. |
| SB-14 | Performance monitoring | Adicionar metricas de build time, bundle size e load time. | Implementar Bundle Analyzer e Lighthouse CI. |
| SB-16 | Integracao Figma MCP | Conectar design system com Figma via MCP para sync automatico. | Usar ferramentas existentes em `docs/figma-mcp.md`. |

## Fazendo

| ID | Tarefa | Descricao | Observacoes |
| --- | --- | --- | --- |
| -- | Nenhum item ativo | | |

## Bloqueios

| ID | Tarefa | Descricao | Impedimento |
| --- | --- | --- | --- |
| -- | Nenhum bloqueio registrado | | |

## Feito

| ID | Tarefa | Descricao | Observacoes |
| --- | --- | --- | --- |
| SB-01 | Migrar lint para configuracao flat | Substituir `.eslintrc` por `eslint.config.mjs` com React, Hooks e MDX. | `npm run lint --workspace @adsmagic/storybook-hub` estavel. |
| SB-02 | Normalizar README-TESTING.md | Corrigir caracteres corrompidos e reorganizar guia Playwright. | Arquivo reescrito em pt-BR e comandos validados. |
| SB-03 | Ampliar testes unitarios React/Vue | Cobrir componentes principais com Vitest + Testing Library. | Suites `@adsmagic/react` e `@adsmagic/vue` passam. |
| SB-04 | Build estatico do hub | Garantir `npm run build --workspace @adsmagic/storybook-hub` sem erros. | Build gera saida em `apps/storybook-hub/storybook-static`. |
| SB-05 | Documentacao do hub | Docs em MDX renderizando sem erros. | Navegacao principal carregando corretamente. |
| SB-06 | Smoke test Playwright do hub | Teste de fumaca para docs e navegacao. | Validado via `playwright.storybook.config.ts`. |
| SB-07 | Revisao/garantia da documentacao | Textos em ASCII e links funcionais. | Baseline pronto para iteracoes futuras. |
| SB-08 | Checklist de CI/CD | Definir pipeline lint/test/build + publicacao do hub. | Workflow `storybook-hub-ci.yml` criado com lint, build e smoke automatico. |
| SB-09 | Estrategia de versao dos pacotes | Formalizar SemVer, changelog e release notes para `@adsmagic/*`. | Implementado conventional commits, semantic-release e workflow automatico. |
| SB-10 | Integracao de regressao visual | Selecionar ferramenta (Chromatic/Percy) e configurar. | Implementado com Playwright Visual Comparison - CI/CD, screenshots e guia completo. |
| SB-11 | Publicacao do Storybook Hub | Deploy automatico via GitHub Pages apos CI passar. | Workflow atualizado com job de deploy; URL: https://fabioaap.github.io/Adsmagic-prot-tipo/
| SB-12 | Publicacao NPM automatica | Configurar Changesets para releases independentes dos pacotes `@adsmagic/*`. | Changesets configurado, CI/CD atualizado, documentacao criada em `docs/NPM_PUBLISHING.md`.

---

## Status do Projeto

### Métricas Atuais
- ✅ **12/12 tarefas do MVP** completadas (100%)
- 📦 **3 pacotes NPM** prontos para publicação (`@adsmagic/tokens`, `@adsmagic/react`, `@adsmagic/vue`)
- 🧪 **Testes automatizados** implementados (unitários, E2E, visual regression)
- 📚 **Documentação completa** no Storybook Hub
- 🚀 **CI/CD pipeline** funcionando com deploy automático
- 🎨 **Design system** com **29+ componentes** padronizados (11 React + 18 Vue)

### Componentes Implementados
**React Components (18):**
- AvatarHighlight, Badge, Button, Card, ChannelsChart, ContactsSalesChart, DataTable, Drawer, FunnelChart, Header, InteractionsList, RevenueChart, SalesList, Sidebar, StatusDropdown, SummaryCard, SummaryCardGrid, WhatsAppIndicator

**Vue Components (18):**
- DsAvatarHighlight, DsBadge, DsButton, DsCard, DsChannelsChart, DsContactsSalesChart, DsDataTable, DsDrawer, DsFunnelChart, DsHeader, DsInteractionsList, DsRevenueChart, DsSalesList, DsSidebar, DsStatusDropdown, DsSummaryCard, DsSummaryCardGrid, DsWhatsAppIndicator

**Tokens:**
- Sistema completo de design tokens (cores, espaçamentos, tipografia, sombras, bordas)

### Infraestrutura
- ✅ Monorepo com workspaces
- ✅ Build automatizado (Vite + tsup)
- ✅ Linting e formatação (ESLint flat config)
- ✅ Versionamento semântico (Changesets)
- ✅ Publicação automática (GitHub Actions)
- ✅ Deploy do Storybook (GitHub Pages)

---

1. **SB-13: Monorepo management avancado** - Otimizar estrategia de releases independentes
2. **SB-14: Performance monitoring** - Implementar metricas e alertas de performance
3. **SB-16: Integracao Figma MCP** - Conectar com design tokens e componentes
4. **SB-17: Otimizacao de bundles** - ✅ **CONCLUÍDO** - Bundle inicial reduzido de 505KB→2.84KB (99.4%), code splitting, compressão Gzip/Brotli, lazy loading
5. **SB-15: Acessibilidade avancada** - Expandir testes WCAG 2.1 AA

### Roadmap Q4 2025
- Publicacao oficial dos pacotes NPM
- Documentacao tecnica completa
- Performance benchmarking
- Expansao da suite de testes
- Preparacao para contribuicao externa
