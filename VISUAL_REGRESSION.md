# Guia da Regressao Visual

Este documento resume o estado atual da suite de regressao visual do design system Adsmagic, descreve o fluxo de execucao e lista os proximos passos para liberar o pipeline em CI.

## Status atual
- **Cenarios configurados:** 55 (baseline legado, paridade React, paridade Vue, mobile/tablet e Storybook).
- **Baseline aprovado:** 11 de 11 telas HTML (`index`, `vendas`, `contatos`, `eventos`, `funil`, `integracoes`, `links`, `mensagens`, `relatorios`, `suporte`, `configuracoes`).
- **Porta padrao do legado:** 4100 (alinhamento entre `test-server.js`, `playwright.config.js` e workflows).
- **Status:** ✅ Baseline completo e funcional; pronto para CI em produção.

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
1. **Integração Figma MCP:** Conectar design system com Figma via MCP para sync automático.
2. **Otimização de bundles:** Analisar e otimizar tamanhos de pacotes, tree-shaking e lazy loading.
3. **Internacionalização:** Implementar suporte multi-idioma nos componentes.
4. **Monitoramento avançado:** Adicionar métricas de performance e error tracking.
5. **Integração CI completa:** Expandir cobertura para testes E2E complexos.

## Troubleshooting rapido
- **Timeout aguardando servidor:** confirme `node test-server.js` ativo e ouvindo na porta 4100; em CI aguarde HTTP 200 antes da suite.
- **Diferencas constantes:** verifique carregamento de fontes/tokens e reduza animacoes nos componentes.
- **Nenhum teste encontrado:** `npx playwright test --config=playwright.visual.config.ts --list`.

## Referencias uteis
- [Playwright Visual Comparisons](https://playwright.dev/docs/test-screenshots)
- [Storybook Visual Testing](https://storybook.js.org/docs/writing-tests/visual-testing)
- [Playwright test-snapshots API](https://playwright.dev/docs/test-assertions#snapshot-testing)
