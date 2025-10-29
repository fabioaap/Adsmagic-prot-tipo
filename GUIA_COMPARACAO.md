# 📊 COMPARAÇÃO VISUAL: HTML Original vs React

## 🔗 URLs para Comparação

### Original (HTML Puro)
```
file:///C:/Users/Educacross/Documents/Adsmagic/Protipo/Adsmagic-prot-tipo/apps/prototype-static/index.html
OU
http://localhost:4100 (via npm run dev:legacy)
```

### React (Nova Versão)
```
http://localhost:5177 (via npm run dev)
```

---

## 📋 CHECKLIST DE PARITY

### Layout Base
- [ ] App-shell wrapper
- [ ] Sidebar fixed (288px = 18rem)
- [ ] Header fixed (top: 0, left: 288px)
- [ ] Main content area com padding-top: 140px
- [ ] Background color #f1f5f9

### Sidebar
- [ ] Logo/Brand Adsmágic
- [ ] Nav groups (PROJETOS, PRINCIPAL, RASTREAMENTO, SISTEMA)
- [ ] Active state (is-active) no Visão geral
- [ ] Icons e texto alinhados
- [ ] Cores corretas (#0f172a texto ativo, etc)

### Header
- [ ] Notification button
- [ ] User info (Dra. Letícia Lopes)
- [ ] Role (Marketing Consultant)
- [ ] Avatar com fundo azul (AL)
- [ ] Position fixed, left 288px

### Summary Cards (14 cards)
- [ ] Grid 4 colunas (lg:grid-cols-4)
- [ ] Rounded 1.5rem (rounded-3xl)
- [ ] Border #e2e8f0
- [ ] Shadow card-shadow
- [ ] Badge colors: 
  - [ ] Positive: bg-emerald-100 text-emerald-700 (#d1fae5 #059669)
  - [ ] Negative: bg-red-100 text-red-700 (#ffe4e6 #f43f5e)
- [ ] Card values em 1.5rem font-600

### Charts Section 1 (2fr 1fr layout)
- [ ] Contatos e Vendas (LineChart)
  - [ ] Width 2fr
  - [ ] Duas linhas (azul para contacts, verde tracejada para sales)
  - [ ] Legend com Fev, Mar, Abr, Mai
  - [ ] Stats: Contatos (273) e Vendas (78)
- [ ] Receita (PieChart)
  - [ ] Width 1fr
  - [ ] Donut chart azul/verde
  - [ ] "Meta atingida em" 82%
  - [ ] Badge +5,3%

### Charts Section 2 (1fr 1fr layout)
- [ ] Vendas por canal (Donut + Legend)
  - [ ] 6 canais com cores
  - [ ] Google Ads 55%
  - [ ] Meta Ads 18%
  - [ ] TikTok Ads 12%
  - [ ] Orgânico 8%
  - [ ] Direto 5%
  - [ ] Outros 2%
- [ ] Funil de vendas (4 estágios)
  - [ ] Contatos: 100% (azul)
  - [ ] Qualificados: 66% (verde)
  - [ ] Oportunidades: 33% (amarelo)
  - [ ] Fechados: 17% (vermelho)
  - [ ] Gradiente em cada barra

### Typography
- [ ] H1 main: 1.5rem font-600 #0f172a "Visão geral"
- [ ] Subtitle: text-xs text-slate-500
- [ ] Card labels: text-xs font-600 #94a3b8
- [ ] Card values: text-2xl font-600 #0f172a
- [ ] Card captions: text-xs #64748b

### Colors (CSS Variables)
- [ ] --page-background: #f1f5f9
- [ ] --page-text: #0f172a
- [ ] --surface: #ffffff
- [ ] --border-soft: #e2e8f0
- [ ] --shadow-card: 0px 10px 32px rgba(15, 23, 42, 0.06)

---

## 🎨 ELEMENTOS QUE DEVEM COMBINAR 100%

### Sidebar
```
Width: 288px (18rem)
Background: #ffffff
Padding: 2rem 1.5rem
Border-right: 1px solid #e2e8f0
Position: fixed
Height: 100vh
Z-index: 40
```

### Header
```
Position: fixed
Top: 0
Left: 288px
Right: 0
Height: ~80px (estimado)
Background: rgba(255, 255, 255, 0.92) com backdrop blur
Border-bottom: 1px solid #e2e8f0
Z-index: 50
```

### Main Content
```
Margin-left: 288px (ou via flexbox)
Padding-top: 140px (account para header)
Padding: 2.5rem 1.5rem
Background: #f1f5f9
```

### Cards
```
border-radius: 1.5rem (24px)
border: 1px solid #e2e8f0
background: #ffffff
padding: 1.25rem
height: 140px (min)
box-shadow: 0px 10px 32px rgba(15, 23, 42, 0.06)
```

---

## 🔍 DICAS PARA COMPARAÇÃO

1. **Abra DevTools (F12)** em ambas as páginas
2. **Compare Layout:**
   - Inspecione `.app-shell` - deve ter sidebar + main
   - Verifique position dos elementos fixos
   - Compare z-index values

3. **Compare Cores:**
   - Pegue color picker no DevTools
   - Compare backgrounds, borders, shadows
   - Verifique rgba values

4. **Compare Typography:**
   - Font sizes (use DevTools Computed)
   - Font weights (400, 500, 600, etc)
   - Line heights

5. **Compare Spacing:**
   - Padding e margins (DevTools Box Model)
   - Gap entre cards
   - Gaps entre sections

---

## 📸 CAPTURAS RECOMENDADAS

Tire screenshots em:
- [ ] Vista geral (1920px wide)
- [ ] Scroll até bottom (vê funil completo)
- [ ] Sidebar collapsed (se aplicável)
- [ ] Mobile view (768px)
- [ ] Detalhes dos cards (zoom)

---

## ✅ PRONTO PARA COMPARAÇÃO

Ambas as versões estão rodando:
- **HTML Original:** http://localhost:4100
- **React Nova:** http://localhost:5177

Dica: Use Alt+Tab ou dois monitores para comparar lado a lado!

