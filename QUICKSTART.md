# 🚀 QUICK START - Adsmagic Platform

## ⚡ 5 Segundos

```bash
npm run build:all && npm run serve:prod
```

Pronto! Acesse: **http://localhost:3000/**

---

## 📱 Todas as Rotas Disponíveis

| URL | Descrição |
|-----|-----------|
| http://localhost:3000/ | Dashboard React (Principal) |
| http://localhost:3000/docs | Documentação Completa (Storybook Hub) |
| http://localhost:3000/storybook/react | Componentes React |
| http://localhost:3000/storybook/vue | Componentes Vue |
| http://localhost:3000/legacy | Protótipo HTML Legado |

---

## 🔧 Comandos Disponíveis

### Build
```bash
npm run build:all          # Build TUDO (packages + apps)
npm run build:packages     # Só packages (tokens, react, vue)
npm run build:apps         # Só apps (dashboard, storybooks)
```

### Desenvolvimento
```bash
npm run dev                # Storybook Hub
npm run dev:react          # Storybook React
npm run dev:vue            # Storybook Vue
npm run dev:dashboard      # Dashboard React
npm run dev:all            # Todos em paralelo
```

### Produção
```bash
npm run serve:prod         # Servidor integrado na porta 3000
```

### Qualidade
```bash
npm run lint               # ESLint (0 erros)
npm test                   # 64 testes unitários
npm run test:ui            # Testes com UI interativa
```

---

## 📊 Status Atual

✅ **Linting:** 0 Erros  
✅ **Testes:** 64/64 Passando  
✅ **Build:** Todos os Apps Buildados  
✅ **Servidor:** Operacional na Porta 3000  
✅ **Documentação:** BUILD.md + DEPLOYMENT-REPORT.md  

---

## 🎯 Fluxo Típico

1. **Desenvolver Componentes**
   ```bash
   npm run dev:react
   npm run dev:vue
   # Editar componentes em packages/*/src/components/
   ```

2. **Testar Localmente**
   ```bash
   npm test
   npm run lint
   ```

3. **Build para Produção**
   ```bash
   npm run build:all
   ```

4. **Validar em Produção**
   ```bash
   npm run serve:prod
   # Acesse http://localhost:3000/
   ```

5. **Deploy**
   ```bash
   git add .
   git commit -m "feat: release v1.0.0"
   git push origin v1
   ```

---

## 📚 Documentação

- **BUILD.md** - Instruções completas de build e deployment
- **DEPLOYMENT-REPORT.md** - Relatório técnico e checklist
- **README.md** - Visão geral do projeto
- **apps/dashboard-react/README.md** - Dashboard específico
- **packages/react-components/README.md** - React components
- **packages/vue-components/README.md** - Vue components

---

## 🐛 Troubleshooting Rápido

### Porta 3000 em uso?
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3000
kill -9 <PID>
```

### Build falhou?
```bash
npm install              # Reinstale dependências
npm run build:all        # Tente novamente
```

### Testes falhando?
```bash
npm run lint             # Verifique erros de linting
npm test                 # Rode testes
npm run test:ui          # Debug com UI
```

### Dashboard não carrega?
```bash
npm run build --workspace @adsmagic/dashboard-react
npm run serve:prod
# Acesse http://localhost:3000/
```

---

## 🎓 Estrutura de Pastas

```
apps/
├─ dashboard-react/       ← App Principal (SPA)
├─ storybook-hub/        ← Documentação Central
├─ storybook-react/      ← Componentes React
├─ storybook-vue/        ← Componentes Vue
└─ prototype-static/     ← HTML Legado

packages/
├─ tokens/              ← Design Tokens (Cores, Spacing, etc)
├─ react-components/    ← 18 Componentes React
└─ vue-components/      ← 18 Componentes Vue

scripts/
└─ serve-production.js   ← Servidor Integrado

docs/
├─ BUILD.md             ← Instruções Completas
├─ DEPLOYMENT-REPORT.md ← Relatório Técnico
└─ figma-mcp.md         ← Integração Figma
```

---

## ✨ Stack Usado

**Frontend:**
- React 18 + TypeScript
- Vue 3 + TypeScript
- Tailwind CSS
- Vite (build)
- Storybook v9

**Desenvolvimento:**
- ESLint v9 (flat config)
- Vitest (testes unitários)
- Playwright (testes visuais)
- Prettier (formatação)

**Performance:**
- Gzip + Brotli compression
- Code splitting automático
- Tree shaking
- Bundle analysis

---

## 🚢 Pronto para Deploy!

A plataforma está 100% pronta. Todos os testes passam, linting está limpo, e o servidor integrado está funcionando.

**Próximo passo:** Fazer commit e deploy!

```bash
npm run build:all
git add .
git commit -m "feat: deploy plataforma completa v1.0.0"
git push origin v1
```

---

**Última atualização:** 4 de novembro de 2025
