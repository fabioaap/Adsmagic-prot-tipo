# Publicação NPM - Adsmagic Design System

## Visão Geral
Este documento descreve o processo de publicação automática dos pacotes do design system Adsmagic no NPM registry.

## Pacotes Publicados
- `@adsmagic/tokens` - Design tokens centralizados
- `@adsmagic/react` - Componentes React
- `@adsmagic/vue` - Componentes Vue

## Fluxo de Publicação

### 1. Desenvolvimento
- Faça mudanças nos pacotes em `packages/`
- Commits devem seguir conventional commits
- Testes devem passar localmente

### 2. Criar Changeset
```bash
npx changeset add
```
Selecione os pacotes afetados e o tipo de versão (patch/minor/major).

### 3. Commit e Push
```bash
git add .
git commit -m "feat: adicionar nova funcionalidade"
git push origin main
```

### 4. Publicação Automática
O GitHub Actions dispara automaticamente:
- Build de todos os pacotes
- Version bump baseado nos changesets
- Publicação no NPM
- Criação de release e CHANGELOG no GitHub

## Ordem de Publicação
Devido às dependências cruzadas:
1. `@adsmagic/tokens` (primeiro)
2. `@adsmagic/react` e `@adsmagic/vue` (dependem de tokens)

## Configuração
- **Changesets**: Gerencia versionamento independente
- **GitHub Actions**: CI/CD automatizado
- **NPM_TOKEN**: Secret configurado no repositório

## Como Consumir
```bash
npm install @adsmagic/tokens @adsmagic/react
# ou
npm install @adsmagic/tokens @adsmagic/vue
```

## Desenvolvimento Local
Para testar mudanças sem publicar:
```bash
npm run build --workspace @adsmagic/tokens
npm run build --workspace @adsmagic/react
```

## Troubleshooting
- **Dependências file:** Para publicação, changesets resolve automaticamente
- **Build falha:** Verificar se todos os pacotes têm scripts de build
- **NPM publish falha:** Verificar NPM_TOKEN e permissões