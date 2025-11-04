# Guia da Regressao Visual

Este documento resume o estado atual da suite de regressao visual do design system Adsmagic, descreve o fluxo de execucao e lista os proximos passos para liberar o pipeline em CI.

## Status atual
- **Cenarios configurados:** 55 (baseline legado, paridade React, paridade Vue, mobile/tablet e Storybook).
- **Baseline aprovado:** 3 de 11 telas HTML (`index`, `vendas`, `contatos`).
- **Porta padrao do legado:** 4100 (alinhamento entre `test-server.js`, `playwright.config.js` e workflows).
- **Bloqueios:** servidor legado ainda instavel e componentes React/Vue com diffs de tokens em relacao ao HTML.
- **Confiabilidade:** pipelines automatizados em modo observacao; nao bloquear merges ate concluir baseline e estabilizar tokens.

## Estrutura dos testes
```
tests/
  visual/
    legacy-baseline.spec.ts    # Referencia do legado HTML (14 cenarios)
    react-parity.spec.ts       # Paridade componentes React (15 cenarios)
    vue-parity.spec.ts         # Paridade componentes Vue (15 cenarios)
    mobile-parity.spec.ts      # Responsividade mobile/tablet (6 cenarios)
  storybook-visual.spec.ts     # Smoke visual do Storybook Hub (5 cenarios)
snapshots/visual/              # Screenshots de referencia
test-results/visual/           # Diffs e relatorios temporarios
playwright.visual.config.ts    # Configuracao dedicada
```

## Como executar
1. `npm install`
2. `npx playwright install --with-deps` (necessario apenas na primeira execucao em cada maquina)
3. Inicie em terminais separados:
   - `node test-server.js` (porta 4100)
   - `npm run dev:react`
   - `npm run dev:vue`
4. Rode `npm run test:visual` para executar todos os cenarios.

### Atualizar baseline
1. Valide as telas localmente com o time de design/PM.
2. Execute `npm run test:visual:update`.
3. Revise os diffs em `test-results/visual-reports`.
4. Commite apenas as imagens aprovadas em `snapshots/visual/`.

## Itens pendentes
1. **Servidor legado resiliente:** documentar smoke simples e adicionar health-check garantindo resposta em `http://localhost:4100`.
2. **Baseline completo:** capturar as telas restantes (`eventos`, `funil`, `integracoes`, `links`, `mensagens`, `relatorios`, `suporte`, `configuracoes`).
3. **Tokens sincronizados:** ajustar cores, espacamentos e tipografia para reduzir falsos positivos.
4. **Tolerancias revisadas:** confirmar `threshold: 0.01` e `maxDiffPixelRatio: 0.05` apos baseline completo.
5. **Integracao no CI:** reativar o workflow `visual-regression` somente depois que baseline e tolerancias estiverem estabilizados.

## Troubleshooting rapido
- **Timeout aguardando servidor:** confirme `node test-server.js` ativo e ouvindo na porta 4100; em CI aguarde HTTP 200 antes da suite.
- **Diferencas constantes:** verifique carregamento de fontes/tokens e reduza animacoes nos componentes.
- **Nenhum teste encontrado:** `npx playwright test --config=playwright.visual.config.ts --list`.

## Referencias uteis
- [Playwright Visual Comparisons](https://playwright.dev/docs/test-screenshots)
- [Storybook Visual Testing](https://storybook.js.org/docs/writing-tests/visual-testing)
- [Playwright test-snapshots API](https://playwright.dev/docs/test-assertions#snapshot-testing)
