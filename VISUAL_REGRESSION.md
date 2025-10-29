# 👁️ Regressão Visual - Guia de Uso

Este guia documenta o sistema de regressão visual implementado para o Design System Adsmagic.

## 🎯 Visão Geral

A regressão visual detecta automaticamente mudanças visuais indesejadas nos componentes e documentação do Storybook, garantindo consistência visual durante o desenvolvimento.

## 🛠️ Ferramentas Utilizadas

- **Playwright**: Framework de testes E2E com suporte nativo a screenshots
- **GitHub Actions**: CI/CD automatizado
- **Storybook**: Plataforma de documentação testada

## 📋 Como Funciona

### 1. Baseline (Linha Base)
- Screenshots iniciais salvos como referência
- Capturados em ambiente controlado (mesmo viewport, navegador)
- Armazenados no repositório (`tests/screenshots/`)

### 2. Comparação Automática
- Novos screenshots comparados com baseline
- Diferenças detectadas por pixel
- Tolerância configurável (10% por padrão)

### 3. Aprovação/Rejeição
- Mudanças visuais destacadas
- Desenvolvedores revisam e aprovam/rejeitam
- Baseline atualizado quando aprovado

## 🚀 Executando Testes Visuais

### Desenvolvimento Local

#### Primeiro Uso (Criar Baseline)
```bash
# 1. Subir Storybook
npm run dev:all

# 2. Criar baseline inicial
npm run test:visual:update
```

#### Testes Regulares
```bash
# Executar testes visuais
npm run test:visual
```

### CI/CD Automático

#### GitHub Actions
- Executado automaticamente em push/PR
- Build do Storybook → Screenshots → Comparação
- Artefatos salvos em caso de falha

#### Quando Executa
- Push para `main`/`master`
- Pull Requests
- Mudanças em: Storybook, componentes, testes visuais

## 📊 Interpretando Resultados

### ✅ Sucesso
- Todos os screenshots dentro da tolerância
- Sem mudanças visuais detectadas

### ⚠️ Falha (Mudanças Detectadas)
- Diferenças visuais encontradas
- Artefatos disponíveis no GitHub Actions:
  - `visual-regression-diffs/`: Screenshots com diferenças destacadas
  - `visual-regression-report/`: Relatório HTML detalhado

### 📈 Tipos de Diferenças

#### Esperadas (Aprovar)
- Novos componentes adicionados
- Melhorias visuais intencionais
- Atualizações de design aprovadas

#### Inesperadas (Corrigir)
- Bugs visuais
- Regressões de layout
- Quebras de responsividade

## 🔧 Gerenciando Mudanças Visuais

### Aprovando Mudanças (Atualizar Baseline)
```bash
# Após confirmar que mudanças são intencionais
npm run test:visual:update

# Commit das novas screenshots
git add tests/screenshots/
git commit -m "test: atualizar baseline visual após mudanças intencionais"
```

### Rejeitando Mudanças (Corrigir Código)
```bash
# Identificar causa da mudança visual
# Corrigir código/componente
# Executar testes novamente
npm run test:visual
```

## ⚙️ Configuração Técnica

### Tolerância Visual
```typescript
// playwright.visual.config.ts
expect: {
  toHaveScreenshot: { threshold: 0.1 }, // 10% de tolerância
}
```

### Viewport Consistente
```typescript
// Sempre 1280x720 para consistência
viewport: { width: 1280, height: 720 }
```

### Navegadores
- **Chromium** (Chrome/Edge) - Principal
- Suporte futuro para Firefox/Safari

## 🎨 Cenários de Teste

### Storybook Hub
- ✅ Homepage
- ✅ Seção de componentes
- ✅ Seção de tokens
- ✅ Referências React/Vue

### Componentes Individuais
- Estados: default, hover, focus, disabled
- Variações: sizes, variants, themes
- Responsividade: breakpoints

## 🚨 Lidando com Falsos Positivos

### Problemas Comuns

#### Flutuabilidade (Flakiness)
**Sintomas**: Testes falham inconsistentemente
**Soluções**:
- Aumentar timeouts
- Aguardar carregamento completo
- Usar `waitForLoadState('networkidle')`

#### Diferenças de Ambiente
**Sintomas**: Diferenças em CI vs local
**Soluções**:
- Mesmo viewport em todos os ambientes
- Mesmas configurações de navegador
- Fonts carregadas consistentemente

#### Animações/Transições
**Sintomas**: Elementos em movimento causam diferenças
**Soluções**:
- Desabilitar animações em testes
- Aguardar animações completarem
- Usar `waitForTimeout()` quando necessário

## 📈 Métricas e Monitoramento

### KPIs de Qualidade Visual
- **Taxa de Sucesso**: % de testes visuais passando
- **Tempo de Execução**: Duração dos testes visuais
- **Falsos Positivos**: % de alertas que eram falsos positivos

### Dashboards
- GitHub Actions: Status dos workflows
- Playwright Report: Detalhes dos testes
- Artefatos: Screenshots de diferenças

## 🔄 Processo de Revisão

### Em Pull Requests
1. **CI executa** testes visuais automaticamente
2. **Se falhar**: Artefatos disponíveis para download
3. **Revisão**: Desenvolvedor/Designer avaliam diferenças
4. **Decisão**:
   - ✅ **Aprovar**: Atualizar baseline
   - ❌ **Rejeitar**: Corrigir código

### Checklist de Revisão Visual
- [ ] Layout permanece consistente
- [ ] Cores e tipografia corretas
- [ ] Espaçamentos mantidos
- [ ] Estados interativos funcionam
- [ ] Responsividade preservada
- [ ] Acessibilidade mantida

## 🆘 Troubleshooting

### Teste Falha mas Visualmente OK
```bash
# Verificar tolerância
# Ajustar threshold se necessário
# Verificar se é diferença de anti-aliasing
```

### Teste Passa mas Há Problema Visual
```bash
# Verificar se screenshot foi capturado corretamente
# Adicionar mais cenários de teste
# Revisar configuração de viewport
```

### Performance Lenta
```bash
# Reduzir número de screenshots
# Otimizar seletores
# Usar `waitForLoadState` apropriadamente
```

## 📚 Referências

- [Playwright Visual Comparisons](https://playwright.dev/docs/test-screenshots)
- [Storybook Visual Testing](https://storybook.js.org/docs/writing-tests/visual-testing)
- [Visual Regression Testing Guide](https://www.browserstack.com/guide/visual-regression-testing)

---

**Regressão visual garante qualidade visual consistente!** 👁️✨