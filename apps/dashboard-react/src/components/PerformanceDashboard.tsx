import { useState, useEffect } from 'react';
import { tokens } from '@adsmagic/tokens';
import type { PerformanceMetric, WebVitalsMetrics } from '../hooks/usePerformanceMonitoring';
import { PerformanceAlerts } from './PerformanceAlerts';
import { AlertConfiguration } from './AlertConfiguration';
import { PerformanceBudgets } from './PerformanceBudgets';

interface PerformanceDashboardProps {
  metrics?: PerformanceMetric[];
}

const PerformanceCard = ({
  title,
  value,
  unit,
  rating,
  description
}: {
  title: string;
  value: number | string;
  unit: string;
  rating: 'good' | 'needs-improvement' | 'poor';
  description: string;
}) => {
  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'good': return tokens.colors.success600;
      case 'needs-improvement': return tokens.colors.warning600;
      case 'poor': return tokens.colors.danger600;
      default: return tokens.colors.slate600;
    }
  };

  const getRatingBg = (rating: string) => {
    switch (rating) {
      case 'good': return tokens.colors.success100;
      case 'needs-improvement': return tokens.colors.warning100;
      case 'poor': return tokens.colors.danger100;
      default: return tokens.colors.slate100;
    }
  };

  return (
    <div style={{
      borderRadius: tokens.radii.lg,
      border: `1px solid ${tokens.aliases.borderSoft}`,
      backgroundColor: tokens.aliases.surface,
      padding: tokens.spacing.lg,
      boxShadow: tokens.shadows.card,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: tokens.spacing.md }}>
        <h3 style={{
          fontSize: tokens.typography.sizeSM,
          fontWeight: Number(tokens.typography.weightMedium),
          color: tokens.colors.slate600,
          margin: 0,
          textTransform: 'uppercase',
          letterSpacing: '0.04em'
        }}>
          {title}
        </h3>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          paddingInline: tokens.spacing.sm,
          paddingBlock: tokens.spacing['2xs'],
          borderRadius: tokens.radii.full,
          fontSize: tokens.typography.sizeXS,
          fontWeight: Number(tokens.typography.weightMedium),
          color: getRatingColor(rating),
          backgroundColor: getRatingBg(rating),
        }}>
          {rating === 'good' ? '✓ Bom' : rating === 'needs-improvement' ? '⚠️ Precisa melhorar' : '✗ Ruim'}
        </span>
      </div>

      <div style={{ marginBottom: tokens.spacing.sm }}>
        <span style={{
          fontSize: tokens.typography.sizeXL,
          fontWeight: Number(tokens.typography.weightSemibold),
          color: tokens.colors.slate900,
        }}>
          {typeof value === 'number' ? value.toFixed(2) : value}
        </span>
        <span style={{
          fontSize: tokens.typography.sizeSM,
          color: tokens.colors.slate500,
          marginLeft: tokens.spacing.sm
        }}>
          {unit}
        </span>
      </div>

      <p style={{
        fontSize: tokens.typography.sizeSM,
        color: tokens.colors.slate600,
        margin: 0,
        lineHeight: 1.5
      }}>
        {description}
      </p>
    </div>
  );
};

export const PerformanceDashboard = ({ metrics = [] }: PerformanceDashboardProps) => {
  const [currentMetrics, setCurrentMetrics] = useState<WebVitalsMetrics>({});
  const [showAlertConfig, setShowAlertConfig] = useState(false);
  const [showBudgets, setShowBudgets] = useState(false);

  useEffect(() => {
    // Atualizar métricas quando novas chegam
    const latestMetrics = metrics.reduce((acc, metric) => {
      acc[metric.name as keyof WebVitalsMetrics] = metric.value;
      return acc;
    }, {} as WebVitalsMetrics);

    setCurrentMetrics(latestMetrics);
  }, [metrics]);

  // Valores padrão para quando não há métricas ainda
  const displayMetrics = {
    FCP: currentMetrics.FCP || 0,
    LCP: currentMetrics.LCP || 0,
    CLS: currentMetrics.CLS || 0,
    FID: currentMetrics.FID || 0,
    TTFB: currentMetrics.TTFB || 0,
  };

  const getRating = (name: string, value: number): 'good' | 'needs-improvement' | 'poor' => {
    switch (name) {
      case 'FCP':
      case 'LCP':
        return value <= 2500 ? 'good' : value <= 4000 ? 'needs-improvement' : 'poor';
      case 'CLS':
        return value <= 0.1 ? 'good' : value <= 0.25 ? 'needs-improvement' : 'poor';
      case 'FID':
      case 'TTFB':
        return value <= 100 ? 'good' : value <= 300 ? 'needs-improvement' : 'poor';
      default:
        return 'good';
    }
  };

  return (
    <div style={{
      padding: tokens.spacing.xl,
      backgroundColor: tokens.colors.slate50,
      minHeight: '100vh'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: tokens.spacing.xl }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: tokens.spacing.md }}>
            <div>
              <h1 style={{
                fontSize: tokens.typography.sizeXL,
                fontWeight: Number(tokens.typography.weightSemibold),
                color: tokens.colors.slate900,
                marginBottom: tokens.spacing.sm
              }}>
                📊 Performance Dashboard
              </h1>
              <p style={{
                fontSize: tokens.typography.sizeLG,
                color: tokens.colors.slate600,
                margin: 0
              }}>
                Monitore as métricas de performance em tempo real
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setShowAlertConfig(true)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: tokens.colors.primary600,
                  color: 'white',
                  border: 'none',
                  borderRadius: tokens.radii.md,
                  cursor: 'pointer',
                  fontSize: tokens.typography.sizeSM,
                  fontWeight: Number(tokens.typography.weightMedium),
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                ⚙️ Configurar Alertas
              </button>

              <button
                onClick={() => setShowBudgets(true)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: tokens.colors.secondary600 || '#6b7280',
                  color: 'white',
                  border: 'none',
                  borderRadius: tokens.radii.md,
                  cursor: 'pointer',
                  fontSize: tokens.typography.sizeSM,
                  fontWeight: Number(tokens.typography.weightMedium),
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                💰 Orçamentos
              </button>
            </div>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gap: tokens.spacing.lg,
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        }}>
          <PerformanceCard
            title="First Contentful Paint"
            value={displayMetrics.FCP}
            unit="ms"
            rating={getRating('FCP', displayMetrics.FCP)}
            description="Tempo até o primeiro conteúdo ser pintado na tela"
          />

          <PerformanceCard
            title="Largest Contentful Paint"
            value={displayMetrics.LCP}
            unit="ms"
            rating={getRating('LCP', displayMetrics.LCP)}
            description="Tempo até o maior elemento de conteúdo ser pintado"
          />

          <PerformanceCard
            title="Cumulative Layout Shift"
            value={displayMetrics.CLS}
            unit=""
            rating={getRating('CLS', displayMetrics.CLS)}
            description="Mudanças inesperadas no layout da página"
          />

          <PerformanceCard
            title="First Input Delay"
            value={displayMetrics.FID}
            unit="ms"
            rating={getRating('FID', displayMetrics.FID)}
            description="Tempo de resposta à primeira interação do usuário"
          />

          <PerformanceCard
            title="Time to First Byte"
            value={displayMetrics.TTFB}
            unit="ms"
            rating={getRating('TTFB', displayMetrics.TTFB)}
            description="Tempo até receber o primeiro byte da resposta"
          />
        </div>

        <div style={{
          marginTop: tokens.spacing.xl,
          padding: tokens.spacing.lg,
          borderRadius: tokens.radii.lg,
          backgroundColor: tokens.aliases.surface,
          border: `1px solid ${tokens.aliases.borderSoft}`,
        }}>
          <h3 style={{
            fontSize: tokens.typography.sizeLG,
            fontWeight: Number(tokens.typography.weightSemibold),
            color: tokens.colors.slate900,
            marginBottom: tokens.spacing.md
          }}>
            📋 Sobre as Métricas
          </h3>
          <div style={{ display: 'grid', gap: tokens.spacing.md, gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))' }}>
            <div>
              <h4 style={{ fontSize: tokens.typography.sizeMD, fontWeight: Number(tokens.typography.weightSemibold), color: tokens.colors.slate800, marginBottom: tokens.spacing.sm }}>
                🎯 Core Web Vitals
              </h4>
              <ul style={{ fontSize: tokens.typography.sizeSM, color: tokens.colors.slate600, margin: 0, paddingLeft: tokens.spacing.lg }}>
                <li><strong>FCP & LCP:</strong> Medem percepção de velocidade de carregamento</li>
                <li><strong>CLS:</strong> Mede estabilidade visual durante carregamento</li>
                <li><strong>FID:</strong> Mede responsividade às interações do usuário</li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: tokens.typography.sizeMD, fontWeight: Number(tokens.typography.weightSemibold), color: tokens.colors.slate800, marginBottom: tokens.spacing.sm }}>
                📊 Classificação
              </h4>
              <ul style={{ fontSize: tokens.typography.sizeSM, color: tokens.colors.slate600, margin: 0, paddingLeft: tokens.spacing.lg }}>
                <li><span style={{ color: tokens.colors.success600 }}>🟢 Bom:</span> Experiência excelente</li>
                <li><span style={{ color: tokens.colors.warning600 }}>🟡 Precisa melhorar:</span> Experiência aceitável</li>
                <li><span style={{ color: tokens.colors.danger600 }}>🔴 Ruim:</span> Experiência ruim</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Alertas de Performance */}
      <PerformanceAlerts metrics={metrics} />
      <AlertConfiguration />
      <PerformanceBudgets />

      {/* Modal de configuração de alertas */}
      {showAlertConfig && (
        <AlertConfiguration onClose={() => setShowAlertConfig(false)} />
      )}

      {/* Modal de configuração de budgets */}
      {showBudgets && (
        <PerformanceBudgets
          metrics={metrics}
          onClose={() => setShowBudgets(false)}
        />
      )}
    </div>
  );
};