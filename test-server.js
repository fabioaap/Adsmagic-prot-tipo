const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 8000;

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  let filePath;

  // Map URL paths to HTML files
  if (req.url === '/' || req.url === '/index.html') {
    filePath = path.join(__dirname, 'apps', 'prototype-static', 'index.html');
  } else if (req.url === '/vendas.html') {
    filePath = path.join(__dirname, 'apps', 'prototype-static', 'vendas.html');
  } else if (req.url === '/contatos.html') {
    filePath = path.join(__dirname, 'apps', 'prototype-static', 'contatos.html');
  } else if (req.url === '/funil.html') {
    filePath = path.join(__dirname, 'apps', 'prototype-static', 'funil.html');
  } else if (req.url === '/configuracoes.html') {
    filePath = path.join(__dirname, 'apps', 'prototype-static', 'configuracoes.html');
  } else if (req.url === '/eventos.html') {
    filePath = path.join(__dirname, 'apps', 'prototype-static', 'eventos.html');
  } else if (req.url === '/integracoes.html') {
    filePath = path.join(__dirname, 'apps', 'prototype-static', 'integracoes.html');
  } else if (req.url === '/links.html') {
    filePath = path.join(__dirname, 'apps', 'prototype-static', 'links.html');
  } else if (req.url === '/mensagens.html') {
    filePath = path.join(__dirname, 'apps', 'prototype-static', 'mensagens.html');
  } else if (req.url === '/relatorios.html') {
    filePath = path.join(__dirname, 'apps', 'prototype-static', 'relatorios.html');
  } else if (req.url === '/suporte.html') {
    filePath = path.join(__dirname, 'apps', 'prototype-static', 'suporte.html');
  } else if (req.url.startsWith('/assets/')) {
    // Handle assets
    filePath = path.join(__dirname, 'apps', 'prototype-static', req.url);
  } else {
    // Default to index.html for any other route
    filePath = path.join(__dirname, 'apps', 'prototype-static', 'index.html');
  }

  const extname = path.extname(filePath) || '.html';
  const mimeType = mimeTypes[extname] || 'text/html';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        res.writeHead(404);
        res.end('File not found');
      } else {
        res.writeHead(500);
        res.end('Error: ' + error.code);
      }
    } else {
      res.writeHead(200, { 'Content-Type': mimeType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(port, () => {
  console.log(`Test server running at http://localhost:${port}/`);
});
