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

- `relatorios.html`: biblioteca de relatórios com filtros, cards analíticos e próximos envios.
- `integracoes.html`: gerenciamento das integrações, canais conectados e distribuição da Tag Adsmágic.
- `configuracoes.html`: preferências globais, segurança e logs administrativos da conta.
- `suporte.html`: central de atendimento com chamados, canais e status dos serviços.

## Padrão visual compartilhado

- `assets/css/base.css` concentra tipografia, tokens de cor, espaçamentos e utilitários estruturais (sidebar, header, navegação, tabelas).
- `assets/js/nav.js` gera a navegação lateral compartilhada, aplica o destaque automático do item ativo, controla o estado recolhido/expandido da sidebar (com persistência em `localStorage`) e injeta os ícones/contadores de cada item.
- `assets/img/logo.svg` guarda o logotipo usado na barra lateral e nos cabeçalhos.
- As páginas consomem Tailwind via CDN apenas para utilitários pontuais; qualquer ajuste global deve ser feito primeiro em `base.css`.
- Para destacar a página atual, adicione o atributo `data-active="<id>"` no elemento `.app-nav` (ex.: `overview`, `contatos`, `vendas`); o script aplica `is-active` automaticamente durante o carregamento.
- Para habilitar o recolhimento da barra lateral, mantenha o botão com `data-sidebar-toggle` e o gatilho compacto com `data-sidebar-expand`; ambos são manipulados pelo `nav.js` e exibem tooltips automáticos quando a navegação está colapsada.
- Componentes reutilizáveis contam com classes auxiliares (`.card-shadow`, `.table-shell`, `.badge-soft`) definidas no CSS compartilhado para preservar sombras, bordas e badges.

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



