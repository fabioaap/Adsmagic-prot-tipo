# 📚 Storybook Hub - Design System Adsmagic

O **Storybook Hub** é a documentação centralizada do Design System Adsmagic, contendo componentes React e Vue com documentação interativa, guias de uso e padrões de design.

## 🚀 Acesso

### Desenvolvimento Local
```bash
# Subir todos os storybooks (React, Vue e Hub)
npm run dev:all

# Ou individualmente:
npm run dev          # Storybook Hub (porta 6006)
npm run dev:react    # Componentes React (porta 6008)
npm run dev:vue      # Componentes Vue (porta 7007)
```

### Produção (GitHub Pages)
Após merge na branch `main`, o Storybook Hub é automaticamente publicado em:
**https://fabioaap.github.io/Adsmagic-prot-tipo/**

## 📖 Conteúdo

### Componentes Disponíveis
- **React Components**: Biblioteca completa de componentes React
- **Vue Components**: Biblioteca completa de componentes Vue
- **Tokens**: Sistema de design tokens (cores, espaçamentos, tipografia)
- **Páginas**: Dashboards e protótipos funcionais

### Documentação
- **Introdução**: Visão geral do design system
- **Componentes**: Catálogo completo com exemplos
- **Tokens**: Guia de uso dos design tokens
- **Qualidade e Testes**: Padrões de QA e testes
- **Governança**: Regras e processos do design system

## 🛠️ Desenvolvimento

### Estrutura do Projeto
```
apps/
├── storybook-hub/          # Documentação central (Storybook)
├── storybook-react/        # Catálogo React
└── storybook-vue/          # Catálogo Vue

packages/
├── tokens/                 # Design tokens
├── react-components/       # Componentes React
└── vue-components/         # Componentes Vue
```

### Comandos Úteis
```bash
# Build do hub
npm run build

# Testes
npm test

# Lint
npm run lint

# Testes E2E
npm run test:ui
```

## 📋 Qualidade e Padrões

- ✅ **CI/CD**: Pipeline automatizado com lint, build e testes
- ✅ **Acessibilidade**: Componentes seguindo WCAG 2.1 AA
- ✅ **Testes**: Cobertura completa com Vitest e Playwright
- ✅ **TypeScript**: Tipagem completa em todos os componentes
- ✅ **Design System**: Consistência visual através de tokens

## 🤝 Contribuição

1. Faça fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'feat: adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

### Padrões de Commit
- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Documentação
- `style:` - Formatação
- `refactor:` - Refatoração
- `test:` - Testes
- `chore:` - Manutenção

## 📞 Suporte

Para dúvidas ou sugestões:
- Abra uma [issue](https://github.com/fabioaap/Adsmagic-prot-tipo/issues)
- Consulte a documentação interna
- Entre em contato com a equipe de design system

---

**Design System Adsmagic** - Construindo experiências consistentes e acessíveis.