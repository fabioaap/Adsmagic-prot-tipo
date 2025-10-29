# 🚀 GUIA RÁPIDO - COMPARAÇÃO VISUAL

## ✅ TUDO PRONTO!

Ambas as versões estão rodando:

### 🌐 Versão Original (HTML)
```
http://localhost:4100
```
- **O que é:** HTML puro com CSS do original
- **CSS:** `apps/prototype-static/assets/css/base.css`
- **Status:** ✅ Rodando

### 🌐 Versão React (Nova)
```
http://localhost:5177
```
- **O que é:** React + TypeScript + Tailwind + Recharts
- **Código:** `apps/dashboard-react/src/pages/Dashboard.tsx`
- **Status:** ✅ Rodando (dev server)

---

## 📊 O QUE COMPARAR

### 1️⃣ **VISUAL GERAL**
- [ ] Layout é idêntico?
- [ ] Sidebar está à esquerda com mesma largura?
- [ ] Header está no topo com posição correta?
- [ ] Main tem padding correto?

### 2️⃣ **SUMMARY CARDS (14 cards)**
- [ ] Cards em grid 4 colunas?
- [ ] Tamanho e border-radius iguais?
- [ ] Badges com cores corretas?
  - Verde (positive): Gastos anúncios (+74%), Receita (+46%), etc
  - Vermelho (negative): Custo por venda (-51%), Cliques (-13%), etc
- [ ] Valores em tamanho 1.5rem?
- [ ] Sombra igual (card-shadow)?

### 3️⃣ **GRÁFICOS - CONTATOS E VENDAS**
- [ ] LineChart renderiza com 2 linhas?
- [ ] Linha azul (#2563eb) para Contatos?
- [ ] Linha verde tracejada (#10b981) para Vendas?
- [ ] X-axis com Fev, Mar, Abr, Mai?
- [ ] Stats com valores corretos? (273 contatos, 78 vendas)
- [ ] Posição de side-by-side correto com Receita?

### 4️⃣ **GRÁFICO - RECEITA**
- [ ] Donut chart renderiza?
- [ ] Percentual 82% aparece?
- [ ] Label "Meta atingida em" aparece?
- [ ] Badge +5,3% verde está visível?

### 5️⃣ **VENDAS POR CANAL (Donut)**
- [ ] Donut com 6 cores diferentes?
- [ ] Legend com nomes e percentuais?
  - Google Ads 55%
  - Meta Ads 18%
  - TikTok Ads 12%
  - Orgânico 8%
  - Direto 5%
  - Outros 2%
- [ ] Centro mostra "VENDAS R$ 8.200"?

### 6️⃣ **RECEITA POR CANAL (Donut)**
- [ ] Layout similar a Vendas por Canal?
- [ ] Legend com cores e percentuais?
- [ ] Centro mostra "RECEITA R$ 12.120"?

### 7️⃣ **FUNIL DE CONVERSÃO** 
- [ ] 4 estágios aparecendo?
- [ ] Barras com gradiente de cores?
- [ ] Percentuais e valores corretos?
  - Agendou atendimento: 724 (100%)
  - Contato iniciado: 438 (61%)
  - Serviço realizado: 212 (17%)
- [ ] Cores progressivas? (roxo → azul → turquesa)

### 8️⃣ **ÚLTIMAS INTERAÇÕES** ✅ NOVO
- [ ] Título "Últimas interações"?
- [ ] 3 itens na lista?
- [ ] Gabriel Torres | 12:45 | Chat?
- [ ] Ana Carvalho | Ontem | Email?
- [ ] Estúdio Pluma | Ontem | Ligação?
- [ ] Botão "Ver histórico"?
- [ ] Primeira com fundo cinza (bg-slate-50)?

### 9️⃣ **ÚLTIMAS VENDAS** ✅ NOVO
- [ ] Título "Últimas vendas"?
- [ ] 4 itens na lista?
- [ ] Adset Terra | R$ 19.200?
- [ ] Nexo Labs | R$ 9.680?
- [ ] Studio Dobra | R$ 6.250?
- [ ] Orion Fit | R$ 7.950?
- [ ] Botão "Exportar"?

---

## 🎨 VALIDAÇÃO DE CORES

### Usar DevTools Color Picker

**No Chrome/Firefox:**
1. Pressione `F12` para abrir DevTools
2. Clique no eyedropper (pipette)
3. Hover sobre elemento para ver cor HEX

**Cores a Validar:**

| Elemento | Hex Original | React | Deve Ser |
|----------|-------------|-------|----------|
| Badge positive bg | #d1fae5 | ? | Verde claro |
| Badge positive text | #059669 | ? | Verde escuro |
| Badge negative bg | #ffe4e6 | ? | Vermelho claro |
| Badge negative text | #f43f5e | ? | Vermelho |
| LineChart Contatos | #2563eb | ? | Azul |
| LineChart Vendas | #10b981 | ? | Verde |
| Funil estágio 1 | #2563eb | ? | Azul |
| Funil estágio 2 | #10b981 | ? | Verde |
| Funil estágio 3 | #f59e0b | ? | Amarelo |
| Funil estágio 4 | #ef4444 | ? | Vermelho |

---

## 🖥️ TÉCNICAS DE COMPARAÇÃO

### Técnica 1: Side-by-Side (Recomendado)
```
Monitor 1: http://localhost:4100 (Original)
Monitor 2: http://localhost:5177 (React)
```

### Técnica 2: Janelas (Alt+Tab)
```
1. Abra http://localhost:4100 (Ctrl+N no Chrome)
2. Abra http://localhost:5177 (Ctrl+N no Chrome)
3. Use Alt+Tab para alternar
```

### Técnica 3: Abas
```
1. Abra http://localhost:4100 em aba 1
2. Abra http://localhost:5177 em aba 2
3. Use Ctrl+Tab para alternar
```

### Técnica 4: DevTools Inspection
```
1. Abra DevTools (F12) em ambas
2. Inspecione elemento correspondente
3. Compare CSS classes e computed styles
```

---

## 🔧 SE HOUVER DIFERENÇAS

### Passo 1: Identificar a Diferença
- **Cor diferente?** → Copie hex code
- **Tamanho diferente?** → Meça com DevTools ruler
- **Espaço diferente?** → Compare padding/margin
- **Elemento faltando?** → Verifique HTML

### Passo 2: Localizar no Código
```
Dashboard.tsx
    ↓
Procure pela classe/elemento
    ↓
Valide a classe Tailwind ou CSS
```

### Passo 3: Ajustar
**Se for cor:** Alterar classe Tailwind ou CSS  
**Se for tamanho:** Aumentar/diminuir Tailwind class  
**Se for espaço:** Ajustar p-, m-, gap- classes  
**Se for elemento:** Copiar HTML do original

### Passo 4: Testar
```bash
# Build automático (Vite detecta changes)
# Recarregue no navegador (Ctrl+R ou Cmd+R)
# Valide visualmente
```

---

## 📱 TESTE DE RESPONSIVIDADE

### Breakpoints Tailwind
- **Mobile:** < 640px
- **Tablet:** 640px - 1024px (sm, md, lg)
- **Desktop:** > 1024px

### Teste em DevTools
```
1. Abra DevTools (F12)
2. Clique Device Toggle (Ctrl+Shift+M)
3. Selecione diferentes dispositivos:
   - iPhone 12 (390px)
   - iPad (768px)
   - Desktop (1920px)
```

### O que Deve Mudar
- Summary cards: 4 cols (desktop) → 2 cols (tablet) → 1 col (mobile)
- Charts: 2 colunas → 1 coluna em mobile
- Sidebar: visível em desktop → hidden em mobile

---

## ✅ ASSINATURA FINAL

Quando estiver satisfeito com a comparação visual, marque aqui:

```markdown
## VALIDAÇÃO CONCLUÍDA

- [x] Visual geral idêntico
- [x] Cards renderizando corretamente
- [x] Cores validadas
- [x] Gráficos funcionando
- [x] Tabelas adicionadas
- [x] Responsividade funcionando
- [x] PRONTO PARA PRODUÇÃO ✅
```

---

## 🆘 PROBLEMAS COMUNS

### Página React em branco?
```bash
# Dev server não está rodando
cd apps/dashboard-react
npx vite --port 5177
```

### Página original não carrega?
```bash
# Legacy server não está rodando
npm run dev:legacy
# Ou
cd apps/prototype-static
npx http-server . -p 4100
```

### Cores diferentes no navegador?
```
→ Limpe cache: Ctrl+Shift+Del
→ Recarregue hard refresh: Ctrl+Shift+R
→ Abra em modo incógnito
```

### Gráficos não renderizam?
```
→ Abra Console (F12 → Console)
→ Procure por erros em vermelho
→ Copie erro e pesquise
```

### Tabelas não aparecem?
```
→ Scroll até o final (Page Down ou scroll do mouse)
→ Verifique em DevTools (F12) se HTML está presente
→ Procure pela classe "grid gap-4 lg:grid-cols-2"
```

---

## 📞 PRÓXIMAS AÇÕES

Após validação visual:

1. **Validação aprovada?** ✅
   - Documentar diferenças (se houver)
   - Fazer ajustes necessários
   - Commit para Git

2. **Pequenas discrepâncias?**
   - Fazer PR com ajustes
   - Descrever mudanças
   - Pedir review

3. **Pronto para deploy?**
   - Fazer build final: `npm run build --workspace @adsmagic/dashboard-react`
   - Deploy em staging/produção
   - Testar em ambiente de produção

---

**Atualizado em:** 28 de outubro de 2025  
**Status:** ✅ Pronto para Comparação Visual

