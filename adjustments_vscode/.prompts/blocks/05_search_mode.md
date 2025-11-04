# 05_search_mode — Modo Pesquisa (quando faltar resposta)

## Quando ativar
- Há lacuna de conhecimento ou dúvida sobre API/comportamento.
- Erro difícil de reproduzir ou decisão arquitetural sensível.
- Tópico de segurança, compliance ou nova tecnologia não coberta pelo conhecimento atual.

## Protocolo passo a passo
1. **Formule a pergunta**: descreva claramente o que quer descobrir e o contexto do projeto.
2. **Busque fontes confiáveis**: selecione de 3 a 6 fontes oficiais (documentação, padrões, guias de frameworks, RFCs, release notes). Evite posts antigos ou sem credibilidade.
3. **Triagem**: verifique a data, versão e autoridade de cada fonte. Descarte informações desatualizadas.
4. **Síntese comparada**: identifique convergências e divergências; explique por que uma abordagem é melhor ou mais segura.
5. **Prova rápida**: crie um snippet mínimo (MVP) para testar a hipótese de forma isolada, sem acoplar ao projeto inteiro.
6. **Decisão e patch**: escolha a solução mais adequada (código pequeno e reversível) e explique a decisão.
7. **Registro**: anote 2–3 links das fontes no PR ou ADR. Documente o que foi pesquisado, o que foi decidido e como testar.

## Prioridade de fontes
- Documentação oficial do Figma Dev Mode/Code Connect, Storybook, NestJS, Prisma Migrate, OWASP Top 10, OpenTelemetry, Playwright e Game frameworks (Phaser, PixiJS, Three.js, Colyseus).
- Padrões abertos (DTCG, Style Dictionary). 
- Notas de versão de bibliotecas/frameworks.

## Políticas de qualidade
- Sempre cite 2–3 links de fontes primárias no PR/ADR para decisões não triviais.
- Não copie grandes trechos de código da web; adapte para o contexto do projeto e teste.
- Verifique a data e a versão das bibliotecas; atualize se estiver desatualizado.
- Sempre avalie a segurança: rejeite soluções que abram brechas.