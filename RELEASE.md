# 📦 Guia de Release - Design System Adsmagic

Este guia documenta o processo de versionamento e release do Design System Adsmagic.

## 🎯 Estratégia de Versionamento

Utilizamos [Semantic Versioning (SemVer)](https://semver.org/) com versionamento automático via conventional commits.

### Formato da Versão
```
MAJOR.MINOR.PATCH
```

- **MAJOR**: Quebra de compatibilidade (mudanças breaking)
- **MINOR**: Novos recursos compatíveis (novas funcionalidades)
- **PATCH**: Correções de bugs compatíveis

## 📝 Conventional Commits

Todos os commits devem seguir o padrão [Conventional Commits](https://conventionalcommits.org/):

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Tipos de Commit

| Tipo | Descrição | Exemplo |
|------|-----------|---------|
| `feat` | Nova funcionalidade | `feat: adicionar componente Button` |
| `fix` | Correção de bug | `fix: corrigir alinhamento do modal` |
| `docs` | Documentação | `docs: atualizar guia de instalação` |
| `style` | Formatação/código | `style: formatar código com Prettier` |
| `refactor` | Refatoração | `refactor: simplificar lógica do hook` |
| `test` | Testes | `test: adicionar testes para componente Card` |
| `chore` | Manutenção | `chore: atualizar dependências` |
| `ci` | CI/CD | `ci: adicionar workflow de deploy` |
| `build` | Build | `build: otimizar configuração Vite` |
| `perf` | Performance | `perf: melhorar performance do componente` |

### Fazendo Commits

#### Opção 1: Commitizen (Recomendado)
```bash
npm run commit
```
Isso abre um assistente interativo para criar commits padronizados.

#### Opção 2: Commit Manual
```bash
git commit -m "feat: adicionar validação de formulário"
```

## 🔄 Processo de Release

### Automático (Recomendado)
1. **Push para `main`**: Commits são analisados automaticamente
2. **CI/CD executa**: Lint, testes e release
3. **Versionamento**: Semantic-release determina nova versão
4. **Changelog**: Atualizado automaticamente
5. **GitHub Release**: Criado com release notes
6. **Git Tag**: Criada automaticamente

### Manual (Quando necessário)
```bash
# Gerar changelog
npm run changelog

# Commit das mudanças
git add CHANGELOG.md
git commit -m "docs: atualizar changelog"

# Criar tag manual
git tag v1.2.3
git push origin v1.2.3
```

## 📋 Versionamento por Pacote

Como monorepo, versionamos pacotes individualmente:

- `@adsmagic/tokens`: Design tokens
- `@adsmagic/react`: Componentes React
- `@adsmagic/vue`: Componentes Vue
- `@adsmagic/storybook-*`: Documentação

### Exemplo de Release
```
feat: adicionar componente Modal

- Novo componente Modal com acessibilidade WCAG 2.1 AA
- Suporte a React e Vue
- Documentação completa no Storybook
```

Resultado: `v1.1.0` (MINOR)

## 🏷️ GitHub Releases

Cada release cria automaticamente:
- **Tag**: `v1.2.3`
- **Release notes**: Baseadas nos commits
- **Changelog**: Atualizado no repositório

## 🔍 Validação

Antes do release, garantir:
- [ ] Todos os testes passando
- [ ] Lint sem erros
- [ ] Build funcionando
- [ ] Documentação atualizada
- [ ] Commits seguindo conventional commits

## 🚨 Rollback

Em caso de problemas:
1. Criar novo commit revertendo mudanças
2. Push força nova análise e possível PATCH release

## 📚 Referências

- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://conventionalcommits.org/)
- [Semantic Release](https://semantic-release.gitbook.io/)
- [Keep a Changelog](https://keepachangelog.com/)