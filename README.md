# Protótipos do Adsmágic

Este repositório concentra protótipos de interfaces e fluxos.

## Páginas disponíveis

### Principal

- `index.html`: visão geral do dashboard com métricas, gráficos e painéis resumidos.
- `contatos.html`: listagem de contatos com filtros, tabela e paginação.
- `vendas.html`: acompanhamento de pipeline, metas trimestrais e negociações em destaque.
- `funil.html`: visão do funil com indicadores de conversão e ações recomendadas.
- `eventos.html`: monitoramento de eventos recebidos dos parceiros com filtros e tabela.

### Rastreamento

- `links.html`: gestão dos links rastreáveis com métricas por canal e tabela de desempenho.
- `mensagens.html`: acompanhamento das mensagens rastreadas por origem com filtros e tabela de resultados.

### Sistema

- `relatorios.html`: biblioteca de relat�rios com filtros, cards anal�ticos e pr�ximos envios.
- `integracoes.html`: gerenciamento das integra��es, canais conectados e distribui��o da Tag Adsm�gic.
- `configuracoes.html`: prefer�ncias globais, seguran�a e logs administrativos da conta.
- `suporte.html`: central de atendimento com chamados, canais e status dos servi�os.

### Design system

- `componentes.html`: cat�logo interativo de componentes com exemplos em HTML, React e Vue baseados nos mesmos tokens.
  - Cobertura atual: header, sidebar, cards base/resumo, bot�es, badges, tabela, dropdown de status e avatar destacado.

## Padrão visual compartilhado

- `assets/css/base.css` concentra tipografia, tokens de cor, espaçamentos e utilitários estruturais (sidebar, header, navegação, tabelas).
- `assets/js/nav.js` gera a navegação lateral compartilhada, aplica o destaque automático do item ativo, controla o estado recolhido/expandido da sidebar (com persistência em `localStorage`) e injeta os ícones/contadores de cada item.
- `assets/img/logo.svg` guarda o logotipo usado na barra lateral e nos cabeçalhos.
- As páginas consomem Tailwind via CDN apenas para utilitários pontuais; qualquer ajuste global deve ser feito primeiro em `base.css`.
- Para destacar a página atual, adicione o atributo `data-active="<id>"` no elemento `.app-nav` (ex.: `overview`, `contatos`, `vendas`); o script aplica `is-active` automaticamente durante o carregamento.
- Para habilitar o recolhimento da barra lateral, mantenha o botão com `data-sidebar-toggle` e o gatilho compacto com `data-sidebar-expand`; ambos são manipulados pelo `nav.js` e exibem tooltips automáticos quando a navegação está colapsada.
- Componentes reutilizáveis contam com classes auxiliares (`.card-shadow`, `.table-shell`, `.badge-soft`) definidas no CSS compartilhado para preservar sombras, bordas e badges.

## Design system compartilhado

- `assets/css/base.css` expõe os tokens como variáveis CSS (seção `:root`) e utilitários `.ds-*` que servem de base para HTML puro.
- `assets/tokens/design-tokens.json` é a fonte canônica dos tokens (tipografia, cores, espaçamentos, raios, sombras e aliases). Gere novas saídas a partir desse arquivo para garantir consistência entre stacks.
- `assets/tokens/index.js` fornece helpers utilitários:
  ```js
  import { designTokens, toCSSVariables, createCSSVariablesString } from "./assets/tokens/index.js";

  const cssVars = toCSSVariables(); // { "--ds-color-primary-600": "#2563eb", ... }
  document.documentElement.style.setProperty("--ds-color-primary-600", cssVars["--ds-color-primary-600"]);
  ```
- React: `assets/tokens/react.js` expõe o hook `useDesignTokens()` (aplica as variáveis CSS automaticamente) e `createReactTheme()` (objeto plano para styled-components/emotion).
  ```jsx
  import { useDesignTokens, createReactTheme } from "./assets/tokens/react.js";

  export function App() {
    useDesignTokens(); // aplica no documentElement
    const theme = createReactTheme();
    return <ThemeProvider theme={theme}>...</ThemeProvider>;
  }
  ```
- Vue: `assets/tokens/vue.js` disponibiliza `createDesignSystemPlugin()` para injetar tokens e variáveis CSS na aplicação.
  ```js
  import { createApp } from "vue";
  import { createDesignSystemPlugin } from "./assets/tokens/vue.js";

  const app = createApp(App);
  app.use(createDesignSystemPlugin({ prefix: "--ds" }));
  app.mount("#app");
  ```
- Botões padrão: combine `.ds-btn` com variantes de estado/tamanho (`.ds-btn--primary`, `.ds-btn--ghost`, `.ds-btn--tonal`, `.ds-btn--sm`, `.ds-btn--xs`, `.ds-btn--full`, `.ds-btn--align-start`, `.ds-btn--pill`, `.ds-btn--icon`, `.ds-btn--square`) para cobrir CTA primário, fantasma, ícones, listas e paginação.

## Integrações

- [Configuração do MCP do Figma](docs/figma-mcp.md): tokens, manifestos e fluxo para extrair HTML/CSS de frames via MCP.
  - Obs.: No ambiente Codex Cloud, o servidor MCP do Figma não pode ser executado diretamente; use um cliente local para rodar o fluxo e apenas consulte o repositório por aqui.

## Como compartilhar a `main` com o agente

O ambiente do agente só enxerga as branches que existem localmente no contêiner atual. Se você quer que ele veja a `main` (ou qualquer outra branch de referência), siga os passos abaixo no seu terminal antes de iniciar uma nova conversa:

1. Garanta que a branch exista no repositório remoto:
   ```bash
   git checkout main
   git push origin main
   ```
   > Caso ainda não exista, crie a partir da branch desejada: `git checkout -b main` e depois faça o push.
2. Dentro do contêiner (ou do ambiente que o agente está usando), adicione o mesmo remoto e faça o fetch:
   ```bash
   git remote add origin <URL-do-repositorio>
   git fetch origin main
   git checkout main
   ```
3. Sempre que trouxer novas alterações, rode `git pull origin main` para atualizar a branch local antes de pedir novas mudanças ao agente.

Com isso, a branch `main` passa a estar disponível localmente e o agente pode inspecioná-la, compará-la com outras branches e criar PRs tomando `main` como base.










