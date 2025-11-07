### Contexto
- [ ] **Delivery** (requisitos claros)  ou  - [ ] **Discovery** (preencha a Mini‑OST abaixo)

#### (Discovery) Mini‑OST
- **Resultado**:
- **Oportunidades**:
- **Solução**:
- **Experimento** (hipótese, métrica‑alvo, coorte, janela, efeito mínimo, rollback):
- **Flag** (TTL/owner/kill‑switch):
- **Evidências** (2–3 links oficiais):

### O que mudou
- [ ] Código (patch pequeno e reversível)
- [ ] Stories/Documentação atualizados (Storybook)
- [ ] Tokens atualizados (se aplicável)
- [ ] ADR criado/atualizado (se decisão arquitetural)
- [ ] Testes adicionados/atualizados

### Checklist de PR
- [ ] **Segurança** (OWASP, segredos, authz/authn, dependências atualizadas)
- [ ] **Performance** (índices, N+1, cache, bundle size)
- [ ] **Acessibilidade** (WCAG AA, ARIA, navegação teclado)
- [ ] **i18n** (textos externalizados quando aplicável)
- [ ] **Observabilidade** (logs estruturados, tracing, métricas)
- [ ] **Testes** (unit ≥80%, integração, e2e/visuais quando aplicável)
- [ ] **Documentação** (CHANGELOG, README, Storybook, ADR)

### Checklist Adsmagic
- [ ] Componentes React e Vue em paridade (se aplicável)
- [ ] Tokens usados ao invés de valores hardcoded
- [ ] Stories Storybook criadas/atualizadas
- [ ] Testes visuais adicionados (se componente UI)
- [ ] Build passa sem erros (`npm run build`)
- [ ] Lint passa sem erros (`npm run lint`)
- [ ] Testes unitários passam (`npm test`)

### Como validar
Descreva comandos, URLs, dados de teste e critérios de aceite necessários para reproduzir e validar as mudanças.

**Comandos:**
```bash
# Exemplo
npm install
npm run dev
# Acesse http://localhost:6006
```

**Critérios de aceite:**
- [ ] Critério 1
- [ ] Critério 2

### Screenshots (se aplicável)
Cole aqui screenshots ou GIFs mostrando as mudanças visuais.

### Checklist final
- [ ] Código revisado e testado localmente
- [ ] Documentação atualizada
- [ ] Sem breaking changes (ou documentados em CHANGELOG)
- [ ] Pronto para merge
