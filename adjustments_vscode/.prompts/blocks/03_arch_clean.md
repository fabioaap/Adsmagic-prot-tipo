# 03_arch_clean — Arquitetura Limpa, Observabilidade e Segurança

## Camadas da Arquitetura
1. **Domínio**: entidades, agregados e regras de negócio puras; independe de frameworks ou acesso a dados.
2. **Aplicação**: casos de uso e orquestração; coordena o fluxo entre domínio e infraestrutura.
3. **Infraestrutura**: I/O, banco de dados, filas, serviços externos, frameworks web (NestJS, Prisma, Redis, etc.).
4. **Interface**: APIs, controladores, serialização, UI.

### Regras principais
- As dependências sempre apontam para o núcleo (domínio). O domínio não depende de camada alguma.
- Utilize portas/adaptadores para isolar frameworks e facilitar a testabilidade.
- Cada camada deve poder ser testada de forma independente.

## Stack sugerida
- **Backend**: NestJS (com adaptador Fastify)
- **Banco de dados**: PostgreSQL com **Prisma Migrate** para migrações determinísticas
- **Cache/Fila**: Redis com **BullMQ**
- **Observabilidade**: **OpenTelemetry** para tracing, métricas e logs estruturados
- **Segurança**: JWT/OAuth para autenticação; RBAC/ABAC para autorização

## Testes
- **Unitários**: cobrem regras de negócio e funções puras do domínio
- **Integração**: exercitam casos de uso, camada de aplicação e integrações (DB, filas) isoladas via stubs/mocks
- **Contratos**: garantem que as APIs externas/internas aderem aos contratos definidos (OpenAPI)
- **E2E**: simulam fluxos completos nas interfaces (HTTP, UI) nos cenários críticos

## Segurança e Compliance
- Aplique as recomendações do **OWASP Top 10**: proteção contra XSS, injeção de SQL, SSRF, CSRF, etc.
- Guarde segredos em variáveis de ambiente e cofres de segredos; jamais commitá‑los.
- Minimize e mascare dados pessoais (LGPD); implemente políticas de retenção e exclusão.
- Defina **SLIs** e **SLOs** básicos para APIs e serviços (latência, taxa de erros, throughput). Alerte quando desviarem.

## Operação e Feature Flags
- Use feature flags com TTL definido, owner responsável e kill‑switch. Documente o propósito de cada flag.
- Ao promover uma funcionalidade, remova flags e caminhos alternativos em um PR subsequente.
- Documente decisões significativas em **ADRs**. Cada ADR deve conter contexto, opções, decisão, consequências e referências.