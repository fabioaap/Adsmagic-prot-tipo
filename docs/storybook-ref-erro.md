# Relatorio de Erro - Referencias React/Vue no Storybook Hub

## Contexto
- Data: 25/10/2025
- Ambiente: desenvolvimento local (Windows, Node 20, npm workspaces)
- Comando: `npm run dev:all` (sobe Storybook React porta 6008, Storybook Vue porta 7007 e Storybook Hub porta 6006)
- Sintoma: o Hub exibe `Error: Loading of ref failed` para as referencias React e Vue, acompanhado da mensagem `Oh no! Something went wrong loading this Storybook.`

## Evidencias coletadas
1. **Processos presos**
   - `netstat -ano` apontou PIDs 28324 (porta 6006), 19924 (6008) e 11012 (7007) ainda ativos mesmo apos encerrar o terminal.
   - `Stop-Process` foi aplicado e as portas passaram a aparecer apenas como `TIME_WAIT`. Depois disso o `npm run dev:all` subiu sem pedir porta alternativa.

2. **Dependencias alinhadas**
   - `apps/storybook-react/package.json` e `apps/storybook-vue/package.json` usam `storybook` e `@storybook/*-vite` na versao `^9.1.15`, mesma do Hub.
   - `npm install` rodou sem erros e o `package-lock.json` refletiu as versoes.

3. **Status HTTP**
   - `Invoke-WebRequest http://localhost:6008` e `http://localhost:7007` retornaram HTTP 200.
   - `index.json` retorna payload de stories. Contudo `metadata.json` e `storybook-internals.json` devolvem 404 nas instancias dev.
   - O Hub 9.1.15 busca `metadata.json` primeiro; ao receber 404, encerra a referencia com erro.

4. **Logs do Hub**
   - DevTools mostra `Request URL: http://localhost:6008/metadata.json` seguido de `404 Not Found`.
   - O erro vem de `fetchStorybookMetadata` (`lib/api/src/modules/refs.ts`).

## Hipoteses
1. **metadata.json indisponivel em modo dev**  
   A versao 9.1.x gera `metadata.json` apenas em builds estaticos. No dev server o arquivo nao existe, causando 404 e consequente erro no Hub.

2. **Race condition de inicializacao**  
   As refs sobem em paralelo. Se React/Vue demoram a iniciar, a primeira chamada falha e nao ha retry automatico para `index.json`.

3. **Configuracao do Hub sem fallback**  
   `apps/storybook-hub/.storybook/main.ts` apenas define `url`. Sem `disableRuntimeChecks` ou `type: 'auto-inject'`, o Hub nao tenta `index.json` apos o 404.

## Proximos experimentos sugeridos
1. **Validar comportamento upstream**  
   - Rodar `curl http://localhost:6008/metadata.json` apos boot completo.  
   - Consultar changelog da 9.1.x para confirmar se o dev server deveria expor esse arquivo.

2. **Forcar fallback via configuracao**  
   - Adicionar `disableRuntimeChecks: true` em cada ref no `main.ts` do Hub, forçando o carregamento mesmo sem `metadata.json`.
   - Alternativamente usar `type: 'auto-inject'`, permitindo que o Hub injete os assets do Storybook remoto.

3. **Servir build estatico**  
   - Rodar `npm run build --workspace @adsmagic/storybook-react` e servir com `npx http-server`.  
   - Apontar o Hub para o build estatico; se funcionar, confirma que o problema ocorre apenas no modo dev.

4. **Monitorar retries**  
   - Observar no DevTools se o Hub tenta `index.json` apos o 404 inicial. Em caso negativo, abrir issue upstream.

## Estado atual
- Docs MDX do Hub carregam corretamente.
- Referencias React/Vue falham devido ao 404 em `metadata.json`.
- `npm run dev:all` esta operacional depois de finalizar os PIDs residuais.

## Acao recomendada
- Ajustar `apps/storybook-hub/.storybook/main.ts` adicionando `disableRuntimeChecks: true` (ou `type: 'auto-inject'`) nas refs React/Vue enquanto investigamos uma solucao oficial para expor `metadata.json` no modo desenvolvimento.
