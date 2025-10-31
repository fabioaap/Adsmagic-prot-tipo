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

#### Arquivos de Teste Visual configurados
- `tests/visual/legacy-baseline.spec.ts` - 14 cenarios previstos (baseline HTML legado)
- `tests/visual/react-parity.spec.ts` - 15 cenarios previstos (paridade React)
- `tests/visual/vue-parity.spec.ts` - 15 cenarios previstos (paridade Vue)
- `tests/visual/mobile-parity.spec.ts` - 6 cenarios previstos (responsividade mobile/tablet)
- `tests/storybook-visual.spec.ts` - 5 cenarios previstos (Storybook)

> Os arquivos estao prontos, mas parte dos cenarios depende de capturar novas screenshots e ajustes de infraestrutura antes de rodar em CI.

####  Telas Validadas
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
- **Configuracao:** parcial. Suites e scripts existem, mas ha inconsistencias de tokens e desalinhamento de portas interferindo nos cenarios.
- **Execucao:** pendente. O workflow visual tenta subir o legado na porta 8000 enquanto `test-server.js` usa 4100.
- **Baseline:** incompleto. Apenas 3 telas possuem screenshots validadas; 8 telas aguardam captura apos ajustar infraestrutura.

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
   Rode `node test-server.js` e confirme a porta em uso. O script atual utiliza **4100**; alinhe o workflow/Playwright antes de rodar os testes.

2.  **Dependencias faltando**  
   Reinstale com `npm install`.

3. **Falhas visuais ou seletores**  
   Abra `npm run test:ui` para inspecionar o DOM com o inspector do Playwright.

4. **Snapshot desatualizado**  
   Revalide com `npx playwright test --update-snapshots`.

## Cobertura e proximos passos

- **Cobertura atual:** Layout e responsividade do prototipo HTML (Playwright tradicional) + smoke visual parcial.
- **Testes visuais:** 55 cenarios configurados (3 telas com baseline valido, 8 pendentes).
- **Status:** aguardando correcao da porta do servidor legado, revisao de tokens e captura do baseline completo.
- **Proximos passos:**
  - Padronizar a porta do servidor legado e revalidar o workflow visual
  - Capturar baseline para as 11 telas do legado
  - Adicionar smoke tests integrados para os Storybooks React/Vue
  - Reavaliar ferramentas SaaS (Chromatic/Percy) apos estabilizar Playwright

## Conclusao

A suite Playwright cobre fluxos principais do legado, mas depende da conclusao das pendencias listadas (baseline completo, alinhamento de portas e tokens) para garantir paridade visual total. Execute `npm test` para smoke e valide manualmente os cenarios pendentes ate que o pipeline visual esteja estavel.
