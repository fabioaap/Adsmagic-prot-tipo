# 01_discovery — Descoberta Técnica Condicional (Adsmagic)

## Quando usar (Trilho B — Discovery)
- Existe incerteza relevante sobre valor, UX ou arquitetura.
- O custo de reversão é baixo e há amostra de usuários suficiente para medir impacto.
- Exemplos: novas interações no dashboard, otimizações de performance, experimentos de layout.

## Quando evitar (Trilho A — Delivery)
- Os requisitos são claros e o domínio é estável.
- A tarefa é fundacional (segurança, performance, refatoração crítica).
- O contexto é regulado ou há alto risco ético/jurídico.
- Exemplos: correção de bugs críticos, implementação de componentes básicos, testes visuais.

## Formato obrigatório da resposta (modo Discovery)
- **Mini‑OST**: Resultado → 2–3 Oportunidades → 1–2 Soluções → 1 Experimento.
- **Hipótese & Métrica‑alvo**: explique o efeito esperado e como será medido.
- **Desenho do Experimento**: defina a coorte, janela de observação, efeito mínimo detectável e plano de rollback.
- **Guardrails Técnicos**: utilize feature flags com TTL/owner/kill‑switch, canário, eventos mínimos (3–5), SLIs (latência/erro/throughput) e mascaramento de PII.
- **Evidências & Decisão**: descreva os resultados, proponha promover/iterar/matar e registre tudo em um ADR curto.

## Exemplo aplicado ao Adsmagic
**Contexto:** Testar se um novo layout de cards aumenta conversão no dashboard.

**Mini-OST:**
- **Resultado:** Aumentar taxa de cliques nos cards em 15%
- **Oportunidades:**
  1. Layout atual não destaca CTAs
  2. Usuários não percebem ações secundárias
- **Solução:** Redesenhar cards com CTA primário mais destacado
- **Experimento:** A/B test com 50% dos usuários por 2 semanas

**Hipótese:** "Se destacarmos o CTA primário com cor de destaque, esperamos 15% mais cliques"

**Métrica-alvo:** `card_click_rate` (taxa de cliques / visualizações)

**Feature Flag:**
```typescript
{
  key: 'new-card-layout',
  ttl: '2025-12-01',
  owner: 'equipe-design',
  rollout: 50, // 50% dos usuários
  killSwitch: true
}
```

**SLIs monitorados:**
- Latência do dashboard < 200ms
- Taxa de erro < 0.1%
- Throughput estável

## DoD‑Discovery (Gate de promoção)
- [ ] Hipótese e métrica definidas e versionadas
- [ ] Flag com TTL/owner/kill‑switch documentada
- [ ] Canary sem regressão nos SLIs
- [ ] ADR com resultado e aprendizado (em `docs/adr/`)
- [ ] PR de remoção da flag ou promoção para 100%

## Registro mínimo (ADR curto)
Escreva um ADR em `docs/adr/ADR-XXXX-nome-experimento.md` com:
- **Contexto** → Qual problema/oportunidade
- **Hipótese** → O que esperamos mudar
- **Como medimos** → Métricas e instrumentação
- **Resultado** → Dados coletados
- **Decisão** → Promover/iterar/matar
- **Próximos passos** → Ações de follow-up

Se qualquer critério falhar, pare o experimento e migre a tarefa para o Trilho A (delivery fundacional).

## Integração com Adsmagic
- Use componentes do Design System para variações do experimento
- Instrumente eventos via `apps/dashboard-react/src/services/analytics`
- Monitore métricas no dashboard de observabilidade
- Documente flags em `docs/feature-flags.md` (criar se não existir)
