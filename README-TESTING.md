# Testes do Projeto Adsmagic

Este projeto inclui testes automatizados usando Playwright para garantir a qualidade e funcionalidade do layout dos cards.

## 🚀 Executando os Testes

### Pré-requisitos

- Node.js instalado
- npm ou yarn

### Instalação

```bash
npm install
```

### Executar Todos os Testes

```bash
npm test
```

### Executar Testes com Interface Visual

```bash
npm run test:ui
```

### Executar Testes em Modo Debug

```bash
npm run test:debug
```

### Executar Apenas Testes Específicos

```bash
# Apenas testes básicos
npx playwright test tests/basic.spec.js

# Apenas testes de layout
npx playwright test tests/card-layout.spec.js
```

## 📋 Testes Implementados

### Testes Básicos (`tests/basic.spec.js`)

- ✅ Verificação do título da página
- ✅ Verificação do conteúdo principal do dashboard
- ✅ Verificação da presença dos cards de resumo
- ✅ Verificação do posicionamento lado a lado dos dois últimos cards
- ✅ Teste de responsividade em dispositivos móveis
- ✅ Verificação da navegação lateral
- ✅ Verificação da presença de gráficos e tabelas

### Testes de Layout (`tests/card-layout.spec.js`)

- ✅ Verificação da quantidade exata de cards (14)
- ✅ Teste de posicionamento lado a lado dos dois últimos cards
- ✅ Verificação do conteúdo correto dos últimos dois cards
- ✅ Teste de responsividade em diferentes tamanhos de tela
- ✅ Verificação do layout em grid apropriado

## 🎯 Funcionalidade Testada

### Layout dos Cards

Os testes verificam especificamente que:
- Os **dois últimos cards** ("Ciclo de vendas" e "Clientes ativos") ficam **lado a lado**
- Cada card ocupa aproximadamente **50% da largura disponível**
- O layout permanece **responsivo** em diferentes dispositivos
- Os cards mantêm o **espaçamento adequado**

### Breakpoints Responsivos

- **Desktop (>1023px)**: Grid de 4 colunas, últimos 2 cards lado a lado
- **Tablet (768-1023px)**: Grid de 3 colunas, últimos 2 cards lado a lado
- **Mobile (480-767px)**: Grid de 2 colunas
- **Mobile pequeno (<480px)**: Layout de coluna única

## 📊 Resultados Esperados

Quando os testes passam com sucesso:
- ✅ 36 testes executados (12 por navegador × 3 navegadores)
- ✅ Todos os testes relacionados ao layout dos cards passam
- ✅ Layout responsivo funcionando corretamente
- ✅ Cards posicionados lado a lado conforme especificação

## 🔧 Estrutura do Projeto

```
├── tests/
│   ├── basic.spec.js          # Testes básicos da aplicação
│   └── card-layout.spec.js    # Testes específicos do layout dos cards
├── playwright.config.js       # Configuração do Playwright
├── test-server.js             # Servidor de teste Node.js
└── package.json               # Dependências e scripts
```

## 🚨 Solução de Problemas

### Se os testes falharem:

1. **Verifique se o servidor está rodando**:
   ```bash
   node test-server.js
   ```

2. **Verifique se todas as dependências estão instaladas**:
   ```bash
   npm install
   ```

3. **Execute os testes em modo debug**:
   ```bash
   npm run test:debug
   ```

### Problemas Comuns:

- **Servidor não inicia**: Verifique se a porta 8000 está disponível
- **Elementos não encontrados**: Verifique se o HTML está carregando corretamente
- **Testes de layout falham**: Verifique se o CSS está sendo aplicado corretamente

## 📈 Cobertura de Testes

Os testes cobrem:
- ✅ **Funcionalidade básica** da aplicação
- ✅ **Layout responsivo** em diferentes dispositivos
- ✅ **Posicionamento específico** dos cards
- ✅ **Navegação e estrutura** da página
- ✅ **Gráficos e seções** principais

## 🎉 Conclusão

Os testes garantem que:
1. A aplicação carrega corretamente
2. Os dois últimos cards ficam lado a lado conforme especificado
3. O layout permanece responsivo em diferentes dispositivos
4. Todas as funcionalidades principais estão operacionais

Execute `npm test` para verificar se tudo está funcionando corretamente!
