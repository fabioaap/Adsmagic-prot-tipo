# Adsmagic Platform - AI Coding Agent Guide

## Arquitetura Geral

Este é um **workspace npm monorepo** que evoluiu de um protótipo HTML estático para um **design system multi-framework** (React + Vue 3) com documentação centralizada em Storybook Hub.

**Estrutura crítica:**
```
packages/
  tokens/          → Design tokens (CSS + TS) - fonte única de verdade
  react-components → Componentes React + Vitest
  vue-components   → Componentes Vue 3 com paridade API + Vitest

apps/
  storybook-hub    → Documentação central (porta 6006) com refs para React/Vue
  storybook-react  → Catálogo React isolado (porta 6008)
  storybook-vue    → Catálogo Vue isolado (porta 7007)
  prototype-static → HTML legado preservado para referência UX
```

**Dependências entre pacotes:** Usa `file:` protocol (ex: `"@adsmagic/tokens": "file:../tokens"`). Não há npm registry privado - apenas symlinks do npm workspaces.

## Workflows Essenciais

### Desenvolvimento local (ordem obrigatória)
```powershell
# Opção 1: Script PowerShell (recomendado)
.\start-all-storybooks.ps1

# Opção 2: Manual (se o script falhar)
npm run dev:react  # DEVE estar rodando antes do hub
npm run dev:vue    # DEVE estar rodando antes do hub  
npm run dev        # Hub com refs apontando para 6008 e 7007
```

**CRÍTICO:** O Storybook Hub depende de `refs` em `apps/storybook-hub/.storybook/main.ts` que apontam para `http://localhost:6008` (React) e `http://localhost:7007` (Vue). Se esses não estiverem acessíveis, o hub não carregará os catálogos.

### Comandos principais (raiz do workspace)
- `npm install` — Prepara workspaces e symlinks (sempre após checkout/merge)
- `npm run build` — Build estático do hub (requer React/Vue em dev ou built)
- `npm run lint` — Executa lint em todos os workspaces que tenham script `lint`
- `npm test` — Executa Playwright E2E + testes unitários dos componentes
- `npm run test:ui` — Interface visual do Playwright para debug

### Testes E2E
**Config:** `playwright.config.js` (protótipo legado) e `playwright.storybook.config.ts` (smoke do hub).

**Servidor de teste:** `test-server.js` serve o protótipo HTML na porta 8000.

**Testes atuais:**
- `tests/basic.spec.js` — Valida dashboard legado (cards, layout responsivo)
- `tests/card-layout.spec.js` — Garante 14 cards e grid de 2 colunas para últimos cards
- `tests/storybook-hub.smoke.spec.ts` — Smoke test do hub (porta 6006)

## Padrões de Código

### Design Tokens (packages/tokens)
- **Fonte única:** `src/index.ts` exporta `colors`, `typography`, `spacing`, `radii`, `shadows`, `aliases`
- **CSS:** `css/base.css` contém estilos globais e classes utilitárias do protótipo legado
- **Consumo:** Componentes importam `{ tokens } from "@adsmagic/tokens"` e aplicam via inline styles ou CSS-in-JS

**Exemplo:**
```typescript
import { tokens } from "@adsmagic/tokens";

const styles = {
  backgroundColor: tokens.colors.primary600,
  fontSize: tokens.typography.sizeSM,
  padding: tokens.spacing.md,
};
```

### Componentes React (packages/react-components)
- **Estrutura:** `src/components/{ComponentName}/{ComponentName}.tsx` + `.test.tsx` + `.stories.tsx`
- **Testes:** Vitest + Testing Library (`@testing-library/react`, `@testing-library/jest-dom`)
- **Props:** TypeScript interfaces com defaults explícitos
- **Tokens:** Aplicados via `CSSProperties` inline com objetos separados por variant/size

**Exemplo Button:**
```tsx
import { tokens } from "@adsmagic/tokens";
import { forwardRef } from "react";

const variantTokens: Record<ButtonVariant, CSSProperties> = {
  primary: {
    backgroundColor: tokens.colors.primary600,
    color: tokens.colors.white,
    boxShadow: tokens.shadows.pill,
  },
  // ...
};
```

### Componentes Vue (packages/vue-components)
- **Estrutura:** `src/components/{ComponentName}/{ComponentName}.vue` + `.test.ts` + `.stories.ts`
- **Composition API:** `<script setup lang="ts">` com `defineProps` e tipos explícitos
- **Slots nomeados:** `leading` e `trailing` para ícones (equivalente a React `leadingIcon`/`trailingIcon`)
- **Testes:** Vitest + Vue Testing Library (`@testing-library/vue`, `@vue/test-utils`)

**Paridade API:** Componentes Vue devem espelhar props e comportamentos do React (ex: `variant`, `size`, `disabled`).

### Storybook Hub (apps/storybook-hub)
- **Documentação:** MDX em `docs/` (ex: `introducao.mdx`, `tokens.mdx`, `operacoes-*.mdx`)
- **Refs externos:** Configurados em `.storybook/main.ts` com URLs dos Storybooks React/Vue
- **Addons:** `@storybook/addon-a11y` (auditoria de acessibilidade) e `@storybook/addon-docs`
- **Alias Vite:** `@adsmagic/tokens` e `@adsmagic/tokens/css` resolvidos via `viteFinal`

## Convenções Específicas

### Nomenclatura
- **Pacotes:** `@adsmagic/{tokens,react,vue}` (scoped packages)
- **Componentes:** PascalCase, mesmo nome para arquivo e export (`Button.tsx` → `export function Button`)
- **Testes:** `{Component}.test.{tsx,ts}`
- **Stories:** `{Component}.stories.{tsx,ts}`

### Estrutura de commits (inferida do workspace)
- Commits em português (baseado em arquivos `.mdx` e README)
- Sem enforce de Conventional Commits (não há `.commitlintrc` ou Husky)

### Acessibilidade
- Todos os componentes DEVEM passar `@storybook/addon-a11y` sem violações
- Contraste mínimo WCAG AA
- Roles ARIA corretos (ex: `role="button"` para botões custom)

## Integração com Figma MCP

Documentação em `docs/figma-mcp.md` sugere integração com Figma via Model Context Protocol. Ao gerar código de design:
1. Usar tokens `@adsmagic/tokens` em vez de hardcoded colors/spacing
2. Preferir componentes existentes (`@adsmagic/react` ou `@adsmagic/vue`)
3. Criar story no Storybook apropriado

## Pontos de Atenção

### Build e publicação
- **Build:** `npm run build` gera `apps/storybook-hub/storybook-static`
- **Não há CI/CD ativo:** Builds manuais (recomenda-se configurar GitHub Actions)
- **Playwright em CI:** Configurado em `.github/workflows/storybook-hub-ci.yml` mas pode estar desativado

### PowerShell scripts (Windows)
- `start-all-storybooks.ps1` — Inicia 3 Storybooks em janelas separadas
- `stop-all-storybooks.ps1` — Mata processos nas portas 6006/6008/7007

### Resolução de problemas

#### Erro "Loading of ref failed" no Storybook Hub
**Sintoma:** Hub carrega docs MDX mas exibe erro 404 ao tentar carregar refs React/Vue.

**Causa raiz:** Storybook 9.1.x não gera `metadata.json` em modo dev, apenas em build estático. O Hub tenta buscar esse arquivo e falha.

**Solução aplicada:** Configuração de `refs` como função em `apps/storybook-hub/.storybook/main.ts` para permitir fallback dinâmico para `index.json`:
```typescript
refs: () => ({
  react: {
    title: "React Components",
    url: "http://localhost:6008",
    expanded: false
  },
  vue: {
    title: "Vue Components", 
    url: "http://localhost:7007",
    expanded: false
  }
})
```

**Verificação:**
1. Confirmar que React (6008) e Vue (7007) estão respondendo HTTP 200
2. Validar que `index.json` está acessível em ambas URLs
3. Reiniciar o Hub após mudanças no `main.ts`

**Alternativa (produção):** Servir builds estáticos das refs em vez de dev servers.

#### Outros problemas comuns
- **Hub não carrega catálogos:** Verificar se React (6008) e Vue (7007) estão rodando
- **Dependências faltando:** Executar `npm install` na raiz (não em subpastas)
- **Testes E2E falhando:** Confirmar que `test-server.js` está rodando na porta 8000
- **Build quebrado:** Garantir que `@adsmagic/tokens` está built antes de buildar componentes
- **Processos em conflito:** Usar `netstat -ano | findstr "6006 6008 7007"` e matar PIDs com `Stop-Process`

## Próximos Passos (Roadmap interno)
1. Migrar gradualmente telas do protótipo HTML para componentes React/Vue
2. Configurar registry privado ou usar `npm link` para dependências
3. Adicionar smoke tests para Storybooks React/Vue (atualmente apenas hub)
4. Integrar regressão visual (Chromatic/Percy)
5. Expandir documentação MDX com guidelines de UX e acessibilidade

## Quando em dúvida
- Consulte `apps/storybook-hub/docs/` para padrões operacionais
- Veja `packages/{react,vue}-components/src/components/Button/` como referência de estrutura
- Execute `npm run test:ui` para debug visual de testes E2E
- Revisite `README.md` e `README-TESTING.md` para contexto histórico

---

**Nota:** Este workspace segue as diretrizes do "Programador FullStack.instructions.md" localizado em `.github/instructions/`. Priorize arquitetura limpa, descoberta técnica controlada e documentação viva no Storybook Hub.
