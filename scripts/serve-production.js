#!/usr/bin/env node

/**
 * Servidor de Produção Integrado
 * Sirve todos os builds estáticos (Dashboard, Storybooks) de forma integrada
 *
 * Portas:
 * - 3000: Dashboard React (na raiz)
 * - 3001: Storybook Hub (documentação)
 * - 3002: Storybook React (componentes React)
 * - 3003: Storybook Vue (componentes Vue)
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;
const BASE_DIR = path.join(__dirname, '..');

// Mapa de rotas para seus respectivos diretórios
const ROUTES = {
    '/': path.join(BASE_DIR, 'apps/dashboard-react/dist'),
    '/docs': path.join(BASE_DIR, 'apps/storybook-hub/storybook-static'),
    '/storybook/react': path.join(BASE_DIR, 'apps/storybook-react/storybook-static'),
    '/storybook/vue': path.join(BASE_DIR, 'apps/storybook-vue/storybook-static'),
    '/legacy': path.join(BASE_DIR, 'apps/prototype-static'),
};

/**
 * Função para servir arquivo estático
 */
function serveFile(filePath, res) {
    if (!fs.existsSync(filePath)) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>');
        return;
    }

    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
        // Tenta servir index.html em diretórios
        const indexPath = path.join(filePath, 'index.html');
        if (fs.existsSync(indexPath)) {
            serveFile(indexPath, res);
        } else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 Not Found</h1>');
        }
        return;
    }

    // Determina o MIME type
    const ext = path.extname(filePath);
    const mimeTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.json': 'application/json',
        '.svg': 'image/svg+xml',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.ico': 'image/x-icon',
        '.woff': 'font/woff',
        '.woff2': 'font/woff2',
        '.ttf': 'font/ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.gz': 'application/gzip',
        '.br': 'application/x-br',
    };

    const contentType = mimeTypes[ext] || 'application/octet-stream';

    res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600',
        'Access-Control-Allow-Origin': '*',
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
}

/**
 * Handler do servidor
 */
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    let pathname = parsedUrl.pathname;

    // Remove trailing slash
    if (pathname !== '/' && pathname.endsWith('/')) {
        pathname = pathname.slice(0, -1);
    }

    console.log(`[${new Date().toISOString()}] ${req.method} ${pathname}`);

    // Encontra a rota correspondente
    let filePath = null;
    for (const [route, dir] of Object.entries(ROUTES)) {
        if (pathname === route || pathname.startsWith(route + '/')) {
            const relativePath = pathname === route ? '' : pathname.slice(route.length + 1);
            filePath = path.join(dir, relativePath);
            break;
        }
    }

    if (!filePath) {
        filePath = path.join(ROUTES['/'], pathname);
    }

    // Resolve e valida o caminho (previne directory traversal)
    filePath = path.resolve(filePath);
    if (!filePath.startsWith(path.resolve(BASE_DIR))) {
        res.writeHead(403, { 'Content-Type': 'text/html' });
        res.end('<h1>403 Forbidden</h1>');
        return;
    }

    serveFile(filePath, res);
});

server.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════════════════╗
║         🚀 SERVIDOR DE PRODUÇÃO INTEGRADO - ADSMAGIC              ║
╚════════════════════════════════════════════════════════════════════╝

📱 Dashboard React:
   → http://localhost:${PORT}/

📚 Storybook (Hub - Documentação):
   → http://localhost:${PORT}/docs

🎨 Storybook (Componentes React):
   → http://localhost:${PORT}/storybook/react

🟢 Storybook (Componentes Vue):
   → http://localhost:${PORT}/storybook/vue

📄 Protótipo Legado:
   → http://localhost:${PORT}/legacy

════════════════════════════════════════════════════════════════════

✅ Servidor rodando na porta ${PORT}
✅ Pressione Ctrl+C para parar

════════════════════════════════════════════════════════════════════
  `);
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Porta ${PORT} já está em uso!`);
        process.exit(1);
    }
    console.error('Erro no servidor:', err);
    process.exit(1);
});

process.on('SIGTERM', () => {
    console.log('\n⛔ Servidor interrompido (SIGTERM)');
    server.close();
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('\n⛔ Servidor interrompido (SIGINT)');
    server.close();
    process.exit(0);
});
