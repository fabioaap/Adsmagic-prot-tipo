# Relatorio de Erro — Referencias React/Vue no Storybook Hub

## Contexto

- Data: 25/10/2025
- Ambiente: desenvolvimento local (Windows, Node 20, npm workspaces)
- Comando utilizado: `npm run dev:all` (concurrently sobe `@adsmagic/storybook-react` porta 6008, `@adsmagic/storybook-vue` porta 7007 e `@adsmagic/storybook-hub` porta 6006).
- Sintoma visual: Storybook Hub carrega docs MDX, mas exibe mensagem “Error: Loading of ref failed … URL: http://localhost:6008” e “Oh no! Something went wrong loading this Storybook.” para as refs React/Vue.

## Evidencias coletadas

1. **Processos em conflito**  
   - `netstat -ano` indicou PIDs 28324 (porta 6006), 19924 (6008) e 11012 (7007) ainda ativos mesmo apos encerrar o terminal. Foram finalizados manualmente via `Stop-Process`.
   - Após o kill, `netstat` mostrou as portas em `TIME_WAIT`; `npm run dev:all` passou a subir sem prompts de porta alternativa.

2. **Versoes alinhadas**  
   - `apps/storybook-react/package.json` e `apps/storybook-vue/package.json` atualizados para `storybook` / `@storybook/*-vite` `^9.1.15`, igual ao hub.
   - `npm install` rodado; `package-lock.json` atualizado sem erros.

3. **Status HTTP**  
   - `Invoke-WebRequest http://localhost:6008` e `http://localhost:7007` retornaram `200`, confirmando que os servidores React/Vue respondem na raiz.
   - As rotas `index.json` retornam payload com stories (ex.: React).
   - `storybook-internals.json` e `metadata.json` retornam 404; esperado para 9.1.x se build dev nao expõe explicitamente (mas o Hub >=9.1.14 usa fetch a `/metadata.json`).

4. **Logs do Hub**  
   - Console do navegador: `Request URL: http://localhost:6008/metadata.json` → `404 Not Found`.
   - Mensagem no painel: `Error: Loading of ref failed at fetch (lib/api/src/modules/refs.ts)`.

## Hipoteses principais

1. **`metadata.json` não exposto no modo dev**  
   - A versão 9.1.15 do Storybook gera `metadata.json` apenas em build estatico (`storybook build`). No dev server, o arquivo pode não existir, levando a 404.
   - O Hub 9.1.15 tenta primeiro `metadata.json` e, ao falhar, deveria cair para `index.json`; porém, se o fetch retorna 404 sem tratar, a ref é marcada como erro.

2. **Race condition de inicializacao**  
   - O Hub sobe simultaneamente às refs. Se o React/Vue demorarem a iniciar, o primeiro fetch resulta em erro e o estado não é revalidado automaticamente.

3. **Config do Hub personalizada**  
   - `main.ts` do Hub aponta refs para `http://localhost:6008` e `http://localhost:7007` sem autenticação. Não há override para `fetchStorybookMetadata`. Se necessário, podemos adicionar `disableRuntimeChecks: true` ou `type: 'auto-inject'` para forçar fallback.

## Próximas investigacoes sugeridas

1. **Confirmar comportamento upstream**  
   - Rodar `curl http://localhost:6008/metadata.json` após o servidor estabilizar; se continuar 404, validar na documentação da 9.1.15 se o dev server deve expor esse endpoint.
   - Testar `NODE_ENV=production storybook dev` (se suportado) ou habilitar `--ci` para ver se gera metadata.

2. **Forçar fallback via configuracao**  
   - Inserir em `apps/storybook-hub/.storybook/main.ts` para cada ref:  
     ```ts
     react: { title: "React Components", url: "http://localhost:6008", disableRuntimeChecks: true }
     ```  
     ou usar `type: "auto-inject"` conforme docs, garantindo que o Hub aceite o `index.json`.

3. **Experimento com builds estáticos**  
   - Gerar build (`npm run build --workspace @adsmagic/storybook-react`) e servir via `http-server`. Validar se o Hub carrega quando aponta para o build estático (deve produzir `metadata.json`). Se sim, confirma que o problema é específico do dev server.

4. **Verificar fetch inicial vs. retry**  
   - Observar no DevTools se depois do 404 o Hub continua tentando `index.json`. Se não, abrir issue upstream.

## Estado atual

- Storybook Hub operacional nas docs MDX.
- Refs React/Vue falhando com 404 em `metadata.json`.
- `npm run dev:all` funcional; dependencias alinhadas.

## Seguinte passo recomendado

- Configurar fallback (`disableRuntimeChecks`) no Hub e/ou servir builds estáticos temporariamente para o time de produto enquanto investigamos se existe flag oficial para habilitar `metadata.json` no modo dev.
