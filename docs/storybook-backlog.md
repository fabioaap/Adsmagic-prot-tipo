# Backlog Storybook Hub

Registro das atividades ligadas à estabilização do Storybook Hub, testes e documentação do design system Adsmagic.

---

## Backlog (ideias / longo prazo)

| ID | Tarefa | Descrição | Observações |
| --- | --- | --- | --- |
| SB-09 | Estratégia de versão dos pacotes | Formalizar SemVer, changelog e release notes para `@adsmagic/*`. | Depende da estabilização das bibliotecas. |
| SB-10 | Integração de regressão visual | Selecionar ferramenta (Chromatic/Percy) e configurar. | Avaliar após smoke tests estabilizados. |

## A Fazer (próximas prioridades)

| ID | Tarefa | Descrição | Observações |
| --- | --- | --- | --- |
| SB-08 | Checklist de CI/CD | Definir pipeline lint/test/build + publicação do hub. | Elaborar plano e criar workflow GitHub Actions. |

## Fazendo

| ID | Tarefa | Descrição | Observações |
| --- | --- | --- | --- |
| SB-05 | Documentação do hub em TSX | Migrar docs para stories `docs/*.stories.tsx` com `docs.page`. | Estrutura criada; falta validar renderização completa. |
| SB-07 | Revisão/garantia da documentação | Ajustar conteúdos (tokens, bibliotecas, operações, governança). | Conteúdos migrados; revisar consistência e links. |

## Bloqueios

| ID | Tarefa | Descrição | Impedimento |
| --- | --- | --- | --- |
| SB-06 | Smoke test Playwright do hub | Garantir carregamento da doc principal + navegação básica. | Depende do SB-05 renderizar conteúdo no Storybook. |

## Feito

| ID | Tarefa | Descrição | Observações |
| --- | --- | --- | --- |
| SB-01 | Migrar lint para configuração flat | Substituir `.eslintrc` por `eslint.config.mjs` com React, Hooks e MDX. | `npm run lint --workspace @adsmagic/storybook-hub` estável. |
| SB-02 | Normalizar README-TESTING.md | Corrigir caracteres corrompidos e reorganizar guia Playwright. | Arquivo reescrito em pt-BR e comandos validados. |
| SB-03 | Ampliar testes unitários React/Vue | Cobrir componentes principais com Vitest + Testing Library. | Suites `@adsmagic/react` e `@adsmagic/vue` passam. |
| SB-04 | Build estático do hub | Garantir `npm run build --workspace @adsmagic/storybook-hub` sem erros. | Build gera saída em `apps/storybook-hub/storybook-static`. |

---

## Próximos passos imediatos

1. Fechar SB-05 validando renderização das páginas de docs no Storybook.
2. Desbloquear SB-06 ajustando o smoke Playwright e garantindo o servidor disponível.
3. Priorizar SB-08 para formalizar o pipeline de qualidade contínua.
