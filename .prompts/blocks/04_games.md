# 04_games — Product Game Engineer (Web‑first) - Futuro do Adsmagic

> **Nota:** Este bloco é para referência futura caso o Adsmagic evolua para incluir elementos de gamificação ou jogos educacionais.

## Metas de produto para jogos
- Antes de implementar, defina hipóteses de diversão/retenção (ex.: *Time‑to‑Fun*, D1/D7) e instrumente eventos para medi‑las.

## Motores e Renderização
- **2D**: utilize **Phaser** (motor completo com física, cenas e câmeras) ou **PixiJS** (renderer 2D acelerado) dependendo da complexidade.
- **3D**: use **Three.js** (WebGL) para renderização. Planeje portabilidade para **WebGPU** quando a plataforma estiver madura e disponível.

## Entrada, Áudio e XR
- **Entrada**: suporte a teclado, mouse e **Gamepad API** (mapeie botões e forneça remapeamento).
- **Áudio**: utilize a **Web Audio API** para mixagem, efeitos e espacialização.
- **XR**: considere **WebXR** para experiências de realidade virtual ou aumentada (futuramente).

## Multiplayer
- Para jogos online autoritativos em Node.js, use **Colyseus** (salas, sincronização de estado e matchmaking). Considere WebRTC/Data Channels para latência baixa em jogos P2P controlados.

## Gamificação no Dashboard Adsmagic

### Possíveis aplicações
1. **Achievements/Badges** — Conquistas por metas atingidas
2. **Leaderboards** — Rankings de performance
3. **Progress Bars** — Visualização de progresso em funis
4. **Interactive Charts** — Gráficos interativos com feedback visual
5. **Onboarding Gamificado** — Tutorial interativo

### Implementação com Design System
```typescript
// Usar componentes existentes
import { Badge, Card, SummaryCard } from '@adsmagic/react-components';

const AchievementBadge = ({ title, progress, unlocked }) => (
  <Card variant={unlocked ? 'primary' : 'secondary'}>
    <Badge variant={unlocked ? 'success' : 'default'}>
      {progress}%
    </Badge>
    <h3>{title}</h3>
  </Card>
);
```

## Acessibilidade em jogos
- Siga as **Game Accessibility Guidelines** e as **Xbox Accessibility Guidelines**: contraste alto, interfaces escaláveis, remapeamento de controles, modos daltônicos e assistência de input.

## Testes e Performance
- **Unitários**: cobrem regras e mecânicas determinísticas (ECS, física).
- **E2E/Visuais**: use **Playwright** para validar HUD/menus e fluxos com snapshots tolerantes.
- **Frame budget**: meta de 60 FPS. Audite draw calls, tamanhos de texturas/atlas e alocação de memória.
- HUD e menus devem ser implementados como componentes do Design System, usando tokens.

## Portabilidade
- Construa primeiro para web. Para outras plataformas, avalie portabilidade com **Unity WebGL** ou **Godot HTML5/WASM**, mantendo pipelines de assets separados.

## Processo sugerido
1. Definir hipótese de diversão/retenção e eventos de telemetria.
2. Modelar mecânica e entidades no domínio, preferencialmente usando arquitetura ECS (Entity‑Component‑System).
3. Conectar o domínio a um renderer (Phaser, PixiJS ou Three.js) e implementar HUD/menus com componentes do DS.
4. Instrumentar eventos, logs e métricas; garantir acessibilidade.
5. Testar no navegador (protótipo jogável); ajustar performance.
6. Registrar em ADR curto (decisões, trade‑offs) e documentar no Storybook.

## Recursos
- [Phaser Framework](https://phaser.io/)
- [PixiJS](https://pixijs.com/)
- [Three.js](https://threejs.org/)
- [Colyseus](https://colyseus.io/)
- [Game Accessibility Guidelines](https://gameaccessibilityguidelines.com/)
