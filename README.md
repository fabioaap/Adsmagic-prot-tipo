# Protótipos do Adsmágic

Este repositório concentra protótipos de interfaces e fluxos.

## Páginas disponíveis

- `index.html`: visão geral do dashboard com métricas, gráficos e painéis resumidos.
- `contatos.html`: listagem de contatos com filtros, tabela e paginação.
- `links.html`: gestão dos links rastreáveis com métricas por canal e tabela de desempenho.
- `mensagens.html`: acompanhamento das mensagens rastreadas por origem com filtros e tabela de resultados.
- `vendas.html`: acompanhamento de pipeline, metas trimestrais e negociações em destaque.
- `funil.html`: visão kanban do funil com indicadores de conversão e ações recomendadas.
- `eventos.html`: monitoramento de eventos recebidos dos parceiros com filtros e tabela.
- `integracoes.html`: gerenciamento das integrações, canais conectados e distribuição da Tag Adsmágic.

## Padrão visual compartilhado

- `assets/css/base.css` concentra tipografia, tokens de cor, espaçamentos e utilitários estruturais (sidebar, header, navegação, tabelas).
- `assets/js/nav.js` gera a navegação lateral compartilhada e aplica o destaque automático do item ativo.
- `assets/img/logo.svg` guarda o logotipo usado na barra lateral e nos cabeçalhos.
- As páginas consomem Tailwind via CDN apenas para utilitários pontuais; qualquer ajuste global deve ser feito primeiro em `base.css`.
- Para destacar a página atual, adicione o atributo `data-active="<id>"` no elemento `.app-nav` (ex.: `overview`, `contatos`, `vendas`); o script aplica `is-active` automaticamente durante o carregamento.
- Componentes reutilizáveis contam com classes auxiliares (`.card-shadow`, `.table-shell`, `.badge-soft`) definidas no CSS compartilhado para preservar sombras, bordas e badges.

## Integrações

- [Configuração do MCP do Figma](docs/figma-mcp.md): tokens, manifestos e fluxo para extrair HTML/CSS de frames via MCP.
  - ⚠️ No ambiente Codex Cloud, o servidor MCP do Figma não pode ser executado diretamente; use um cliente local para rodar o fluxo e apenas consulte o repositório por aqui.
