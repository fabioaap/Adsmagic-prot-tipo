# 03_arch_clean — Arquitetura Limpa, Testes, Observabilidade e Segurança (Adsmagic)

## Arquitetura Limpa (Clean Architecture)

### Camadas
1. **Domínio** — regras de negócio puras (entidades, value objects)
2. **Aplicação** — casos de uso e orquestração (serviços, handlers)
3. **Infraestrutura** — frameworks, adaptadores e I/O (API clients, DB)
4. **Interface** — UI, APIs e gateways (componentes React/Vue)

### Regras
- Dependências sempre apontam para o núcleo (domínio)
- Nenhuma lógica de negócio depende de frameworks
- Cada camada testável isoladamente
- Portas/adaptadores permitem experimentação segura

### Aplicação no Adsmagic
```
apps/dashboard-react/
├── src/
│   ├── domain/              # Entidades e lógica de negócio
│   ├── application/         # Casos de uso e serviços
│   ├── infrastructure/      # API clients, storage
│   └── components/          # UI (interface)
```

## Testes

### Pirâmide de Testes
```
       /\
      /e2e\        ← Poucos, críticos (Playwright)
     /------\
    /integration\ ← Moderados (API + UI)
   /------------\
  /    unit      \ ← Muitos, rápidos (Vitest)
 /----------------\
```

### Cobertura Adsmagic
- **Unit:** Vitest para componentes e lógica (≥80%)
- **Integration:** Testes de API e fluxos
- **E2E:** Playwright para jornadas críticas
- **Visual:** 55 testes de regressão visual

### Comandos de teste
```bash
npm test                    # Unit tests
npm run test:ui             # Playwright UI
npm run test:visual         # Regressão visual
npm run test:visual:update  # Atualizar baseline
npm run test:debug          # Debug mode
```

## Observabilidade

### Pilares
1. **Logs estruturados** — JSON com contexto e trace IDs
2. **Métricas** — Web Vitals (LCP, FID, CLS)
3. **Tracing** — Rastreamento de requisições
4. **Alertas** — Notificações automáticas de anomalias

### Implementação no Dashboard
```typescript
// apps/dashboard-react/src/services/monitoring.ts
import * as Sentry from '@sentry/react';

// Captura de erros
Sentry.captureException(error, {
  tags: { component: 'Dashboard' },
  user: { id: userId }
});

// Web Vitals
import { onCLS, onFID, onLCP } from 'web-vitals';

onCLS(metric => sendMetric('CLS', metric.value));
onFID(metric => sendMetric('FID', metric.value));
onLCP(metric => sendMetric('LCP', metric.value));
```

### Métricas-chave
- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1

### SLIs (Service Level Indicators)
- Latência média < 200ms
- Taxa de erro < 0.1%
- Disponibilidade > 99.9%

## Segurança

### OWASP Top 10
1. **Broken Access Control** — Validar authz em todas as rotas
2. **Cryptographic Failures** — HTTPS, segredos em cofres
3. **Injection** — Sanitizar inputs, usar ORMs
4. **Insecure Design** — Security by design desde o início
5. **Security Misconfiguration** — Configurações seguras por padrão
6. **Vulnerable Components** — Manter dependências atualizadas
7. **Auth Failures** — MFA, rate limiting, session management
8. **Data Integrity** — Validar integridade de dados
9. **Logging Failures** — Logs suficientes para auditoria
10. **SSRF** — Validar URLs externas

### LGPD e Privacidade
- **Minimização de dados** — Coletar apenas o necessário
- **Mascaramento de PII** — Nunca logar dados pessoais sem hash
- **Consentimento explícito** — Opt-in para analytics
- **Direito ao esquecimento** — Implementar deleção de dados

### Gestão de Segredos
```bash
# NUNCA commitar segredos
# Use variáveis de ambiente
VITE_API_KEY=xxxxx
VITE_SENTRY_DSN=xxxxx

# .env.example para documentar
VITE_API_KEY=your_api_key_here
```

### Feature Flags com Segurança
```typescript
{
  key: 'feature-name',
  ttl: '2025-12-31',          // Expira automaticamente
  owner: 'team-name',          // Responsável
  killSwitch: true,            // Pode ser desativado rapidamente
  allowedUsers: ['user-id'],   // Lista branca
  rollout: 10                  // 10% dos usuários
}
```

## Performance

### Otimizações Aplicadas
- **Code splitting** — Lazy loading de rotas
- **Tree shaking** — Remoção de código não usado
- **Bundle analysis** — Monitoramento de tamanhos
- **Caching** — Cache de assets estáticos
- **CDN** — Distribuição global de assets

### Métricas de Build
```bash
# React Components
✓ 891 modules transformed
dist/assets/index.css   20.13 kB │ gzip: 4.79 kB
dist/assets/index.js   499.12 kB │ gzip: 152.60 kB
```

### Checklist de Performance
- [ ] Bundle size < 500kB (gzipped)
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] Lighthouse score > 90
- [ ] Lazy loading implementado
- [ ] Images otimizadas (WebP, lazy)

## CI/CD

### Pipeline GitHub Actions
```yaml
# .github/workflows/ci.yml
name: CI/CD
on: [push, pull_request]

jobs:
  lint:
    - ESLint
    - Prettier
    - TypeScript check
  
  test:
    - Unit tests (Vitest)
    - E2E tests (Playwright)
    - Visual tests (quando servidor OK)
  
  build:
    - Build packages
    - Build apps
    - Build Storybook
  
  deploy:
    - Deploy Storybook Hub → GitHub Pages
    - Deploy apps (Vercel/Netlify)
```

### Quality Gates
- ✅ Lint sem erros
- ✅ Testes passando (≥80% cobertura)
- ✅ Build bem-sucedido
- ✅ Bundle size dentro do limite
- ✅ Lighthouse score > 90
- ✅ Security scan (Snyk/Dependabot)

## Rollback e Recuperação

### Estratégias
1. **Feature Flags** — Kill-switch instantâneo
2. **Blue-Green Deployment** — Duas versões em produção
3. **Canary Release** — Rollout gradual (1% → 10% → 50% → 100%)
4. **Database Migrations** — Sempre reversíveis

### Plano de Rollback
```bash
# 1. Identificar problema
# 2. Desativar feature flag (se aplicável)
# 3. Reverter deploy
git revert <commit-hash>
git push origin main

# 4. Monitorar métricas
# 5. Comunicar stakeholders
# 6. Post-mortem e ADR
```

## Documentação de Decisões (ADRs)

### Template em `docs/adr/ADR-XXXX-titulo.md`
```markdown
# ADR-XXXX — Título da Decisão

## Contexto
Problema ou decisão a ser tomada.

## Opções consideradas
- Opção A: prós e contras
- Opção B: prós e contras

## Decisão
Opção escolhida e razões.

## Consequências
Impacto técnico, riscos, mitigação, rollback.

## Referências
- Link 1
- Link 2
```

### Quando criar ADR
- Decisões arquiteturais significativas
- Escolha de tecnologias/frameworks
- Mudanças em padrões de código
- Experimentos de descoberta (Discovery)
- Trade-offs importantes
