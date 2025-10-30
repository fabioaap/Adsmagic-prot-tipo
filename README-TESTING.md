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

### Testes Visuais (Regressão Visual)

#### Arquivos de Teste Visual
- `tests/visual/legacy-baseline.spec.ts` - 14 testes (baseline HTML legado)
- `tests/visual/react-parity.spec.ts` - 15 testes (paridade React)
- `tests/visual/vue-parity.spec.ts` - 15 testes (paridade Vue)
- `tests/visual/mobile-parity.spec.ts` - 6 testes (responsividade mobile/tablet)
- `tests/storybook-visual.spec.ts` - 5 testes (Storybook)

#### **Total: 55 testes visuais configurados**

#### Telas Validadas
**3 de 11 telas disponíveis foram validadas:**

1. **Homepage/Dashboard** (`index.html`) - Layout completo validado
2. **Página de Vendas** (`vendas.html`) - Cards e métricas validadas
3. **Página de Contatos** (`contatos.html`) - Listas e filtros validadas

#### Telas Disponíveis (não testadas)
- eventos.html
- funil.html
- integracoes.html
- links.html
- mensagens.html
- relatorios.html
- suporte.html
- configuracoes.html

#### Status dos Testes Visuais
- **Configuração:** ✅ Completa (55 testes implementados)
- **Execução:** ⚠️ Pendente (servidor legado porta 4100 com problema)
- **Baseline:** ⏳ Aguardando correção do servidor para captura inicial

## Funcionalidade coberta

- Dois ultimos cards ("Ciclo de vendas" e "Clientes ativos") permanecem lado a lado em viewports largas.
- Cards mantem espacamento proporcional (cerca de 50% da largura cada um).
- Layout se reorganiza para 4 colunas (desktop), 3 colunas (tablet), 2 colunas (mobile) e 1 coluna (mobile pequeno).

## Estrutura relevante

```
tests/
  basic.spec.js                    # Testes basicos do dashboard
  card-layout.spec.js             # Regras especificas de layout dos cards
  storybook-visual.spec.ts        # Testes visuais do Storybook (5 testes)
  visual/
    legacy-baseline.spec.ts       # Baseline HTML legado (14 testes)
    react-parity.spec.ts          # Paridade React vs legado (15 testes)
    vue-parity.spec.ts            # Paridade Vue vs legado (15 testes)
    mobile-parity.spec.ts         # Responsividade mobile/tablet (6 testes)
playwright.config.js              # Configuracao do Playwright
playwright.visual.config.ts       # Configuracao testes visuais
test-server.js                    # Servidor HTTP simples usado em debug
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

- **Cobertura atual:** Layout, responsividade e regressão visual do protótipo HTML
- **Testes visuais:** 55 testes configurados (3 telas validadas de 11 disponíveis)
- **Status:** Sistema de testes visuais completo mas aguardando correção do servidor legado
- **Próximos passos:**
  - Corrigir servidor legado (porta 4100) para executar baseline visual
  - Expandir testes para cobrir todas as 11 telas disponíveis
  - Adicionar smoke tests para os Storybooks React/Vue
  - Integrar ferramenta de regressão visual (Chromatic, Percy) para detecção automática de divergências

## Conclusao

A suite Playwright garante que o dashboard legado continue renderizando corretamente. Execute `npm test` antes de abrir PRs e mantenha este guia alinhado a quaisquer ajustes de layout ou rotas.
