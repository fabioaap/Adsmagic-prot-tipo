import { useEffect } from 'react';
import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { useRUM } from './useRUM';
import { alertService } from '../services/alertService';
import { budgetService } from '../services/budgetService';

export interface WebVitalsMetrics {
  CLS?: number;
  INP?: number; // Substituiu FID
  FCP?: number;
  LCP?: number;
  TTFB?: number;
}

export interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  timestamp: number;
  navigationType?: string;
}

// Hook personalizado para Web Vitals
export const useWebVitals = (onMetric?: (metric: PerformanceMetric) => void) => {
  useEffect(() => {
    // CLS - Cumulative Layout Shift
    onCLS((metric) => {
      const performanceMetric: PerformanceMetric = {
        name: 'CLS',
        value: metric.value,
        rating: metric.rating,
        timestamp: Date.now(),
        navigationType: (metric as any).navigationType,
      };
      onMetric?.(performanceMetric);
      console.log('CLS:', metric);
    });

    // INP - Interaction to Next Paint (substituiu FID)
    onINP((metric) => {
      const performanceMetric: PerformanceMetric = {
        name: 'INP',
        value: metric.value,
        rating: metric.rating,
        timestamp: Date.now(),
        navigationType: (metric as any).navigationType,
      };
      onMetric?.(performanceMetric);
      console.log('INP:', metric);
    });

    // FCP - First Contentful Paint
    onFCP((metric) => {
      const performanceMetric: PerformanceMetric = {
        name: 'FCP',
        value: metric.value,
        rating: metric.rating,
        timestamp: Date.now(),
        navigationType: (metric as any).navigationType,
      };
      onMetric?.(performanceMetric);
      console.log('FCP:', metric);
    });

    // LCP - Largest Contentful Paint
    onLCP((metric) => {
      const performanceMetric: PerformanceMetric = {
        name: 'LCP',
        value: metric.value,
        rating: metric.rating,
        timestamp: Date.now(),
        navigationType: (metric as any).navigationType,
      };
      onMetric?.(performanceMetric);
      console.log('LCP:', metric);
    });

    // TTFB - Time to First Byte
    onTTFB((metric) => {
      const performanceMetric: PerformanceMetric = {
        name: 'TTFB',
        value: metric.value,
        rating: metric.rating,
        timestamp: Date.now(),
        navigationType: (metric as any).navigationType,
      };
      onMetric?.(performanceMetric);
      console.log('TTFB:', metric);
    });
  }, [onMetric]);
};

// Função para enviar métricas para analytics (placeholder)
export const sendToAnalytics = (metric: PerformanceMetric) => {
  // Em produção, isso enviaria para Google Analytics, Mixpanel, etc.
  console.log('📊 Enviando métrica para analytics:', metric);

  // Exemplo de envio para Google Analytics 4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'web_vitals', {
      event_category: 'Web Vitals',
      event_label: metric.name,
      value: Math.round(metric.value),
      custom_map: { metric_rating: metric.rating }
    });
  }

  // Enviar contexto para Sentry (métricas críticas)
  if (metric.rating === 'poor') {
    Sentry.setContext('performance_metric', {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      timestamp: metric.timestamp,
    });
  }
};

// Hook para monitoring de performance geral
export const usePerformanceMonitoring = () => {
  // Inicializar serviço de alertas
  useEffect(() => {
    alertService.configureFromEnv();
  }, []);

  // Inicializar RUM
  const { trackMetric, isSamplingEnabled } = useRUM({
    sampleRate: 0.1, // 10% dos usuários
    maxSessions: 1000,
    enableGeolocation: false,
  });

  useWebVitals((metric) => {
    sendToAnalytics(metric);

    // Enviar para RUM se sampling estiver ativo
    if (isSamplingEnabled) {
      trackMetric(metric);
    }

    // Alertas para métricas críticas
    if (metric.rating === 'poor') {
      console.warn(`⚠️ Métrica crítica ruim: ${metric.name} = ${metric.value} (${metric.rating})`);
      // Verificar alertas configurados
      alertService.checkMetrics([metric]);
    }

    // Verificar orçamentos de performance
    const budgetResults = budgetService.checkBudgetAlerts([metric]);
    if (budgetResults.some(r => r.status === 'fail')) {
      console.error(`💰 Orçamento de performance excedido para ${metric.name}`);
    }
  });

  // Monitorar erros não capturados com Sentry
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('🚨 Erro não capturado:', event.error);
      Sentry.captureException(event.error, {
        tags: {
          error_type: 'uncaught_error',
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
        },
        extra: {
          message: event.message,
          stack: event.error?.stack,
        },
      });
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('🚨 Promise rejeitada não tratada:', event.reason);
      Sentry.captureException(event.reason, {
        tags: {
          error_type: 'unhandled_promise_rejection',
        },
        extra: {
          reason: event.reason,
        },
      });
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);
};

// Função para medir tempo de carregamento de componentes
export const measureComponentLoadTime = (componentName: string) => {
  const startTime = performance.now();

  return () => {
    const endTime = performance.now();
    const loadTime = endTime - startTime;
    console.log(`⏱️ ${componentName} carregado em ${loadTime.toFixed(2)}ms`);

    sendToAnalytics({
      name: `component_load_${componentName}`,
      value: loadTime,
      rating: loadTime < 100 ? 'good' : loadTime < 500 ? 'needs-improvement' : 'poor',
      timestamp: Date.now(),
    });
  };
};

// Hook para medir performance de renderização
export const useRenderPerformance = (componentName: string) => {
  useEffect(() => {
    const endMeasurement = measureComponentLoadTime(componentName);
    return endMeasurement;
  }, [componentName]);
};