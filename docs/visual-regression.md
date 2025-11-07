# Regressao Visual - Guia detalhado

Este guia complementa o backlog do Storybook Hub e descreve como operar a suite de regressao visual, seus cenarios e os passos para estabiliza-la.

## 1. Resumo do estado atual
- Porta consolidada do legado: **4100** (`test-server.js`, `playwright.config.js`, workflows).
- Baseline aprovado: **3 de 11** telas HTML (`index`, `vendas`, `contatos`).
- Cenarios criados: **55** (legacy, React, Vue, mobile/tablet e Storybook).
- Workflow `visual-regression` continua bloqueado por:
  1. Servidor legado intermitente (BL-01).
  2. Tokens e estilos ainda divergentes do HTML original.
  3. Falta do baseline das 8 telas restantes.

## 2. Estrutura dos testes
```
tests/
  visual/
    legacy-baseline.spec.ts    # 14 cenarios - baseline do prototipo HTML
    react-parity.spec.ts       # 15 cenarios - comparacao componentes React
    vue-parity.spec.ts         # 15 cenarios - comparacao componentes Vue
    mobile-parity.spec.ts      # 6 cenarios - responsividade
  storybook-visual.spec.ts     # 5 cenarios - Storybook Hub
playwright.visual.config.ts    # Configuracao dedicada
snapshots/visual/              # Screenshots de referencia
test-results/visual/           # Artefatos temporarios e diffs
```

## 3. Executando localmente
1. Instale dependencias: `npm install`.
2. Instale navegadores Playwright (primeira execucao em cada maquina): `npx playwright install --with-deps`.
3. Suba os servidores em terminais separados:
   - Legado HTML: `node test-server.js` (porta 4100).
   - Storybook React: `npm run dev:react` (porta 6008).
   - Storybook Vue: `npm run dev:vue` (porta 7007).
4. Rode `npm run test:visual`.

### Scripts auxiliares
- `npm run test:visual:baseline`: executa apenas `legacy-baseline.spec.ts`.
- `npm run test:visual:parity`: executa React e Vue contra o baseline.
- `npm run test:visual:update`: atualiza screenshots apos validar uma mudanca intencional.

## 4. Processo para atualizar baseline
1. Certifique-se com o time de design/PM que a mudanca visual e desejada.
2. Execute `npm run test:visual:update`.
3. Analise os diffs em `test-results/visual-reports`.
4. Commite as imagens em `snapshots/visual/` apenas depois do aval do time.

## 5. Pendencias prioritarias (backlog)
1. **SB-32 / BL-01:** restaurar o servidor legado (porta 4100) com health-check e script de monitoramento.
2. **SB-23:** garantir que pipelines CI e scripts locais aguardem o servidor na porta 4100 antes da suite iniciar.
3. **SB-24:** capturar baseline das 8 telas restantes (`eventos`, `funil`, `integracoes`, `links`, `mensagens`, `relatorios`, `suporte`, `configuracoes`).
4. **SB-25/SB-26:** revisar tokens, tolerancias e documentacao para refletir o status real.
5. **SB-27:** plugar `npm test` no CI principal para detectar regressao antes de acionar a suite visual completa.

## 6. Troubleshooting
- **Timeout no servidor:** verifique se `node test-server.js` esta ativo. Em CI, considere script que aguarde `http://localhost:4100/index.html` responder com HTTP 200.
- **Diferencas constantes em graficos:** inspecionar carregamento de fontes e animacoes, aplicar `waitForTimeout` ou `mask` em areas dinamicas.
- **Nenhum teste encontrado:** `npx playwright test --config=playwright.visual.config.ts --list`.
- **Diferencas pequenas irrecuperaveis:** avalie ajustar `threshold` ou `maxDiffPixelRatio` no config dedicado apos analise com design.

## 7. Proximos passos sugeridos
1. Automatizar smoke do servidor legado e expor log claro em CI.
2. Registrar no CHANGELOG quando novas telas tiverem baseline aprovado.
3. Documentar checklists de aprovacao visual junto ao time de design.
4. Medir tempo de execucao da suite completa para planejar thresholds de CI.

Com esses itens concluidos, o pipeline de regressao visual podera sair do modo observacao e bloquear PRs com confianca.
