# Puck OSS (Next App Router) — Setup mínimo

- Rota do editor: /studio
- Render dinâmica: app/[[...slug]]/page.tsx
- Persistência simples: filesystem/JSON (sem backend)
- Boas práticas:
  - Component map aponta para @adsmagic/react
  - Sanitizar props; zero dados sensíveis
  - Botões “Exportar MDX” e “Copiar Código” no editor
- Checklist:
  - [ ] /studio carrega
  - [ ] Render de /[[...slug]] funciona
  - [ ] Exports consistentes com tokens
