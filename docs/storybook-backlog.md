# Backlog Storybook Hub

Registro das atividades ligadas a estabilizacao do Storybook Hub, testes e documentacao do design system Adsmagic.

---

## Backlog (ideias / longo prazo)

| ID | Tarefa | Descricao | Observacoes |
| --- | --- | --- | --- |
| SB-09 | Estrategia de versao dos pacotes | Formalizar SemVer, changelog e release notes para `@adsmagic/*`. | Depende da estabilizacao das bibliotecas. |
| SB-10 | Integracao de regressao visual | Selecionar ferramenta (Chromatic/Percy) e configurar. | Avaliar apos smoke tests estabilizados. |

## A Fazer (proximas prioridades)

| ID | Tarefa | Descricao | Observacoes |
| --- | --- | --- | --- |
| SB-11 | Publicacao do Storybook Hub | Selecionar estrategia de entrega (artifact, GitHub Pages ou Vercel). | Depende da definicao de ambiente alvo. |

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

---

## Proximos passos imediatos

1. Discutir canal de publicacao automatica (SB-11) para acesso dos stakeholders.
2. Planejar estrategia de versao (SB-09) considerando processos de release.
3. Avaliar integracao de regressao visual (SB-10) apos estabilizar CI/CD.
