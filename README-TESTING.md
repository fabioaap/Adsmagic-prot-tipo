# Guia de Testes do Projeto Adsmagic

Este documento explica como instalar dependencias, executar a suite Playwright e entender o que cada teste garante no prototipo legado do dashboard.

## Requisitos

- Node.js LTS (18+)  
- npm instalado (ou outro gerenciador compatível)

## Instalacao

```bash
npm install
```

Execute o comando na raiz do workspace para preparar todos os pacotes.

## Executando os testes

### Todos os testes e2e

```bash
npm test
```

### Interface visual do Playwright

```bash
npm run test:ui
```

### Modo debug (pausas interativas)

```bash
npm run test:debug
```

### Arquivos especificos

```bash
npx playwright test tests/basic.spec.js
npx playwright test tests/card-layout.spec.js
```

## Testes implementados

### `tests/basic.spec.js`

- Valida titulo da pagina e conteudo principal do dashboard.
- Confere cards de resumo, navegacao lateral, tabelas e graficos.
- Exercita breakpoints mobile, tablet e desktop.

### `tests/card-layout.spec.js`

- Garante a presenca de 14 cards.
- Checa alinhamento lado a lado dos dois ultimos cards.
- Valida conteudo dos cards finais e responsividade em diferentes larguras.

## Funcionalidade coberta

- Dois ultimos cards ("Ciclo de vendas" e "Clientes ativos") permanecem lado a lado em viewports largas.
- Cards mantem espacamento proporcional (cerca de 50% da largura cada um).
- Layout se reorganiza para 4 colunas (desktop), 3 colunas (tablet), 2 colunas (mobile) e 1 coluna (mobile pequeno).

## Estrutura relevante

```
tests/
  basic.spec.js        # Testes basicos do dashboard
  card-layout.spec.js  # Regras especificas de layout dos cards
playwright.config.js   # Configuracao do Playwright
test-server.js         # Servidor HTTP simples usado em debug
```

## Troubleshooting rapido

1. **Servidor nao responde**  
   Rode `node test-server.js` e confirme se a porta 8000 esta livre.

2. **Dependencias faltando**  
   Reinstale com `npm install`.

3. **Falhas visuais ou seletores**  
   Abra `npm run test:ui` para inspecionar o DOM com o inspector do Playwright.

4. **Snapshot desatualizado**  
   Revalide com `npx playwright test --update-snapshots`.

## Cobertura e proximos passos

- Cobertura atual foca em layout e responsividade do prototipo HTML.
- Recomenda-se adicionar smoke tests para os Storybooks React/Vue assim que o design system substituir o legado.
- Avalie integrar regressao visual (Chromatic, Percy) para detectar divergencias no layout.

## Conclusao

A suite Playwright garante que o dashboard legado continue renderizando corretamente. Execute `npm test` antes de abrir PRs e mantenha este guia alinhado a quaisquer ajustes de layout ou rotas.
