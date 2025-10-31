# Guia de Regressao Visual

## Visao Geral

O objetivo da suite de regressao visual e garantir que os componentes React/Vue mantenham paridade com o prototipo HTML legado. A infraestrutura esta configurada, mas depende de alinhar tokens, corrigir o servidor legado e capturar o baseline completo antes de bloquear merges automaticamente.

## Status Atual - Projeto Adsmagic

### Telas validadas
- Homepage/Dashboard (`index.html`)
- Pagina de Vendas (`vendas.html`)
- Pagina de Contatos (`contatos.html`)

### Telas pendentes de baseline
- eventos.html
- funil.html
- integracoes.html
- links.html
- mensagens.html
- relatorios.html
- suporte.html
- configuracoes.html

### Cobertura de testes (planejada)
- 55 cenarios Playwright configurados (legacy, React, Vue, mobile/tablet, Storybook)
- Baseline legado: 14 cenarios
- Paridade React: 15 cenarios
- Paridade Vue: 15 cenarios
- Mobile/Tablet: 6 cenarios
- Storybook hub: 5 cenarios

### Status de execucao
- Configuracao: suites criadas, aguardando revisao de tokens e ajuste da porta do servidor legado (4100 vs 8000).
- Execucao local: apenas 3 telas possuem screenshots aprovadas; restante aguarda captura apos estabilizar o servidor e componentes.
- Execucao em CI: bloqueada ate alinhar o servidor, completar baseline e revisar cenarios dependentes.

## Arquitetura

### Componentes do Sistema

```
📁 tests/visual/
├── legacy-baseline.spec.ts    # Baseline do legado HTML
├── react-parity.spec.ts       # Comparação React vs legado
├── vue-parity.spec.ts         # Comparação Vue vs legado
└── mobile-parity.spec.ts      # Testes responsivos

📁 snapshots/visual/           # Screenshots de referência
📁 test-results/visual/        # Resultados e diffs
```

### Fluxo de Funcionamento

1. **Baseline**: Captura screenshots do legado HTML como referência
2. **Paridade**: Compara componentes React/Vue contra baseline
3. **Validação**: Detecta diferenças visuais automaticamente
4. **Ação**: Bloqueia merges ou permite updates controlados

## 🚀 Como Usar

### Configuração Inicial

```bash
# 1. Instalar dependências
npm ci

# 2. Instalar navegadores Playwright
npx playwright install --with-deps

# 3. Criar baseline inicial (primeira vez)
npm run test:visual:update

# 4. Verificar se tudo funciona
npm run test:visual
```

### Servidores Necessários

Para executar os testes localmente, você precisa de:

```bash
# Terminal 1: Servidor do legado (padrao 4100)
node test-server.js # ajuste a porta se o CI exigir 8000
# Terminal 2: Storybook React (porta 6008)
npm run dev:react

# Terminal 3: Storybook Vue (porta 7007)
npm run dev:vue

# Terminal 4: Executar testes
npm run test:visual
```

### Scripts Disponíveis

```bash
# Executar todos os testes visuais
npm run test:visual

# Atualizar baseline (use com cuidado!)
npm run test:visual:update

# Executar apenas baseline do legado
npm run test:visual:baseline

# Executar apenas testes de paridade
npm run test:visual:parity
```

## 📊 Thresholds e Tolerância

### Configuração de Tolerância

```typescript
// playwright.visual.config.ts
expect: {
  toHaveScreenshot: {
    threshold: 0.01,        // 1% tolerância padrão
    maxDiffPixelRatio: 0.05, // Máximo 5% diferença
  },
},
```

### Thresholds por Tipo de Teste

| Tipo de Teste | Threshold | Justificativa |
|---------------|-----------|---------------|
| **Baseline legado** | 0.5% | Referência precisa |
| **Componentes simples** | 1-3% | Diferenças sutis OK |
| **Gráficos/Charts** | 5-8% | Variações de renderização |
| **Estados hover/focus** | 3-5% | Transições e anti-aliasing |
| **Mobile/Tablet** | 2-5% | Diferenças de viewport |

## 🔧 Manutenção do Baseline

### Quando Atualizar Baseline

✅ **Atualize quando:**
- Mudanças intencionais no design são aprovadas
- Novos componentes são adicionados
- Ajustes de responsividade são feitos
- Correções de bugs visuais são implementadas

❌ **NÃO atualize quando:**
- Diferenças são acidentais
- Bugs visuais são introduzidos
- Sem aprovação do time de design

### Processo de Update

```bash
# 1. Executar testes para ver diferenças
npm run test:visual

# 2. Revisar diffs no relatório HTML
npx playwright show-report test-results/visual/html-report/

# 3. Se mudanças são intencionais, atualizar baseline
npm run test:visual:update

# 4. Commit das mudanças no baseline
git add snapshots/visual/
git commit -m "feat: update visual baseline for [component]"
```

## 🐛 Troubleshooting

### Problemas Comuns

#### ❌ "No tests found"
```bash
# Verificar se arquivos existem
ls tests/visual/

# Verificar configuração
npx playwright test --list --config=playwright.visual.config.ts
```

#### ❌ "Screenshot comparison failed"
- Verificar se servidores estão rodando
- Comparar viewport sizes
- Verificar se componentes renderizaram completamente
- Ajustar thresholds se diferenças são aceitáveis

#### ❌ "Timeout waiting for element"
```typescript
// Adicionar waits mais específicos
await page.locator('[data-testid="MyComponent"]').waitFor();
await page.waitForTimeout(1000); // Para animações/charts
```

#### ❌ Falsos positivos frequentes
- Aumentar threshold gradualmente
- Usar `mask` para áreas dinâmicas
- Excluir elementos não-determinísticos

### Debugging Avançado

```typescript
// Adicionar screenshots de debug
await page.screenshot({ path: 'debug-screenshot.png' });

// Comparar manualmente
const screenshot = await page.screenshot();
console.log('Screenshot size:', screenshot.length);

// Verificar elementos específicos
const elements = await page.locator('.my-component').count();
console.log('Elements found:', elements);
```

## 📈 CI/CD Integration

### GitHub Actions

O workflow `visual-regression.yml` executa automaticamente:

- ✅ Em pushes para `main`
- ✅ Em PRs que modificam componentes
- ✅ On-demand via `workflow_dispatch`

### Resultados

- **Sucesso**: PR aprovado, comentário positivo
- **Falha**: PR bloqueado, comentário com diffs
- **Artefatos**: Screenshots, relatórios HTML, baseline

### Configuração de Branch Protection

```yaml
# .github/settings.yml
branch_protection:
  required_status_checks:
    contexts:
      - "visual-regression"
```

## 🎯 Melhores Práticas

### Para Desenvolvedores

1. **Sempre execute testes visuais localmente** antes de commit
2. **Revise diffs cuidadosamente** antes de atualizar baseline
3. **Documente mudanças visuais** no PR description
4. **Use data-testid consistentes** para seletores estáveis

### Para Designers

1. **Aprove mudanças visuais** explicitamente antes do update
2. **Forneça specs precisas** para novos componentes
3. **Revise diffs** em PRs que afetam visual

### Para QA

1. **Priorize testes visuais** em sprints de design system
2. **Valide thresholds** regularmente
3. **Monitore falsos positivos** e ajuste configuração

## Checklist de Implementacao

### Setup Inicial
- [x] Arquivos de configuracao criados
- [x] Scripts npm adicionados
- [ ] CI/CD workflow ajustado para fluxo visual
- [ ] Baseline inicial capturado para todas as telas

### Desenvolvimento
- [x] Testes de baseline implementados
- [x] Testes de paridade React/Vue criados
- [x] Testes mobile responsivos adicionados
- [ ] Thresholds revisados apos capturar novo baseline

### Manutencao
- [x] Documentacao criada
- [ ] Processo de update em uso (aguarda baseline completo)
- [x] Troubleshooting documentado
- [ ] Melhores praticas alinhadas com design/dev (depende dos itens acima)

## Recursos Adicionais

- [Playwright Visual Comparisons](https://playwright.dev/docs/test-screenshots)
- [Visual Regression Testing Guide](https://www.browserstack.com/guide/visual-regression-testing)
- [Chromatic (alternativa SaaS)](https://www.chromatic.com/)

---

**Resultado parcial:** a infraestrutura de regressao visual esta configurada, mas depende de alinhar tokens, corrigir o servidor legado e capturar o baseline completo antes de garantir paridade visual entre legado HTML e componentes modernos. Execute os passos do checklist para evoluir o sistema.