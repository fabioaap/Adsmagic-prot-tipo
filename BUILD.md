# 🚀 Build & Servidor de Produção - Adsmagic Platform

Este documento descreve como fazer build completo da plataforma e rodá-lo em produção.

## 📦 Build Completo

### Opção 1: Build Tudo de Uma Vez

```bash
npm run build:all
```

Isso executa:
1. Build de todos os packages (tokens, react-components, vue-components)
2. Build de todas as apps (dashboard-react, storybook-react, storybook-vue, storybook-hub)

### Opção 2: Build Apenas os Packages

```bash
npm run build:packages
```

Essa opção constrói apenas as bibliotecas de design system:
- `@adsmagic/tokens` → `packages/tokens/dist/`
- `@adsmagic/react` → `packages/react-components/dist/`
- `@adsmagic/vue` → `packages/vue-components/dist/`

### Opção 3: Build Apenas as Apps

```bash
npm run build:apps
```

Essa opção constrói apenas as aplicações finais:
- Dashboard React → `apps/dashboard-react/dist/`
- Storybook React → `apps/storybook-react/storybook-static/`
- Storybook Vue → `apps/storybook-vue/storybook-static/`
- Storybook Hub → `apps/storybook-hub/storybook-static/`

### Opção 4: Build de Uma App Específica

```bash
# Dashboard
npm run build --workspace @adsmagic/dashboard-react

# Storybook React
npm run build --workspace @adsmagic/storybook-react

# Storybook Vue
npm run build --workspace @adsmagic/storybook-vue

# Storybook Hub
npm run build --workspace @adsmagic/storybook-hub
```

## 🖥️ Servir em Produção

Após fazer o build, você pode servir todas as aplicações integradas em um único servidor:

```bash
npm run serve:prod
```

### Rotas Disponíveis

| Rota | Descrição | Porta |
|------|-----------|-------|
| `http://localhost:3000/` | Dashboard React (principal) | 3000 |
| `http://localhost:3000/docs` | Storybook Hub (documentação completa) | 3000 |
| `http://localhost:3000/storybook/react` | Componentes React | 3000 |
| `http://localhost:3000/storybook/vue` | Componentes Vue | 3000 |
| `http://localhost:3000/legacy` | Protótipo HTML legado | 3000 |

## 📋 Checklist de Builds

Após executar `npm run build:all`, verifique:

```
✓ packages/tokens/dist/
  ├─ index.js (ESM)
  ├─ index.cjs (CommonJS)
  └─ index.d.ts (TypeScript)

✓ packages/react-components/dist/
  ├─ index.js (ESM)
  ├─ index.cjs (CommonJS)
  └─ index.d.ts (TypeScript)

✓ packages/vue-components/dist/
  ├─ index.es.js (ESM)
  ├─ index.cjs.js (CommonJS)
  ├─ style.css
  └─ index.d.ts (TypeScript)

✓ apps/dashboard-react/dist/
  ├─ index.html (entry point)
  ├─ assets/
  │  ├─ *.js (chunks)
  │  └─ *.css (styles)
  └─ bundle-analysis.html (análise)

✓ apps/storybook-react/storybook-static/
  ├─ index.html
  ├─ iframe.html
  └─ assets/

✓ apps/storybook-vue/storybook-static/
  ├─ index.html
  ├─ iframe.html
  └─ assets/

✓ apps/storybook-hub/storybook-static/
  ├─ index.html
  ├─ iframe.html
  └─ assets/
```

## 🔄 Fluxo Típico de Desenvolvimento → Produção

### 1. Desenvolvimento Local

```bash
# Terminal 1: Storybook React
npm run dev:react

# Terminal 2: Storybook Vue
npm run dev:vue

# Terminal 3: Dashboard
npm run dev:dashboard

# Terminal 4: Hub
npm run dev
```

### 2. Testes & Linting

```bash
# Lint todos os packages
npm run lint

# Rodar testes
npm test

# Testes de UI visual
npm run test:ui
```

### 3. Build para Produção

```bash
# Build completo
npm run build:all

# Validar que tudo buildou corretamente
ls -R apps/*/dist apps/*/storybook-static
```

### 4. Servir Localmente (Simular Produção)

```bash
npm run serve:prod
```

Acesse: http://localhost:3000/

### 5. Deploy

```bash
# Fazer commit
git add .
git commit -m "feat: build completo da plataforma v1.0.0"

# Fazer push
git push origin v1

# Criar tag
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0
```

## 📊 Build Sizes

Tamanhos típicos após build otimizado:

| App | Tamanho (gzipped) | Chunks |
|-----|------------------|--------|
| Dashboard React | ~170 KB | 9 chunks |
| Storybook React | ~1.2 MB | 30+ chunks |
| Storybook Vue | ~1.1 MB | 25+ chunks |
| Storybook Hub | ~1.2 MB | 25+ chunks |
| **Total** | **~4.7 MB** | **80+ chunks** |

## 🐛 Troubleshooting

### Erro: "Porta já está em uso"

```bash
# No Windows (PowerShell)
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process -Force

# No macOS/Linux
lsof -ti:3000 | xargs kill -9
```

### Erro: "dist/ não encontrado"

Certifique-se de que fez o build:
```bash
npm run build:all
```

### Erro: "EADDRINUSE: address already in use"

Mude a porta no `scripts/serve-production.js`:
```javascript
const PORT = 3001; // ou outra porta
```

## 🔗 Referências

- [Dashboard React](/apps/dashboard-react/README.md)
- [React Components](/packages/react-components/README.md)
- [Vue Components](/packages/vue-components/README.md)
- [Design Tokens](/packages/tokens/README.md)

---

**Última atualização:** 4 de novembro de 2025
