# 📊 Performance Monitoring & Error Tracking

Este documento descreve a implementação completa de monitoring de performance e error tracking no dashboard Adsmagic.

## 🚀 Funcionalidades Implementadas

### Web Vitals Tracking
- **CLS (Cumulative Layout Shift)**: Monitora mudanças de layout inesperadas
- **INP (Interaction to Next Paint)**: Mede responsividade às interações do usuário (substituiu FID)
- **FCP (First Contentful Paint)**: Tempo até o primeiro conteúdo ser renderizado
- **LCP (Largest Contentful Paint)**: Tempo até o maior elemento ser renderizado
- **TTFB (Time to First Byte)**: Tempo de resposta do servidor

### Error Tracking com Sentry
- Captura automática de erros não tratados (JavaScript errors)
- Monitoramento de promises rejeitadas não tratadas
- Session Replay para debugging visual
- Performance monitoring integrado
- Métricas customizadas para Web Vitals

### Alertas de Performance
- Alertas em tempo real para métricas críticas
- Classificação automática por severidade (warning/error/critical)
- Mensagens contextualizadas em português
- Interface visual integrada ao dashboard

## 🛠️ Configuração

### 1. Configurar Sentry

1. Crie uma conta no [Sentry.io](https://sentry.io)
2. Crie um novo projeto React
3. Copie o DSN fornecido
4. Configure as variáveis de ambiente:

```bash
cp .env.example .env
# Edite o .env com seu DSN do Sentry
```

### 2. Variáveis de Ambiente

```env
REACT_APP_SENTRY_DSN=https://your-dsn@sentry.io/project-id
REACT_APP_VERSION=1.0.0
NODE_ENV=production
```

### 3. Inicialização Automática

O Sentry é inicializado automaticamente no `App.tsx` com as seguintes configurações:

- **Sample Rate**: 10% em produção, 100% em desenvolvimento
- **Session Replay**: Ativado para debugging visual
- **Performance Monitoring**: Tracing automático de transações
- **Error Filtering**: Filtros para ambiente de desenvolvimento

## 📈 Métricas Monitoradas

### Core Web Vitals
| Métrica | Bom | Precisa Melhorar | Ruim |
|---------|-----|------------------|------|
| CLS | < 0.1 | 0.1 - 0.25 | > 0.25 |
| INP | < 200ms | 200-500ms | > 500ms |
| FCP | < 1800ms | 1800-3000ms | > 3000ms |
| LCP | < 2500ms | 2500-4000ms | > 4000ms |
| TTFB | < 800ms | 800-1800ms | > 1800ms |

### Métricas Customizadas
- Tempo de carregamento de componentes
- Performance de funções críticas
- Bundle size e chunks
- Compressão Gzip/Brotli

## 🔧 API de Uso

### Hooks Disponíveis

```typescript
import { useWebVitals, usePerformanceMonitoring, useRenderPerformance } from './hooks/usePerformanceMonitoring';

// Web Vitals básicos
useWebVitals((metric) => {
  console.log('Métrica recebida:', metric);
});

// Monitoring completo (Web Vitals + Error Tracking)
usePerformanceMonitoring();

// Performance de componentes específicos
useRenderPerformance('Dashboard');
```

### Funções Utilitárias

```typescript
import { measurePerformance, captureError, setUserContext } from './sentry';

// Medir performance de função
const result = await measurePerformance('api-call', async () => {
  return await api.getData();
});

// Capturar erro customizado
try {
  riskyOperation();
} catch (error) {
  captureError(error, { context: 'user-action' });
}

// Definir contexto do usuário
setUserContext({
  id: 'user-123',
  email: 'user@example.com'
});
```

## 🎯 Alertas e Thresholds

### Severidade dos Alertas

- **🟢 Bom**: Experiência excelente
- **🟡 Warning**: Métricas precisam de atenção
- **🔴 Error**: Impacto significativo na experiência
- **💥 Critical**: Problema crítico que requer ação imediata

### Triggers Automáticos

Os alertas são disparados automaticamente quando:
- CLS > 0.25 (mudanças visuais inesperadas)
- INP > 200ms (interações lentas)
- FCP > 3000ms (renderização muito lenta)
- LCP > 4000ms (conteúdo principal lento)
- TTFB > 800ms (servidor lento)

## 📊 Dashboard de Performance

O dashboard integrado mostra:

1. **Métricas em Tempo Real**: Valores atuais de todas as Web Vitals
2. **Histórico**: Gráfico de evolução das métricas
3. **Alertas Ativos**: Lista de problemas críticos
4. **Bundle Analysis**: Tamanho e compressão dos chunks
5. **Recomendações**: Sugestões de otimização

## 🔍 Debugging e Troubleshooting

### Verificar se o Sentry está funcionando

```javascript
// No console do navegador
window.Sentry.captureMessage('Test message');
```

### Verificar Web Vitals

```javascript
// As métricas aparecem automaticamente no console
// e são enviadas para o analytics configurado
```

### Debug Mode

Em desenvolvimento, todas as métricas são logadas no console com o prefixo:
- `📊` para métricas enviadas
- `⏱️` para tempos de carregamento
- `🚨` para erros capturados

## 🚀 Próximos Passos

### Melhorias Planejadas

1. **Real User Monitoring (RUM)**: Métricas de usuários reais
2. **Alertas por Email/Slack**: Notificações automáticas
3. **Dashboards Customizados**: Visualizações específicas por página
4. **A/B Testing**: Comparação de performance entre versões
5. **Performance Budgets**: Limites configuráveis por rota

### Integrações Futuras

- Google Analytics 4
- DataDog
- New Relic
- Custom analytics platforms

## � Real User Monitoring (RUM)

### Como Funciona
O RUM coleta dados de performance de usuários reais navegando na aplicação, fornecendo insights sobre:

- **Performance real**: Métricas coletadas de dispositivos e conexões reais
- **Comportamento do usuário**: Padrões de navegação e engajamento
- **Condições de rede**: Tipos de conexão (4G, 3G, WiFi) e qualidade
- **Dispositivos**: Tamanhos de tela, browsers e sistemas operacionais

### Configuração
```typescript
// Configuração padrão (10% dos usuários)
useRUM({
  sampleRate: 0.1,        // 10% dos usuários
  maxSessions: 1000,      // Máximo de sessões armazenadas
  maxMetricsPerSession: 50, // Máximo de métricas por sessão
  enableGeolocation: false, // Não coletar localização
});
```

### Dashboard RUM
Acesse `/rum` para visualizar:

- **Estatísticas gerais**: Sessões totais, duração média, páginas por sessão
- **Performance por métrica**: Média, P75 e P95 para cada Core Web Vital
- **Análise técnica**: Tipos de conexão e tamanhos de viewport mais comuns
- **Sessões recentes**: Lista das últimas sessões coletadas

### Sampling Strategy
- **10% dos usuários** são monitorados por padrão para balancear insights vs performance
- **Configurável** via `sampleRate` (0.0 a 1.0)
- **Rotativo** baseado em Math.random() para distribuição uniforme
- **Transparente** para usuários (não afeta experiência)

### Privacidade e Conformidade
- **Sem dados pessoais** identificáveis armazenados
- **LocalStorage** para armazenamento temporário
- **Anonimização** automática de dados sensíveis
- **LGPD compliant** - apenas métricas técnicas agregadas

### Exportação de Dados
```javascript
import { exportRUMData, clearRUMData } from './hooks/useRUM';

// Exportar dados para análise externa
exportRUMData();

// Limpar dados armazenados
clearRUMData();
```

## �📚 Referências

- [Web Vitals](https://web.dev/vitals/)
- [Sentry Documentation](https://docs.sentry.io/)
- [Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals)
- [Performance Monitoring Best Practices](https://web.dev/performance-monitoring/)
- [Real User Monitoring Guide](https://web.dev/user-centric-performance-metrics/)