# Adsmagic Platform Workspace

Este reposit�rio evoluiu de um prot�tipo est�tico para um workspace completo que concentra:

- **Design tokens** compartilhados (`packages/tokens`), expostos em CSS e TypeScript.
- **Bibliotecas de componentes** em **React** (`packages/react-components`) e **Vue 3** (`packages/vue-components`).
- **Storybooks dedicados** para cada stack (`apps/storybook-react`, `apps/storybook-vue`) e um **Storybook hub** (`apps/storybook-hub`) que centraliza a documenta��o.
- **Prot�tipo HTML legado** preservado em `apps/prototype-static` para consultas r�pidas de UX/UI.

## Organiza��o das pastas

| Caminho | Descri��o |
| --- | --- |
| `packages/tokens` | Fonte �nica dos tokens (`css/base.css`, `src/index.ts`). |
| `packages/react-components` | Componentes React (ex.: `Button`) com testes Vitest e lint dedicado. |
| `packages/vue-components` | Equivalentes Vue 3 com slots nomeados e suporte a testes. |
| `apps/storybook-react` | Cat�logo dos componentes React usando `@storybook/react-vite`. |
| `apps/storybook-vue` | Cat�logo dos componentes Vue com `@storybook/vue3-vite`. |
| `apps/storybook-hub` | Hub que referencia os dois cat�logos e inclui documenta��o em MDX. |
| `apps/prototype-static` | C�pia dos HTML/CSS originais para consulta. |

## Scripts principais

```bash
npm install           # prepara todas as depend�ncias do workspace
npm run dev           # sobe o Storybook hub (porta 6006)
npm run dev:react     # sobe o Storybook de componentes React (porta 6007)
npm run dev:vue       # sobe o Storybook de componentes Vue (porta 7007)
npm run dev:legacy    # serve o prot�tipo legado via http-server (porta 4100)
npm run build         # gera os Storybooks est�ticos (hub + refs locais)
npm run lint          # roda os linters de todos os workspaces (se configurados)
npm run test          # executa os testes unit�rios (React/Vue)
```

> Durante o desenvolvimento, mantenha `npm run dev:react` e `npm run dev:vue` rodando em paralelo para que o hub (`npm run dev`) enxergue os cat�logos via `refs`.

## Pr�ximos passos sugeridos

1. Migrar gradualmente os componentes do prot�tipo HTML para React/Vue, criando stories e testes conforme necess�rio.
2. Publicar os pacotes `@adsmagic/tokens`, `@adsmagic/react` e `@adsmagic/vue` em um registry privado (ou usar `npm link`/`verdaccio` em ambiente interno).
3. Automatizar a publica��o dos Storybooks com CI/CD (ex.: GitHub Actions + Vercel/Netlify) e integrar uma ferramenta de regress�o visual.
4. Expandir a documenta��o em `apps/storybook-hub/docs` com guidelines de UX, checklist de acessibilidade e conven��es de API.

## Legado HTML

Os arquivos est�ticos permanecem dispon�veis em `apps/prototype-static`. Ao executar `npm run dev:legacy`, o servidor local permite navegar pelos fluxos originais para compara��o visual.

