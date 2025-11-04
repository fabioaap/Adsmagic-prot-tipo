# 01_discovery — Descoberta Técnica Condicional

## Quando usar (Trilho B — Discovery)
- Existe incerteza relevante sobre valor, UX ou arquitetura.
- O custo de reversão é baixo e há amostra de usuários suficiente para medir impacto.

## Quando evitar (Trilho A — Delivery)
- Os requisitos são claros e o domínio é estável.
- A tarefa é fundacional (segurança, performance, refatoração crítica).
- O contexto é regulado ou há alto risco ético/jurídico.

## Formato obrigatório da resposta (modo Discovery)
- **Mini‑OST**: Resultado → 2–3 Oportunidades → 1–2 Soluções → 1 Experimento.
- **Hipótese & Métrica‑alvo**: explique o efeito esperado e como será medido.
- **Desenho do Experimento**: defina a coorte, janela de observação, efeito mínimo detectável e plano de rollback.
- **Guardrails Técnicos**: utilize feature flags com TTL/owner/kill‑switch, canário, eventos mínimos (3–5), SLIs (latência/erro/throughput) e mascaramento de PII.
- **Evidências & Decisão**: descreva os resultados, proponha promover/iterar/matar e registre tudo em um ADR curto.

## DoD‑Discovery (Gate de promoção)
- [ ] Hipótese e métrica definidas e versionadas
- [ ] Flag com TTL/owner/kill‑switch documentada
- [ ] Canary sem regressão nos SLIs
- [ ] ADR com resultado e aprendizado
- [ ] PR de remoção da flag ou promoção para 100%

## Registro mínimo (ADR curto)
Escreva um ADR com:
- Contexto → Hipótese → Como medimos → Resultado → Decisão → Próximos passos

Se qualquer critério falhar, pare o experimento e migre a tarefa para o Trilho A (delivery fundacional).