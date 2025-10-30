import React, { useState, useEffect } from 'react';
import { PerformanceMetric } from '../hooks/usePerformanceMonitoring';

interface PerformanceAlert {
  id: string;
  metric: PerformanceMetric;
  message: string;
  severity: 'warning' | 'error' | 'critical';
  timestamp: number;
}

interface PerformanceAlertsProps {
  metrics: PerformanceMetric[];
  onDismiss?: (alertId: string) => void;
}

export const PerformanceAlerts: React.FC<PerformanceAlertsProps> = ({
  metrics,
  onDismiss
}) => {
  const [alerts, setAlerts] = useState<PerformanceAlert[]>([]);

  useEffect(() => {
    const newAlerts: PerformanceAlert[] = [];

    metrics.forEach((metric) => {
      if (metric.rating === 'poor') {
        let message = '';
        let severity: 'warning' | 'error' | 'critical' = 'warning';

        switch (metric.name) {
          case 'CLS':
            message = `Layout instável detectado (${metric.value.toFixed(3)}). Usuários podem estar experimentando mudanças visuais inesperadas.`;
            severity = metric.value > 0.25 ? 'critical' : 'error';
            break;
          case 'INP':
            message = `Interação lenta detectada (${metric.value.toFixed(0)}ms). Usuários podem sentir atrasos ao interagir com a página.`;
            severity = metric.value > 200 ? 'critical' : 'error';
            break;
          case 'FCP':
            message = `Primeira renderização lenta (${metric.value.toFixed(0)}ms). Usuários estão esperando muito para ver conteúdo.`;
            severity = metric.value > 3000 ? 'critical' : 'error';
            break;
          case 'LCP':
            message = `Conteúdo principal lento (${metric.value.toFixed(0)}ms). O elemento mais importante está demorando para carregar.`;
            severity = metric.value > 4000 ? 'critical' : 'error';
            break;
          case 'TTFB':
            message = `Servidor lento (${metric.value.toFixed(0)}ms). Há atrasos na resposta do servidor.`;
            severity = metric.value > 800 ? 'critical' : 'error';
            break;
          default:
            message = `Métrica crítica: ${metric.name} = ${metric.value}`;
            severity = 'error';
        }

        const alert: PerformanceAlert = {
          id: `${metric.name}-${metric.timestamp}`,
          metric,
          message,
          severity,
          timestamp: metric.timestamp,
        };

        newAlerts.push(alert);
      }
    });

    setAlerts(newAlerts);
  }, [metrics]);

  const handleDismiss = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
    onDismiss?.(alertId);
  };

  if (alerts.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 1000,
      maxWidth: '400px',
      maxHeight: '80vh',
      overflowY: 'auto',
    }}>
      {alerts.map((alert) => (
        <div
          key={alert.id}
          style={{
            backgroundColor: alert.severity === 'critical' ? '#fee2e2' :
                           alert.severity === 'error' ? '#fef3c7' : '#dbeafe',
            border: `1px solid ${alert.severity === 'critical' ? '#dc2626' :
                               alert.severity === 'error' ? '#d97706' : '#2563eb'}`,
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '12px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            position: 'relative',
          }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '8px',
          }}>
            <div style={{
              fontSize: '14px',
              fontWeight: '600',
              color: alert.severity === 'critical' ? '#991b1b' :
                     alert.severity === 'error' ? '#92400e' : '#1e40af',
            }}>
              ⚠️ Alerta de Performance
            </div>
            <button
              onClick={() => handleDismiss(alert.id)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '18px',
                color: '#6b7280',
                padding: '0',
                lineHeight: '1',
              }}
              aria-label="Fechar alerta"
            >
              ×
            </button>
          </div>

          <div style={{
            fontSize: '14px',
            color: '#374151',
            lineHeight: '1.5',
          }}>
            {alert.message}
          </div>

          <div style={{
            fontSize: '12px',
            color: '#6b7280',
            marginTop: '8px',
          }}>
            {new Date(alert.timestamp).toLocaleTimeString()}
          </div>
        </div>
      ))}
    </div>
  );
};