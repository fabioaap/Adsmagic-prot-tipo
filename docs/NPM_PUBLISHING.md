# Publicacao NPM - Adsmagic Design System

## Visao Geral
Este guia documenta como preparar a publicacao dos pacotes do design system. O pipeline automatizado esta configurado, mas o release inicial permanece bloqueado ate que as pendencias de estabilizacao (tokens, baseline visual, smoke tests do dashboard) sejam concluidas.

## Pacotes planejados para release
- `@adsmagic/tokens` - design tokens centralizados (depende da revisao SB-21)
- `@adsmagic/react` - componentes React (aguarda alinhamento de tokens e baseline visual)
- `@adsmagic/vue` - componentes Vue (aguarda paridade com os tokens revisados)

> Nenhum pacote foi publicado ainda. Use este documento como checklist quando os criterios de qualidade estiverem atendidos.

## Pre-requisitos antes da primeira publicacao
- Concluir SB-21 a SB-27: tokens consistentes, baseline visual completo, smoke tests do dashboard no CI.
- Validar manualmente os bundles gerados em `packages/*/dist`.
- Garantir que `CHANGELOG.md` e `docs/` reflitam o estado real do release.
- Confirmar `NPM_TOKEN` e permissao de publish para a organizacao.
- Definir versoes iniciais (ex.: `0.1.x`) em `packages/*/package.json`.

## Fluxo recomendado (manual + automatizado)

### 1. Desenvolvimento
- Trabalhe nos pacotes em `packages/`.
- Utilize conventional commits para facilitar changelog.
- Execute `npm run lint --workspaces --if-present` e `npm run test --workspaces --if-present`.

### 2. Criar changeset
```bash
npx changeset add
```
Selecione os pacotes afetados e o tipo de versao (patch/minor/major). Revise o arquivo gerado em `.changeset/`.

### 3. Validar build local
```bash
npm run build --workspace @adsmagic/tokens
npm run build --workspace @adsmagic/react
npm run build --workspace @adsmagic/vue
```
Inspecione os artefatos em `packages/*/dist` e rode smoke tests (ex.: Storybook, Playwright smoke, dashboard).

### 4. Commit e push
```bash
git add .
git commit -m "chore: prepare release"
git push origin <branch>
```
Abra um PR. O workflow atual roda lint/build; mantenha a etapa de publish desativada ate a aprovacao final.

### 5. Publicacao manual (quando aprovado)
1. Merge na branch principal.
2. Executar:
   ```bash
   npx changeset version
   npm install
   npm run build --workspaces --if-present
   npx changeset publish
   ```
3. Verificar release gerado no GitHub e pacotes publicados no NPM.

> Quando o fluxo estiver maduro, habilite o workflow de publish automatico apenas apos validar releases em producao.

## Ordem de publicacao
1. `@adsmagic/tokens`
2. `@adsmagic/react` e `@adsmagic/vue`

## Troubleshooting
- **Build falhou:** rode `npm run build --workspaces --if-present` e corrija erros reportados.
- **Baseline visual desatualizado:** atualize depois de alinhar porta do servidor legado e tokens (`npx playwright test --config=playwright.visual.config.ts --update-snapshots`).
- **Publish negado:** confirme `NPM_TOKEN`, permissao da conta e se as versoes foram incrementadas.

## Consumindo os pacotes (apos o release)
```bash
npm install @adsmagic/tokens @adsmagic/react
# ou
npm install @adsmagic/tokens @adsmagic/vue
```

Enquanto o release inicial nao ocorre, use `npm run build --workspace <pacote>` aliado a `npm link` (ou `pnpm/yarn link`) para testar em projetos locais.
