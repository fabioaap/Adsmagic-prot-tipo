# Instruções para usar os prompts no Adsmagic

Este repositório contém um conjunto de arquivos de instruções para orientar o comportamento de agentes de inteligência artificial (como ChatGPT, Copilot, Cursor ou Claude Code). Eles são projetados para suportar um **Product Engineer** trabalhando em arquitetura full‑stack, design system em código, descoberta condicional e testes automatizados.

## Estrutura de arquivos

```
.prompts/
  instructions.md         # Prompt principal (system prompt) – ponto de entrada
  blocks/
    00_core.md            # Persona & regras básicas do Adsmagic
    01_discovery.md       # Processo de discovery (OST/hypótese/métrica/flag)
    02_design_system.md   # Design System Adsmagic, tokens e Storybook
    03_arch_clean.md      # Arquitetura limpa, testes, observabilidade e segurança
    04_games.md           # Diretrizes para gamificação (futuro)
    05_search_mode.md     # Modo de pesquisa quando faltar resposta
.cursorrules              # Regras globais do projeto (para Cursor/VS Code)
.vscode/settings.json     # Configurações de editor (ESLint, formatador, memória TS)
.github/PULL_REQUEST_TEMPLATE.md  # Template de PR com checklists
docs/adr/ADR-0000-template.md     # Template para Architecture Decision Records
```

## Como usar com VS Code, Cursor ou agentes similares

### 1. Prompt principal
Configure seu agente para ler `.prompts/instructions.md` como prompt de sistema ou instrução global do projeto. Ele apresenta a persona e indica quando consultar cada bloco.

### 2. Blocos adicionais
O agente deve carregar os arquivos em `.prompts/blocks/` dependendo da tarefa (via instrução ou referenciando manualmente):

- **Qualquer tarefa:** Sempre consulte `00_core.md` (persona e formato de resposta)
- **Componentes/Tokens:** Consulte `02_design_system.md`
- **Testes/Performance:** Consulte `03_arch_clean.md`
- **Experimentos:** Consulte `01_discovery.md`
- **Dúvidas técnicas:** Consulte `05_search_mode.md`
- **Gamificação (futuro):** Consulte `04_games.md`

### 3. .cursorrules
Para o Cursor ou VS Code com GitHub Copilot, este arquivo define regras persistentes do workspace:
- Ordem de resposta obrigatória
- Code-first (Storybook é fonte da verdade)
- Atualizar stories e testes visuais
- Commits em Conventional Commits (pt-BR)
- PRs pequenos e reversíveis

### 4. Configurações de editor
`.vscode/settings.json` configura:
- ESLint automático ao salvar
- Formatação automática
- Memória extra para TypeScript Server (4096 MB)

### 5. PR Template
`.github/PULL_REQUEST_TEMPLATE.md` fornece checklist completo:
- Delivery vs Discovery
- Segurança, performance, acessibilidade
- Testes, documentação, observabilidade
- Checklist específico do Adsmagic

### 6. ADRs
`docs/adr/ADR-0000-template.md` é o template para registrar decisões arquiteturais:
- Contexto → Opções → Decisão → Consequências → Referências
- Use para decisões técnicas significativas

## Contexto do Projeto Adsmagic

### Status Atual
- **95% completo**, pronto para produção
- **36 componentes** (18 React + 18 Vue) com paridade
- **55 testes visuais** configurados (aguardando servidor legado)
- **3 de 11 telas validadas** (Homepage, Vendas, Contatos)

### Estrutura
```
packages/
├── tokens/               # Design tokens (CSS + TypeScript)
├── react-components/     # 18 componentes React
└── vue-components/       # 18 componentes Vue (paridade)

apps/
├── storybook-hub/        # Hub centralizado (6006)
├── storybook-react/      # Catálogo React (6008)
├── storybook-vue/        # Catálogo Vue (7007)
├── prototype-static/     # HTML legado (4100)
└── dashboard-react/      # Dashboard React

tests/visual/             # 55 testes de regressão visual
```

### Comandos principais
```bash
# Desenvolvimento
npm run dev           # Storybook Hub (6006)
npm run dev:react     # Storybook React (6008)
npm run dev:vue       # Storybook Vue (7007)

# Build
npm run build         # Build completo

# Testes
npm test              # Unit tests (Vitest)
npm run test:visual   # Testes visuais (Playwright)
npm run test:ui       # Interface Playwright

# Lint
npm run lint          # ESLint
```

## Fluxo de Trabalho

### Para componentes novos:
1. Crie em `packages/react-components/src/components/Nome/`
2. Replique em `packages/vue-components/src/components/DsNome/`
3. Adicione stories em ambos Storybooks
4. Crie testes unitários (Vitest)
5. Adicione testes visuais em `tests/visual/`
6. Atualize documentação em `apps/storybook-hub/docs/`
7. Registre em ADR se decisão arquitetural

### Para experimentos (Discovery):
1. Consulte `.prompts/blocks/01_discovery.md`
2. Defina Mini-OST e hipótese
3. Configure feature flag com TTL/owner
4. Instrumente métricas
5. Execute experimento
6. Registre resultado em ADR

### Para dúvidas técnicas:
1. Consulte `.prompts/blocks/05_search_mode.md`
2. Busque em documentação oficial
3. Valide localmente
4. Cite fontes completas
5. Documente descoberta

## Observação
Estes arquivos são complementares ao código da aplicação. Eles não substituem o Design System ou o código de front/back, mas fornecem **contexto e guias** para que agentes e desenvolvedores sigam as melhores práticas definidas no projeto Adsmagic.

## Recursos do Projeto
- [Storybook Hub](https://fabioaap.github.io/Adsmagic-prot-tipo/)
- [GitHub Repository](https://github.com/fabioaap/Adsmagic-prot-tipo)
- `CHANGELOG.md` - Histórico e status
- `README-TESTING.md` - Guia de testes
- `VISUAL_REGRESSION.md` - Regressão visual
- `docs/storybook-backlog.md` - Backlog

---

**Última atualização:** 03/11/2025  
**Versão:** 1.0.0
