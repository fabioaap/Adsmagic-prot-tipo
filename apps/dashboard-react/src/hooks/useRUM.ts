import { useEffect, useState } from 'react';
import { PerformanceMetric } from './usePerformanceMonitoring';

export interface RUMSession {
  sessionId: string;
  userId?: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  pageViews: PageView[];
  metrics: PerformanceMetric[];
  userAgent: string;
  viewport: {
    width: number;
    height: number;
  };
  connection: {
    effectiveType?: string;
    downlink?: number;
    rtt?: number;
  };
  geolocation?: {
    country?: string;
    region?: string;
    city?: string;
  };
}

export interface PageView {
  url: string;
  timestamp: number;
  timeOnPage?: number;
  referrer?: string;
}

export interface RUMConfig {
  sampleRate: number; // 0-1 (porcentagem de usuários a monitorar)
  maxSessions: number; // máximo de sessões armazenadas
  maxMetricsPerSession: number; // máximo de métricas por sessão
  enableGeolocation: boolean;
  storageKey: string;
}

// Configuração padrão do RUM
const DEFAULT_RUM_CONFIG: RUMConfig = {
  sampleRate: 0.1, // 10% dos usuários
  maxSessions: 1000,
  maxMetricsPerSession: 50,
  enableGeolocation: false,
  storageKey: 'adsmagic_rum_sessions',
};

// Hook para Real User Monitoring
export const useRUM = (config: Partial<RUMConfig> = {}) => {
  const [currentSession, setCurrentSession] = useState<RUMSession | null>(null);
  const [isSamplingEnabled, setIsSamplingEnabled] = useState(false);

  const rumConfig = { ...DEFAULT_RUM_CONFIG, ...config };

  // Verificar se o usuário deve ser monitorado (sampling)
  useEffect(() => {
    const shouldSample = Math.random() < rumConfig.sampleRate;
    setIsSamplingEnabled(shouldSample);

    if (shouldSample) {
      initializeSession();
    }
  }, [rumConfig.sampleRate]);

  // Inicializar nova sessão
  const initializeSession = () => {
    const sessionId = generateSessionId();
    const connection = getConnectionInfo();

    const session: RUMSession = {
      sessionId,
      startTime: Date.now(),
      pageViews: [{
        url: window.location.href,
        timestamp: Date.now(),
        referrer: document.referrer,
      }],
      metrics: [],
      userAgent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      connection,
    };

    setCurrentSession(session);

    // Salvar sessão no localStorage
    saveSession(session);

    console.log('📊 RUM: Nova sessão iniciada', sessionId);
  };

  // Registrar visualização de página
  const trackPageView = (url: string, referrer?: string) => {
    if (!currentSession || !isSamplingEnabled) return;

    const pageView: PageView = {
      url,
      timestamp: Date.now(),
      referrer,
    };

    setCurrentSession(prev => {
      if (!prev) return prev;

      const updatedSession = {
        ...prev,
        pageViews: [...prev.pageViews, pageView],
      };

      saveSession(updatedSession);
      return updatedSession;
    });

    console.log('📊 RUM: Page view tracked', url);
  };

  // Registrar métrica de performance
  const trackMetric = (metric: PerformanceMetric) => {
    if (!currentSession || !isSamplingEnabled) return;

    setCurrentSession(prev => {
      if (!prev) return prev;

      // Limitar número de métricas por sessão
      const metrics = [...prev.metrics, metric].slice(-rumConfig.maxMetricsPerSession);

      const updatedSession = {
        ...prev,
        metrics,
      };

      saveSession(updatedSession);
      return updatedSession;
    });
  };

  // Finalizar sessão
  const endSession = () => {
    if (!currentSession || !isSamplingEnabled) return;

    const endTime = Date.now();
    const duration = endTime - currentSession.startTime;

    const finalSession: RUMSession = {
      ...currentSession,
      endTime,
      duration,
    };

    setCurrentSession(finalSession);
    saveSession(finalSession);

    console.log('📊 RUM: Sessão finalizada', {
      sessionId: currentSession.sessionId,
      duration: `${duration}ms`,
      pageViews: currentSession.pageViews.length,
      metrics: currentSession.metrics.length,
    });
  };

  // Salvar sessão no localStorage
  const saveSession = (session: RUMSession) => {
    try {
      const existingSessions = getStoredSessions();
      const updatedSessions = [...existingSessions, session]
        .sort((a, b) => b.startTime - a.startTime) // Mais recentes primeiro
        .slice(0, rumConfig.maxSessions); // Limitar número de sessões

      localStorage.setItem(rumConfig.storageKey, JSON.stringify(updatedSessions));
    } catch (error) {
      console.warn('📊 RUM: Erro ao salvar sessão', error);
    }
  };

  // Obter informações de conexão
  const getConnectionInfo = () => {
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;

    return {
      effectiveType: connection?.effectiveType,
      downlink: connection?.downlink,
      rtt: connection?.rtt,
    };
  };

  // Gerar ID único para sessão
  const generateSessionId = () => {
    return `rum_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  // Monitorar mudanças de página (SPA)
  useEffect(() => {
    if (!isSamplingEnabled) return;

    const handleLocationChange = () => {
      trackPageView(window.location.href, currentSession?.pageViews[currentSession.pageViews.length - 1]?.url);
    };

    // Para SPAs, monitorar mudanças de URL
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function(...args) {
      originalPushState.apply(this, args);
      setTimeout(handleLocationChange, 0);
    };

    history.replaceState = function(...args) {
      originalReplaceState.apply(this, args);
      setTimeout(handleLocationChange, 0);
    };

    window.addEventListener('popstate', handleLocationChange);

    return () => {
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, [isSamplingEnabled, currentSession]);

  // Monitorar fechamento da página
  useEffect(() => {
    if (!isSamplingEnabled) return;

    const handleBeforeUnload = () => {
      endSession();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        endSession();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isSamplingEnabled]);

  return {
    currentSession,
    isSamplingEnabled,
    trackPageView,
    trackMetric,
    endSession,
  };
};

// Funções utilitárias para análise de dados RUM

// Obter todas as sessões armazenadas
export const getStoredSessions = (storageKey: string = DEFAULT_RUM_CONFIG.storageKey): RUMSession[] => {
  try {
    const stored = localStorage.getItem(storageKey);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.warn('📊 RUM: Erro ao carregar sessões', error);
    return [];
  }
};

// Limpar dados RUM armazenados
export const clearRUMData = (storageKey: string = DEFAULT_RUM_CONFIG.storageKey) => {
  localStorage.removeItem(storageKey);
  console.log('📊 RUM: Dados limpos');
};

// Exportar dados RUM para análise
export const exportRUMData = (storageKey: string = DEFAULT_RUM_CONFIG.storageKey) => {
  const sessions = getStoredSessions(storageKey);
  const dataStr = JSON.stringify(sessions, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });

  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `rum-data-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  console.log('📊 RUM: Dados exportados', sessions.length, 'sessões');
};

// Análise básica dos dados RUM
export const analyzeRUMData = (sessions: RUMSession[]) => {
  if (sessions.length === 0) return null;

  const totalSessions = sessions.length;
  const completedSessions = sessions.filter(s => s.endTime).length;

  // Análise de performance
  const allMetrics = sessions.flatMap(s => s.metrics);
  const metricsByName = allMetrics.reduce((acc, metric) => {
    if (!acc[metric.name]) {
      acc[metric.name] = [];
    }
    acc[metric.name].push(metric.value);
    return acc;
  }, {} as Record<string, number[]>);

  const performanceSummary = Object.entries(metricsByName).map(([name, values]) => ({
    metric: name,
    count: values.length,
    average: values.reduce((a, b) => a + b, 0) / values.length,
    p75: values.sort((a, b) => a - b)[Math.floor(values.length * 0.75)],
    p95: values.sort((a, b) => a - b)[Math.floor(values.length * 0.95)],
  }));

  // Análise de engajamento
  const avgSessionDuration = sessions
    .filter(s => s.duration)
    .reduce((acc, s) => acc + (s.duration || 0), 0) / completedSessions;

  const avgPageViews = sessions.reduce((acc, s) => acc + s.pageViews.length, 0) / totalSessions;

  // Análise técnica
  const connectionTypes = sessions.reduce((acc, s) => {
    const type = s.connection.effectiveType || 'unknown';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const viewportSizes = sessions.reduce((acc, s) => {
    const size = `${s.viewport.width}x${s.viewport.height}`;
    acc[size] = (acc[size] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    summary: {
      totalSessions,
      completedSessions,
      avgSessionDuration,
      avgPageViews,
    },
    performance: performanceSummary,
    technical: {
      connectionTypes,
      viewportSizes,
    },
  };
};