# Guia rápido para agentes AI

## Arquitetura e módulos
- Monorepo npm com workspaces `packages/*` e `apps/*`; dependências cruzadas via `file:` (sem registry privado).
- `packages/tokens` centraliza tokens em TS/CSS; qualquer cor, spacing ou sombra deve vir daqui.
- `packages/react-components` e `packages/vue-components` espelham API (props `variant`/`size`, slots `leading`/`trailing`) e geram bundles via `tsup`.
- `apps/storybook-{react,vue}` expõem catálogos em 6008/7007; `apps/storybook-hub` agrega docs MDX e consome os catálogos por refs.
- `apps/prototype-static` guarda o HTML legado servido por `npm run dev:legacy` (porta 4100) para comparação visual.

## Fluxo de desenvolvimento
- Instale dependências uma vez na raiz com `npm install`; execute scripts sempre pela raiz usando `--workspace` implícito.
- Para editar componentes use `.\start-all-storybooks.ps1` ou suba manualmente `npm run dev:react`, `npm run dev:vue` e, por último, `npm run dev`; o hub falha se 6008/7007 estiverem fora do ar.
- Build estático do hub: `npm run build` (garanta catálogos ativos ou recém-buildados). Para empacotar libs rodar `npm run build --workspace @adsmagic/{tokens,react,vue}`.
- Testes: `npm test` roda Vitest nos pacotes e Playwright (`playwright.config.js` legado e `playwright.storybook.config.ts` smoke). `npm run test:ui` abre inspector interativo.
- E2E local usam `test-server.js` (porta 8000) sobre o protótipo; use `npm run dev:legacy` para visual mapear discrepâncias.

## Padrões de componentes
- Estilização sempre via `tokens`; React usa objetos `variantTokens/sizeTokens` combinados no render; Vue reproduz com `computed` e slots nomeados.
- Estrutura obrigatória: `src/components/Nome/Nome.{tsx,vue}` + `.stories.{tsx,ts}` + `.test.{tsx,ts}` com exports centralizados em `src/index.ts`.
- Stories devem cobrir estados (hover/disabled) e manter paridade React↔Vue; use `SummaryCardGrid`, `DataTable` etc. como referência de composição.
- Storybook Hub resolve aliases `@adsmagic/tokens`/`@adsmagic/tokens/css` em `apps/storybook-hub/.storybook/main.ts` e usa refs em função para contornar ausência de `metadata.json` no modo dev.

## Convenções e utilidades
- Commits e docs em pt-BR; guias vivos em `apps/storybook-hub/docs` descrevem padrões de UX, QA e governança.
- Scripts PowerShell `start-all-storybooks.ps1` e `stop-all-storybooks.ps1` automatizam subir/derrubar as portas 6006/6008/7007 no Windows.
- Problemas recorrentes: sem catálogos → “Loading of ref failed”; revise se `index.json` responde em 6008/7007 e reinicie o hub após alterar `main.ts`.
- Consulte `docs/figma-mcp.md` ao gerar telas vindas do Figma MCP e prefira tokens/componentes existentes antes de codar algo novo.
