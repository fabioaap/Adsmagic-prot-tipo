## 0.1.0 (2025-10-30) - Status atual: estabilizacao em andamento

### Destaques implementados
* feat: dashboard React alinhado ao prototipo HTML (pendente validar tokens/telas restantes)
* feat: bibliotecas de componentes React/Vue com stories dedicados
* feat: pipelines de lint/build/publicacao configurados (visual regressao ainda bloqueada)
* feat: suites Playwright para E2E e regressao visual configuradas
* feat: documentacao inicial (Storybook hub, guias de migracao e testes)

### Pendencias criticas
* fix: servidor legado usado pela suite visual precisa alinhar porta 4100/8000
* test: capturar baseline completo e revisar paridade React/Vue antes de habilitar CI
* chore: revisar design tokens utilizados pelos componentes e atualizar documentacao

### Indicadores atuais
* **Telas validadas:** 3 de 11
* **Cenarios visuais configurados:** 55 (baseline parcial)
* **Status:** repositorio utilizavel para desenvolvimento interno; liberar producao apos concluir pendencias acima

---

## 0.1.0 (2025-10-29)

* feat: add collapsible sidebar navigation ([7d5fb2a](https://github.com/fabioaap/Adsmagic-prot-tipo/commit/7d5fb2a))
* feat: add DataTable component with Storybook stories ([d7994a7](https://github.com/fabioaap/Adsmagic-prot-tipo/commit/d7994a7))
* feat: add dev:all script to concurrently run all Storybook workspaces and update dependencies ([bcf78b4](https://github.com/fabioaap/Adsmagic-prot-tipo/commit/bcf78b4))
* feat: add Tailwind CSS configuration for dashboard-react app ([49d949e](https://github.com/fabioaap/Adsmagic-prot-tipo/commit/49d949e))
* feat: adicionar deploy automático do Storybook Hub via GitHub Pages ([f4ab4f8](https://github.com/fabioaap/Adsmagic-prot-tipo/commit/f4ab4f8))
* feat: adicionar instruções detalhadas para o Programador Full Stack com foco em descoberta técnica c ([48bde75](https://github.com/fabioaap/Adsmagic-prot-tipo/commit/48bde75))
* feat: adicionar suporte ao addon-docs no Storybook para React e Vue, e atualizar a configuração de r ([7a57d9b](https://github.com/fabioaap/Adsmagic-prot-tipo/commit/7a57d9b))
* feat: adicionar tema Apple e tipografia SF Pro ao Storybook, incluindo melhorias na configuração de  ([296fa8b](https://github.com/fabioaap/Adsmagic-prot-tipo/commit/296fa8b))
* feat: enhance navigation with new projects section and dropdown functionality ([2a991fb](https://github.com/fabioaap/Adsmagic-prot-tipo/commit/2a991fb))
* feat: implementar estrategia de versionamento SemVer ([dbd3d38](https://github.com/fabioaap/Adsmagic-prot-tipo/commit/dbd3d38))
* feat: implementar tema Apple completo no Storybook, incluindo estilos para sidebar, corpo e preview ([138a3d3](https://github.com/fabioaap/Adsmagic-prot-tipo/commit/138a3d3))
* feat: remove Vue components documentation from Storybook, update ESLint config to ignore storybook-s ([633c787](https://github.com/fabioaap/Adsmagic-prot-tipo/commit/633c787))
* feat(docs): add migration references and tokens documentation for Storybook Hub ([c50c148](https://github.com/fabioaap/Adsmagic-prot-tipo/commit/c50c148))
* docs: update README for Adsmagic Platform Workspace evolution ([8a3da51](https://github.com/fabioaap/Adsmagic-prot-tipo/commit/8a3da51))
* Add contatos prototype page ([87bb164](https://github.com/fabioaap/Adsmagic-prot-tipo/commit/87bb164))
* Add conversion funnel card to overview ([2e8edd2](https://github.com/fabioaap/Adsmagic-prot-tipo/commit/2e8edd2))
* Add integrações page and update navigation ([4eb3b0a](https://github.com/fabioaap/Adsmagic-prot-tipo/commit/4eb3b0a))
* Add vendas and funil pages with working navigation ([cf7b7b0](https://github.com/fabioaap/Adsmagic-prot-tipo/commit/cf7b7b0))
* Add visão geral prototype page ([ea100dc](https://github.com/fabioaap/Adsmagic-prot-tipo/commit/ea100dc))
* Ajuste do card de funil ocupando todo o container da home ([740bece](https://github.com/fabioaap/Adsmagic-prot-tipo/commit/740bece))
* Align funil page with shared layout ([08b0017](https://github.com/fabioaap/Adsmagic-prot-tipo/commit/08b0017))
* Alterações feitas no funil da dash ([936e415](https://github.com/fabioaap/Adsmagic-prot-tipo/commit/936e415))
* Centralize sidebar navigation links ([e2290f3](https://github.com/fabioaap/Adsmagic-prot-tipo/commit/e2290f3))
* Create onboarding prototype with nav fixes ([9bc0047](https://github.com/fabioaap/Adsmagic-prot-tipo/commit/9bc0047))
* Create README.md ([1df194d](https://github.com/fabioaap/Adsmagic-prot-tipo/commit/1df194d))
* Document how to expose main to the agent ([8ffabd1](https://github.com/fabioaap/Adsmagic-prot-tipo/commit/8ffabd1))
* Ensure collapsed sidebar shows expand control ([815a75d](https://github.com/fabioaap/Adsmagic-prot-tipo/commit/815a75d))
* Ensure sidebar links trigger navigation ([84129bb](https://github.com/fabioaap/Adsmagic-prot-tipo/commit/84129bb))
* Fix layout to keep sidebar and header fixed ([cc408f4](https://github.com/fabioaap/Adsmagic-prot-tipo/commit/cc408f4))
* Mudanças necessárias para adicionar testes automatizados com Playwright. e para melhoria da Dashboar ([0a97819](https://github.com/fabioaap/Adsmagic-prot-tipo/commit/0a97819))
* Organize README page list by navigation groups ([6a5b539](https://github.com/fabioaap/Adsmagic-prot-tipo/commit/6a5b539))
* Redesign funil page to match prototype ([4997488](https://github.com/fabioaap/Adsmagic-prot-tipo/commit/4997488))
* Remove automação page and sidebar entry ([ff9cc07](https://github.com/fabioaap/Adsmagic-prot-tipo/commit/ff9cc07))
* Remove Meus projetos page from navigation ([f831d1d](https://github.com/fabioaap/Adsmagic-prot-tipo/commit/f831d1d))
* Remove redundant header menu trigger ([f220218](https://github.com/fabioaap/Adsmagic-prot-tipo/commit/f220218))
* Restore collapsed sidebar tooltips ([e886b94](https://github.com/fabioaap/Adsmagic-prot-tipo/commit/e886b94))
* Restore sidebar tooltips when collapsed ([6a6782f](https://github.com/fabioaap/Adsmagic-prot-tipo/commit/6a6782f))
* Restyle onboarding sidebar ([578dd3b](https://github.com/fabioaap/Adsmagic-prot-tipo/commit/578dd3b))
* Revamp vendas page to match prototype ([3afaff8](https://github.com/fabioaap/Adsmagic-prot-tipo/commit/3afaff8))
* Standardize status controls to filter button styling ([9e9a27c](https://github.com/fabioaap/Adsmagic-prot-tipo/commit/9e9a27c))
* Swap sidebar logo for provided artwork ([5b77964](https://github.com/fabioaap/Adsmagic-prot-tipo/commit/5b77964))
* Swap sidebar logo to official art ([5e2a145](https://github.com/fabioaap/Adsmagic-prot-tipo/commit/5e2a145))
* Switch dashboard icons to Lucide ([ed83022](https://github.com/fabioaap/Adsmagic-prot-tipo/commit/ed83022))
* chore: centralize shared styling assets ([25751b9](https://github.com/fabioaap/Adsmagic-prot-tipo/commit/25751b9))



# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Storybook Hub com documentação centralizada
- Componentes React e Vue migrados
- Design system tokens unificado
- CI/CD pipeline automatizado
- Publicação automática via GitHub Pages

### Changed
- Migração completa do protótipo HTML para React
- Estrutura monorepo com workspaces npm
- Build system unificado com Vite

### Fixed
- Problemas de build Vue com tsup
- Configurações de lint e testes
- Dependências entre pacotes

## [0.1.0] - 2025-10-29

### Added
- Estrutura inicial do monorepo
- Pacotes base: tokens, react-components, vue-components
- Storybook para documentação
- Dashboard React funcional
- Testes unitários e E2E
- CI/CD básico

### Changed
- Migração do protótipo estático para componentes modulares

### Fixed
- Configurações iniciais de build e dependências
