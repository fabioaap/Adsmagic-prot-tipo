# 05_search_mode — Modo Pesquisa: Quando e Como Buscar Informações

## Quando ativar o Modo Pesquisa

Ative este modo quando:
- Falta conhecimento técnico específico sobre uma biblioteca/framework
- Há dúvida sobre melhores práticas ou padrões
- Precisa validar compatibilidade de versões
- Busca por documentação oficial de APIs
- Investiga causa raiz de bugs complexos
- Necessita de benchmarks ou comparações técnicas

## Quando NÃO ativar

Não use para:
- Código que já está documentado no projeto
- Decisões já registradas em ADRs
- Padrões já estabelecidos no Design System
- Informações disponíveis em READMEs locais

## Processo de Pesquisa

### 1. Definir a questão
Formule uma pergunta clara e específica:
- ❌ "Como fazer autenticação?"
- ✅ "Como implementar refresh token JWT em React com axios?"

### 2. Fontes prioritárias (em ordem)

1. **Documentação oficial**
   - MDN Web Docs (JavaScript, APIs Web)
   - React Documentation
   - Vue.js Documentation
   - TypeScript Handbook
   - Playwright Documentation
   - Vite Documentation

2. **Repositórios oficiais**
   - GitHub Issues e Discussions
   - Release Notes e CHANGELOGs
   - Examples e Samples

3. **Comunidade técnica**
   - Stack Overflow (verificar data e votos)
   - Dev.to (artigos recentes)
   - Reddit (r/reactjs, r/typescript, etc.)

4. **Blogs técnicos confiáveis**
   - Kent C. Dodds
   - Dan Abramov
   - Josh W. Comeau
   - CSS-Tricks

### 3. Validar informações

Sempre:
- ✅ Verificar data de publicação (preferir < 1 ano)
- ✅ Checar versões de dependências
- ✅ Testar código localmente antes de recomendar
- ✅ Citar fonte completa (URL + data de acesso)
- ✅ Adaptar ao contexto do projeto Adsmagic

Evitar:
- ❌ Código sem teste/validação
- ❌ Soluções desatualizadas (> 2 anos)
- ❌ Fontes não confiáveis
- ❌ Copy-paste sem entender

### 4. Documentar descoberta

Após pesquisa bem-sucedida:
```markdown
## Pesquisa Realizada

**Questão:** Como implementar X?

**Fontes consultadas:**
1. [Documentação oficial](https://url.com) - Acessado em DD/MM/YYYY
2. [Stack Overflow](https://stackoverflow.com/q/123456) - 234 votos

**Decisão:** Implementar usando abordagem Y porque:
- Prós: A, B, C
- Contras: D, E
- Alternativas consideradas: Z

**Implementação:** [código ou referência]

**Referências:**
- Link 1
- Link 2
```

## Aplicação no Adsmagic

### Exemplo: Pesquisar sobre testes visuais

**Questão:** "Como resolver timeout em testes visuais Playwright?"

**Fontes:**
1. [Playwright Docs - Timeouts](https://playwright.dev/docs/test-timeouts)
2. [GitHub Issue #12345](https://github.com/microsoft/playwright/issues/12345)

**Descoberta:**
```typescript
// playwright.visual.config.ts
export default defineConfig({
  use: {
    actionTimeout: 10000,
    navigationTimeout: 30000,
  },
  expect: {
    timeout: 10000,
  },
});
```

**Aplicado em:** `playwright.visual.config.ts`

### Exemplo: Pesquisar tokens de design

**Questão:** "Como implementar tokens DTCG com Style Dictionary?"

**Fontes:**
1. [DTCG Spec](https://tr.designtokens.org/format/)
2. [Style Dictionary Docs](https://amzn.github.io/style-dictionary/)

**Decisão:** Usar formato DTCG em JSON + Style Dictionary para gerar CSS/TS

**Implementado em:** `packages/tokens/`

## Checklist de Pesquisa

Antes de recomendar uma solução:
- [ ] Pesquisei documentação oficial
- [ ] Verifiquei versões e compatibilidade
- [ ] Testei localmente (quando possível)
- [ ] Citei fontes com URLs completas
- [ ] Adaptei ao contexto Adsmagic
- [ ] Considerei impacto em segurança/performance
- [ ] Documentei decisão (ADR se relevante)

## Recursos Oficiais do Projeto Adsmagic

Antes de pesquisar externamente, consulte:
1. `CHANGELOG.md` - Histórico e decisões
2. `README-TESTING.md` - Guia de testes
3. `VISUAL_REGRESSION.md` - Regressão visual
4. `docs/storybook-backlog.md` - Backlog e prioridades
5. `docs/visual-regression.md` - Docs técnicas
6. `.github/copilot-instructions.md` - Instruções do projeto
7. `apps/storybook-hub/docs/` - Documentação completa

## Saída do Modo Pesquisa

Sempre inclua:
1. **Fontes consultadas** (2-3 links oficiais)
2. **Data de acesso**
3. **Resumo da descoberta**
4. **Decisão tomada**
5. **Código de exemplo (se aplicável)**
6. **Próximos passos**

**Formato:**
```markdown
### 🔍 Pesquisa Realizada

**Questão:** [pergunta específica]

**Fontes:**
- [Fonte 1](url) - DD/MM/YYYY
- [Fonte 2](url) - DD/MM/YYYY

**Resumo:** [O que foi descoberto]

**Decisão:** [O que será implementado]

**Código:**
```typescript
// exemplo
```

**Próximos passos:**
- [ ] Item 1
- [ ] Item 2
```

## Anti-padrões

❌ **Não faça:**
- Recomendar código sem testar
- Citar fontes sem URL
- Usar soluções desatualizadas
- Ignorar contexto do projeto
- Copiar código sem entender

✅ **Faça:**
- Validar antes de recomendar
- Citar fontes completas
- Verificar compatibilidade
- Adaptar ao Adsmagic
- Explicar decisões
