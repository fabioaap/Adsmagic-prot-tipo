# Guia de Testes do Projeto Adsmagic

Este guia explica como preparar o ambiente, executar as suites Playwright e acompanhar o status dos testes end-to-end e visuais.

## Requisitos
- Node.js LTS (18 ou superior)
- npm instalado (ou outro gerenciador compatível)

## Instalação
Na raiz do repositório, rode:

```bash
npm install
```

Esse comando prepara todos os workspaces do monorepo.

## Servidores necessários
- Legado HTML: `node test-server.js` (porta 4100)
- Storybook React: `npm run dev:react` (porta 6008)
- Storybook Vue: `npm run dev:vue` (porta 7007)

Sempre inicie o servidor do legado antes de rodar qualquer teste. Os Storybooks só são necessários para a suite de paridade visual.

## Suites Playwright
- `npm test`: smoke E2E (`tests/basic.spec.js` e `tests/card-layout.spec.js`)
- `npm run test:ui`: interface visual do Playwright
- `npm run test:debug`: execução com pausas interativas
- `npx playwright test tests/<arquivo>`: executa um arquivo específico

### Suites de regressão visual
- `npm run test:visual`: executa todos os cenários configurados
- `npm run test:visual:baseline`: captura screenshots do legado
- `npm run test:visual:parity`: compara React/Vue com o legado
- `npm run test:visual:update`: atualiza screenshots após validar mudanças intencionais

## Cobertura atual
- **E2E HTML**: garante navegação, cards, tabelas e gráficos principais. Também cobre breakpoints mobile, tablet e desktop.
- **Card layout**: valida existência dos 14 cards e alinhamento dos dois últimos em telas amplas.
- **Regressão visual**: 55 cenários criados, com baseline aprovado em 3 de 11 telas HTML (`index`, `vendas`, `contatos`). O restante aguarda captura após ajustes de tokens e layout.

### Arquivos relevantes
```
tests/
  basic.spec.js
  card-layout.spec.js
  storybook-visual.spec.ts
  visual/
    legacy-baseline.spec.ts
    react-parity.spec.ts
    vue-parity.spec.ts
    mobile-parity.spec.ts
playwright.config.js            # Base URL alinhada na porta 4100
playwright.visual.config.ts     # Configuração da suite visual
test-server.js                  # Servidor do protótipo legado
```

## Troubleshooting rápido
1. **Servidor não responde** – verifique `node test-server.js`. A porta padrão é 4100 e está alinhada com todos os workflows.
2. **Dependências ausentes** – rode `npm install` novamente.
3. **Falhas visuais** – abra `npm run test:ui` para inspecionar o DOM.
4. **Snapshots desatualizados** – use `npx playwright test --update-snapshots` depois de revisar as mudanças.

## Próximos passos recomendados
1. Manter o servidor legado estável na porta 4100 (local e CI).
2. Capturar o baseline das 8 telas HTML restantes.
3. Conectar `npm test` ao pipeline principal para o dashboard React.
4. Revisar tolerâncias e tokens antes de habilitar o bloqueio automático por regressão visual.
