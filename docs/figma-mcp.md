# Configuração do MCP do Figma

Este guia explica como conectar o projeto aos recursos do Figma utilizando o **Model Context Protocol (MCP)**. O objetivo é permitir que agentes MCP (como o Claude Desktop ou servidores compatíveis) consultem frames, páginas e arquivos do Figma diretamente nas conversas, mantendo os tokens sensíveis fora do repositório.

## Pré-requisitos

1. **Conta Figma com permissão de leitura nos arquivos desejados.**
2. **Token de acesso pessoal (PAT) do Figma** – gere em [https://www.figma.com/developers/api#access-tokens](https://www.figma.com/developers/api#access-tokens). Anote o token apenas localmente.
3. **ID do arquivo ou equipe** que você deseja expor via MCP. O ID aparece na URL do Figma (`https://www.figma.com/file/<FILE_ID>/...`).
4. Ambiente com suporte a MCP (por exemplo, [Claude Desktop](https://www.anthropic.com/claude) ou o pacote `mcp` via `npm`).

## Estrutura sugerida

Adicione ao projeto a pasta `.mcp/` contendo os manifestos dos servidores MCP que você quer usar. Para o Figma, crie um arquivo `figma.json` com a configuração básica:

```json
{
  "name": "figma",
  "description": "Acesso somente leitura aos arquivos do Figma do projeto",
  "server": {
    "type": "python",
    "command": "figma-mcp-server",
    "args": []
  },
  "env": {
    "FIGMA_TOKEN": "${FIGMA_TOKEN}",
    "FIGMA_FILE_IDS": "${FIGMA_FILE_IDS}"
  }
}
```

- `FIGMA_TOKEN`: referencie uma variável de ambiente local. Nunca comite o token.
- `FIGMA_FILE_IDS`: lista de IDs separados por vírgula (`FILE_ID1,FILE_ID2`).

> Caso utilize o pacote oficial `@modelcontextprotocol/figma`, ajuste `command` para `npx` ou para o caminho do executável conforme a instalação.

## Instalação do servidor Figma MCP

1. Instale o servidor localmente (fora do repositório) com `npm`:
   ```bash
   npm install -g @modelcontextprotocol/figma
   ```
   ou via `pnpm` / `yarn` se preferir. Também é possível instalar em um ambiente virtual Python caso esteja usando uma implementação em Python.
2. Defina as variáveis de ambiente antes de iniciar o cliente MCP:
   ```bash
   export FIGMA_TOKEN="seu_token_figma"
   export FIGMA_FILE_IDS="FILE_ID1,FILE_ID2"
   ```
3. Execute o cliente MCP (ex.: `claude-desktop` ou `npx mcp`). Ele lerá a pasta `.mcp` e iniciará o servidor Figma automaticamente.

### Limitações no Codex Cloud

- O ambiente do Codex Cloud não permite manter processos MCP executando em plano de fundo nem armazenar os segredos necessários.
- Portanto, use-o apenas para editar manifestos e documentação. A execução real do servidor Figma MCP precisa ocorrer em uma máquina local (ou em outro ambiente com suporte a MCP), onde você possa instalar dependências e definir variáveis de ambiente com segurança.

> Se você testar um comando MCP aqui, receberá erros de dependência ou falta de credenciais. Copie o manifesto para o seu ambiente local, configure as variáveis e execute o fluxo a partir de lá.

## Organização no repositório

- **Pasta `.mcp/`**: mantenha apenas manifestos sem segredos. Tokens e IDs sensíveis ficam em variáveis de ambiente locais ou em um gerenciador de segredos.
- **Documentação**: referencie este guia no `README.md` para a equipe saber como habilitar o MCP.
- **Git ignore**: se optar por armazenar configurações adicionais ou caches locais, inclua-os no `.gitignore`.

## Próximos passos

1. Criar a pasta `.mcp/` no projeto com o manifesto `figma.json` (modelo acima).
2. Alinhar com a equipe os arquivos do Figma que ficarão acessíveis e manter a lista `FIGMA_FILE_IDS` atualizada.
3. Validar o acesso em um cliente MCP e documentar fluxos de uso (consultar páginas, buscar nodos por nome, etc.).

## Como gerar HTML e CSS de um frame durante uma conversa

Quando alguém enviar o link direto de um frame do Figma no chat (por exemplo, dentro do Claude Desktop usando MCP), siga esta sequência:

1. **Extrair o `fileId` e o `nodeId` do link.** No endereço `https://www.figma.com/file/<FILE_ID>/<NOME>?type=design&node-id=<NODE_ID>...`, copie os trechos `FILE_ID` e `NODE_ID`.
2. **Confirme que o `FILE_ID` está listado na variável `FIGMA_FILE_IDS`.** Caso não esteja, adicione-o e reinicie o cliente MCP para que o servidor do Figma recarregue as permissões.
3. **Peça explicitamente ao agente para usar a ferramenta do MCP.** No chat, envie algo como: "Use o servidor `figma` e rode a ferramenta `export-frame-html` com `fileId=<FILE_ID>` e `nodeId=<NODE_ID>`". Os clientes compatíveis (como `npx mcp` ou Claude Desktop) exibirão um botão/atalho para executar a ferramenta.
4. **Aguarde o retorno.** O servidor MCP do Figma primeiro buscará o JSON do frame via API oficial e, em seguida, converte os layers reconhecidos em HTML e CSS utilitários. O resultado costuma trazer:
   - Um bloco `<style>` com as classes geradas;
   - O trecho de `<body>` correspondente ao frame;
   - Observações sobre camadas que não puderam ser traduzidas automaticamente.
5. **Faça ajustes manuais conforme necessário.** A transformação é uma aproximação e geralmente requer refinamento manual para responsividade, fontes customizadas e estados interativos.

> Dica: se estiver operando pelo CLI `npx mcp`, o comando equivalente fica `npx mcp call figma export-frame-html --file-id <FILE_ID> --node-id <NODE_ID>`. Copie e cole o link original no histórico para manter o contexto da conversa.

Com isso, o projeto fica preparado para consumir dados do Figma via MCP de forma segura e reproduzível.
