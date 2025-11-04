# Instruções para usar os prompts no editor/agent

Este repositório contém um conjunto de arquivos de instruções para orientar o comportamento de agentes de inteligência artificial (como ChatGPT, Copilot, Cursor ou Claude Code). Eles são projetados para suportar um **Product Engineer** trabalhando em arquitetura full‑stack, design system em código, descoberta condicional, desenvolvimento de jogos e pesquisa assistida.

## Estrutura de arquivos

```
.prompts/
  instructions.md         # Prompt principal (system prompt) – ponto de entrada
  blocks/
    00_core.md            # Persona & regras básicas
    01_discovery.md       # Processo de discovery (OST/hypótese/métrica/flag)
    02_design_system.md   # Design System em código, tokens DTCG e Figma
    03_arch_clean.md      # Arquitetura limpa, testes, observabilidade e segurança
    04_games.md           # Diretrizes para desenvolvimento de jogos (web‑first)
    05_search_mode.md     # Modo de pesquisa quando faltar resposta
.cursorrules              # Regras globais do projeto (para Cursor/VS Code)
.vscode/settings.json     # Configurações de editor (ESLint, formatador, memória TS)
.github/PULL_REQUEST_TEMPLATE.md
.github/workflows/ci.yml
docs/adr/ADR-0000-template.md
README_PROMPTS.md        # Este documento
```

## Como usar com VS Code, Cursor ou agentes similares

1. **Prompt principal**: configure seu agente para ler `.prompts/instructions.md` como prompt de sistema ou instrução global do projeto. Ele apresenta a persona e indica quando consultar cada bloco.
2. **Blocos adicionais**: o agente deve carregar os arquivos em `.prompts/blocks/` dependendo da tarefa (via instrução ou referenciando manualmente). Por exemplo, ao trabalhar em um jogo, consulte `04_games.md`.
3. **.cursorrules**: para o Cursor, este arquivo define regras persistentes do workspace (ordem de resposta, onde encontrar tokens, quando ativar discovery, etc.). Cole-o na raiz do projeto.
4. **Configurações de editor**: copie `.vscode/settings.json` para configurar ESLint, formatação e memória TS. Ajuste conforme necessário.
5. **PR Template e CI**: use `.github/PULL_REQUEST_TEMPLATE.md` e `.github/workflows/ci.yml` para validar código, testes (incluindo visuais) e documentação no pipeline.
6. **ADRs**: registre decisões arquiteturais em `docs/adr/ADR-XXXX.md` usando o template fornecido.

## Observação
Estes arquivos são complementares ao código da aplicação. Eles não substituem o Design System ou o código de front/back, mas fornecem **contexto e guias** para que agentes e desenvolvedores sigam as melhores práticas definidas no projeto.