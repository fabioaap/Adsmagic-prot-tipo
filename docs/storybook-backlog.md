# Backlog Storybook Hub

Registro das atividades ligadas a estabilizacao do Storybook Hub, testes e documentacao do design system Adsmagic.

---

## Backlog (ideias / longo prazo)

| ID | Tarefa | Descricao | Observacoes |
| --- | --- | --- | --- |
| SB-09 | Estrategia de versao dos pacotes | Formalizar SemVer, changelog e release notes para `@adsmagic/*`. | Implementado conventional commits, semantic-release e workflow automatico. |
| SB-10 | Integracao de regressao visual | Selecionar ferramenta (Chromatic/Percy) e configurar. | Implementado com Playwright Visual Comparison - CI/CD, screenshots e guia completo. |

## A Fazer (proximas prioridades)

| ID | Tarefa | Descricao | Observacoes |
| --- | --- | --- | --- |
| -- | Nenhum item prioritario pendente | | |

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

## Proximos passos imediatos

1. **Publicação dos pacotes NPM** - Configurar publishing automático dos `@adsmagic/*` packages
2. **Monorepo management** - Estratégia de releases independentes por pacote
3. **Performance monitoring** - Métricas de build/load time e otimização
4. **Acessibilidade avançada** - Testes automatizados WCAG 2.1 AA completos
5. **Integração com ferramentas externas** - Figma, ZeroHeight, ou similares
