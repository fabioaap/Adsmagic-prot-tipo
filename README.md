# Protótipos do Adsmágic

Este repositório concentra protótipos de interfaces e fluxos.

## Páginas disponíveis

- `index.html`: visão geral do dashboard com métricas, gráficos e painéis resumidos.
- `contatos.html`: listagem de contatos com filtros, tabela e paginação.
- `vendas.html`: acompanhamento de pipeline, metas trimestrais e negociações em destaque.
- `funil.html`: visão kanban do funil com indicadores de conversão e ações recomendadas.

## Padrão visual compartilhado

- `assets/css/base.css` concentra tipografia, tokens de cor, espaçamentos e utilitários estruturais (sidebar, header, navegação, tabelas).
- `assets/img/logo.svg` guarda o logotipo usado na barra lateral e nos cabeçalhos.
- As páginas consomem Tailwind via CDN apenas para utilitários pontuais; qualquer ajuste global deve ser feito primeiro em `base.css`.
- Para destacar a página atual, utilize a classe `is-active` sobre o link correspondente na navegação lateral (`.app-nav-link`).
- Componentes reutilizáveis contam com classes auxiliares (`.card-shadow`, `.table-shell`, `.badge-soft`) definidas no CSS compartilhado para preservar sombras, bordas e badges.

## Integrações

- [Configuração do MCP do Figma](docs/figma-mcp.md): tokens, manifestos e fluxo para extrair HTML/CSS de frames via MCP.
  - ⚠️ No ambiente Codex Cloud, o servidor MCP do Figma não pode ser executado diretamente; use um cliente local para rodar o fluxo e apenas consulte o repositório por aqui.
