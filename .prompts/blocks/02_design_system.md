# 02_design_system — Design System Adsmagic em Código, Tokens e Handoff

## Fonte da verdade
O Design System (DS) Adsmagic vive no código, em `packages/react-components` e `packages/vue-components`, e é documentado pelo **Storybook Hub**. Ali estão os componentes, estados e variações. O Storybook serve tanto para documentação quanto para testes visuais.

## Arquitetura do Design System

```
packages/
├── tokens/                    # Design tokens (fonte única)
│   ├── src/index.ts          # Tokens TypeScript
│   └── css/base.css          # Tokens CSS
├── react-components/          # Componentes React
│   ├── src/components/       # 18 componentes implementados
│   └── src/index.ts          # Exports centralizados
└── vue-components/            # Componentes Vue 3
    ├── src/components/       # 18 componentes (paridade React)
    └── src/index.ts          # Exports centralizados

apps/
├── storybook-hub/            # Hub centralizado (porta 6006)
│   └── docs/                 # Documentação MDX
├── storybook-react/          # Catálogo React (porta 6008)
└── storybook-vue/            # Catálogo Vue (porta 7007)
```

## Componentes Implementados (18 cada framework)

**React Components:**
- AvatarHighlight, Badge, Button, Card
- ChannelsChart, ContactsSalesChart, DataTable, Drawer
- FunnelChart, Header, InteractionsList, RevenueChart
- SalesList, Sidebar, StatusDropdown, SummaryCard
- SummaryCardGrid, WhatsAppIndicator

**Vue Components (prefixo `Ds`):**
- DsAvatarHighlight, DsBadge, DsButton, DsCard
- DsChannelsChart, DsContactsSalesChart, DsDataTable, DsDrawer
- DsFunnelChart, DsHeader, DsInteractionsList, DsRevenueChart
- DsSalesList, DsSidebar, DsStatusDropdown, DsSummaryCard
- DsSummaryCardGrid, DsWhatsAppIndicator

## Tokens de design
- **Localização:** `packages/tokens/src/index.ts` e `packages/tokens/css/base.css`
- **Categorias:** Cores, tipografia, espaçamentos, sombras, bordas
- **Consumo:** Sempre importe de `@adsmagic/tokens` ou `@adsmagic/tokens/css`
- **Nunca hardcode valores**: Use tokens para garantir consistência

**Exemplo de uso:**
```typescript
import { tokens } from '@adsmagic/tokens';

const Button = styled.button`
  background: ${tokens.colors.primary};
  padding: ${tokens.spacing.md};
  border-radius: ${tokens.borderRadius.md};
`;
```

## Figma e Dev Mode
- Use o Figma para exploração, alinhamento e **especificação** (Dev Mode e Code Connect).
- **NÃO mantenha telas ou componentes duplicados no Figma**; a manutenção da UI deve ser feita no código.
- Dev Mode/Code Connect permite vincular camadas do Figma aos componentes reais do DS.
- Consulte `docs/figma-mcp.md` para integração Figma MCP.

## Acessibilidade & UX
- Siga as diretrizes do **WCAG 2.1 AA** para contraste, foco visível, navegação via teclado e leitura por leitores de tela.
- Documente variações e estados (hover, focus, active, disabled, error) no Storybook.
- Todos os componentes possuem `aria-label`, `aria-labelledby` ou texto acessível.
- **Validação:** Use `axe-core` integrado nos testes Playwright.

## Fluxo de trabalho

### Criar/Modificar Componente
1. **Tokens:** Verifique se os tokens necessários existem em `packages/tokens`
2. **Implementação:** Crie o componente em `packages/react-components/src/components/NomeComponente/`
3. **Paridade Vue:** Replique em `packages/vue-components/src/components/DsNomeComponente/`
4. **Stories:** Crie `NomeComponente.stories.tsx` em ambos os Storybooks
5. **Testes:** 
   - Unit: `NomeComponente.test.tsx` (Vitest)
   - Visual: Adicione em `tests/visual/react-parity.spec.ts` e `vue-parity.spec.ts`
6. **Export:** Adicione ao `index.ts` do respectivo pacote
7. **Documentação:** Atualize docs em `apps/storybook-hub/docs/`

### Comandos úteis
```bash
# Desenvolvimento
npm run dev           # Storybook Hub (6006)
npm run dev:react     # Storybook React (6008)
npm run dev:vue       # Storybook Vue (7007)

# Build
npm run build --workspace @adsmagic/tokens
npm run build --workspace @adsmagic/react-components
npm run build --workspace @adsmagic/vue-components

# Testes
npm test              # Unit tests (Vitest)
npm run test:visual   # Testes visuais (Playwright)
npm run test:ui       # Interface Playwright
```

## Testes visuais e de interação
- **55 testes visuais configurados** em `tests/visual/`
- **Status:** Aguardando correção do servidor legado (porta 4100)
- **Baseline:** Compara React/Vue contra HTML legado
- **Tolerância:** 1-5% dependendo do componente
- **CI/CD:** Integrado com GitHub Actions

**Estrutura:**
```
tests/visual/
├── legacy-baseline.spec.ts   # 14 testes (baseline HTML)
├── react-parity.spec.ts      # 15 testes (paridade React)
├── vue-parity.spec.ts        # 15 testes (paridade Vue)
└── mobile-parity.spec.ts     # 6 testes (mobile/tablet)
```

## Padrões de Componentes

### Estrutura obrigatória
```
ComponenteName/
├── ComponentName.tsx          # Implementação
├── ComponentName.stories.tsx  # Stories Storybook
├── ComponentName.test.tsx     # Testes unitários
└── index.ts                   # Export
```

### Props padrão
- `variant`: variações visuais (primary, secondary, etc.)
- `size`: tamanhos (sm, md, lg)
- `disabled`: estado desabilitado
- `className`: classes customizadas
- `children`: conteúdo

### Acessibilidade obrigatória
- Sempre forneça `aria-label` ou texto visível
- Use roles semânticos corretos
- Garanta navegação por teclado
- Contraste mínimo WCAG AA

## Checklist de novo componente
- [ ] Tokens utilizados (sem hardcode)
- [ ] Paridade React ↔ Vue
- [ ] Stories com todos os estados
- [ ] Testes unitários (≥80%)
- [ ] Testes visuais adicionados
- [ ] Acessibilidade validada (axe-core)
- [ ] Documentação atualizada
- [ ] Export em `index.ts`
- [ ] ADR criado (se decisão arquitetural)
