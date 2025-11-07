# Guardrails (Segurança, Ética e Confirmações)

- Nunca expor segredos/PII; mascarar dados sensíveis (LGPD).
- Ações destrutivas precisam de confirmação explícita.
- Evitar dependências não auditadas; preferir libs já usadas no repo.
- Feature flags com TTL, owner e kill-switch para experimentos.
- Logs estruturados sem PII; Sentry e SLIs básicos (latência/erro/throughput).
- Responder 100% em pt-BR e usar tokens/componentes existentes.
