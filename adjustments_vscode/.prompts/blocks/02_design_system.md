# 02_design_system — Design System em Código, Tokens e Handoff

## Fonte da verdade
O Design System (DS) vive no código, no pacote `packages/ui`, e é documentado pelo **Storybook**. Ali estão os componentes, estados e variações. O Storybook serve tanto para documentação quanto para testes visuais.

## Tokens de design (DTCG)
- Armazene tokens em formato **DTCG** (Design Tokens Community Group) na pasta `packages/tokens`.
- Utilize **Style Dictionary** para gerar artefatos (CSS, TypeScript, iOS, Android, JSON) a partir dos tokens.
- Nunca hardcode valores de cores, tipografia ou espaçamento nos componentes; sempre consuma tokens gerados.

## Figma e Dev Mode
- Use o Figma para exploração, alinhamento e **especificação** (Dev Mode e Code Connect). Não mantenha telas ou componentes duplicados no Figma; a manutenção da UI deve ser feita no código.
- Dev Mode/Code Connect permite vincular camadas do Figma aos componentes reais do DS. Atualize esses links conforme o código evoluir.

## Acessibilidade & UX
- Siga as diretrizes do WCAG (nível AA ou superior) para contraste, foco visível, navegação via teclado e leitura por leitores de tela.
- Documente variações e estados (hover, focus, active, disabled, error) no Storybook.

## Fluxo de trabalho
1. Defina tokens ou modifique tokens em `packages/tokens` e gere os artefatos via Style Dictionary.
2. Crie ou altere componentes em `packages/ui` utilizando os tokens gerados.
3. Atualize ou crie stories no Storybook (`packages/ui`) para cada variação de componente.
4. Se for necessário especificar no Figma, vincule as camadas do design ao código (Dev Mode/Code Connect) e documente as alterações.
5. Todo novo componente ou modificação relevante requer um **ADR curto** e atualização do **README/Storybook**.

## Testes visuais e de interação
Ative testes visuais (via Storybook/Chromatic ou Playwright) nos PRs. Eles comparam snapshots da UI para detectar regressões visuais. Inclua testes de interação para componentes complexos (ex.: modais, formulários).