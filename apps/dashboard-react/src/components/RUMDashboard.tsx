import React, { useState, useEffect } from 'react';
import { tokens } from '@adsmagic/tokens';
import { getStoredSessions, analyzeRUMData, exportRUMData, clearRUMData, RUMSession } from '../hooks/useRUM';

interface RUMDashboardProps {
  refreshInterval?: number; // em ms
}

export const RUMDashboard: React.FC<RUMDashboardProps> = ({
  refreshInterval = 30000 // 30 segundos
}) => {
  const [sessions, setSessions] = useState<RUMSession[]>([]);
  const [analysis, setAnalysis] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar dados RUM
  const loadRUMData = () => {
    const storedSessions = getStoredSessions();
    setSessions(storedSessions);
    setAnalysis(analyzeRUMData(storedSessions));
    setIsLoading(false);
  };

  useEffect(() => {
    loadRUMData();

    // Atualizar periodicamente
    const interval = setInterval(loadRUMData, refreshInterval);
    return () => clearInterval(interval);
  }, [refreshInterval]);

  const handleExport = () => {
    exportRUMData();
  };

  const handleClear = () => {
    if (window.confirm('Tem certeza que deseja limpar todos os dados de RUM? Esta ação não pode ser desfeita.')) {
      clearRUMData();
      loadRUMData();
    }
  };

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '200px',
        fontSize: '16px',
        color: tokens.colors.slate600
      }}>
        Carregando dados RUM...
      </div>
    );
  }

  return (
    <div style={{
      padding: tokens.spacing.xl,
      maxWidth: '1200px',
      margin: '0 auto',
    }}>
      {/* Header */}
      <div style={{
        marginBottom: tokens.spacing.xl,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div>
          <h1 style={{
            fontSize: tokens.typography.size3XL,
            fontWeight: Number(tokens.typography.weightBold),
            color: tokens.colors.slate900,
            margin: 0,
            marginBottom: tokens.spacing.sm,
          }}>
            📊 Real User Monitoring (RUM)
          </h1>
          <p style={{
            fontSize: tokens.typography.sizeLG,
            color: tokens.colors.slate600,
            margin: 0,
          }}>
            Métricas de performance de usuários reais em produção
          </p>
        </div>

        <div style={{ display: 'flex', gap: tokens.spacing.md }}>
          <button
            onClick={handleExport}
            style={{
              padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
              backgroundColor: tokens.colors.primary600,
              color: 'white',
              border: 'none',
              borderRadius: tokens.borderRadius.md,
              cursor: 'pointer',
              fontSize: tokens.typography.sizeSM,
              fontWeight: Number(tokens.typography.weightMedium),
            }}
          >
            📥 Exportar Dados
          </button>
          <button
            onClick={handleClear}
            style={{
              padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
              backgroundColor: tokens.colors.danger600,
              color: 'white',
              border: 'none',
              borderRadius: tokens.borderRadius.md,
              cursor: 'pointer',
              fontSize: tokens.typography.sizeSM,
              fontWeight: Number(tokens.typography.weightMedium),
            }}
          >
            🗑️ Limpar Dados
          </button>
        </div>
      </div>

      {/* Resumo Geral */}
      {analysis && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: tokens.spacing.lg,
          marginBottom: tokens.spacing.xl,
        }}>
          <MetricCard
            title="Total de Sessões"
            value={analysis.summary.totalSessions}
            subtitle="Usuários monitorados"
            icon="👥"
          />
          <MetricCard
            title="Sessões Completas"
            value={analysis.summary.completedSessions}
            subtitle={`${((analysis.summary.completedSessions / analysis.summary.totalSessions) * 100).toFixed(1)}% do total`}
            icon="✅"
          />
          <MetricCard
            title="Duração Média"
            value={`${(analysis.summary.avgSessionDuration / 1000).toFixed(1)}s`}
            subtitle="Tempo médio na aplicação"
            icon="⏱️"
          />
          <MetricCard
            title="Páginas por Sessão"
            value={analysis.summary.avgPageViews.toFixed(1)}
            subtitle="Média de navegação"
            icon="📄"
          />
        </div>
      )}

      {/* Performance Metrics */}
      {analysis?.performance && analysis.performance.length > 0 && (
        <div style={{ marginBottom: tokens.spacing.xl }}>
          <h2 style={{
            fontSize: tokens.typography.sizeXL,
            fontWeight: Number(tokens.typography.weightSemibold),
            color: tokens.colors.slate900,
            marginBottom: tokens.spacing.lg,
          }}>
            📈 Performance por Métrica
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: tokens.spacing.lg,
          }}>
            {analysis.performance.map((metric: any) => (
              <div
                key={metric.metric}
                style={{
                  backgroundColor: 'white',
                  border: `1px solid ${tokens.colors.slate200}`,
                  borderRadius: tokens.borderRadius.lg,
                  padding: tokens.spacing.lg,
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: tokens.spacing.md,
                }}>
                  <h3 style={{
                    fontSize: tokens.typography.sizeLG,
                    fontWeight: Number(tokens.typography.weightSemibold),
                    color: tokens.colors.slate900,
                    margin: 0,
                  }}>
                    {metric.metric}
                  </h3>
                  <span style={{
                    fontSize: tokens.typography.sizeSM,
                    color: tokens.colors.slate500,
                  }}>
                    {metric.count} medições
                  </span>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: tokens.spacing.sm,
                }}>
                  <div>
                    <div style={{
                      fontSize: tokens.typography.sizeSM,
                      color: tokens.colors.slate600,
                      marginBottom: tokens.spacing.xs,
                    }}>
                      Média
                    </div>
                    <div style={{
                      fontSize: tokens.typography.sizeLG,
                      fontWeight: Number(tokens.typography.weightBold),
                      color: tokens.colors.slate900,
                    }}>
                      {metric.metric.includes('CLS') ? metric.average.toFixed(3) :
                       metric.metric.includes('TTFB') || metric.metric.includes('INP') || metric.metric.includes('FID') ?
                       `${metric.average.toFixed(0)}ms` : `${metric.average.toFixed(0)}ms`}
                    </div>
                  </div>

                  <div>
                    <div style={{
                      fontSize: tokens.typography.sizeSM,
                      color: tokens.colors.slate600,
                      marginBottom: tokens.spacing.xs,
                    }}>
                      P75
                    </div>
                    <div style={{
                      fontSize: tokens.typography.sizeLG,
                      fontWeight: Number(tokens.typography.weightBold),
                      color: tokens.colors.warning600,
                    }}>
                      {metric.metric.includes('CLS') ? metric.p75.toFixed(3) :
                       metric.metric.includes('TTFB') || metric.metric.includes('INP') || metric.metric.includes('FID') ?
                       `${metric.p75.toFixed(0)}ms` : `${metric.p75.toFixed(0)}ms`}
                    </div>
                  </div>

                  <div>
                    <div style={{
                      fontSize: tokens.typography.sizeSM,
                      color: tokens.colors.slate600,
                      marginBottom: tokens.spacing.xs,
                    }}>
                      P95
                    </div>
                    <div style={{
                      fontSize: tokens.typography.sizeLG,
                      fontWeight: Number(tokens.typography.weightBold),
                      color: tokens.colors.danger600,
                    }}>
                      {metric.metric.includes('CLS') ? metric.p95.toFixed(3) :
                       metric.metric.includes('TTFB') || metric.metric.includes('INP') || metric.metric.includes('FID') ?
                       `${metric.p95.toFixed(0)}ms` : `${metric.p95.toFixed(0)}ms`}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Análise Técnica */}
      {analysis?.technical && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: tokens.spacing.lg,
        }}>
          {/* Tipos de Conexão */}
          <div style={{
            backgroundColor: 'white',
            border: `1px solid ${tokens.colors.slate200}`,
            borderRadius: tokens.borderRadius.lg,
            padding: tokens.spacing.lg,
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          }}>
            <h3 style={{
              fontSize: tokens.typography.sizeLG,
              fontWeight: Number(tokens.typography.weightSemibold),
              color: tokens.colors.slate900,
              marginBottom: tokens.spacing.md,
            }}>
              🌐 Tipos de Conexão
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.sm }}>
              {Object.entries(analysis.technical.connectionTypes).map(([type, count]) => (
                <div key={type} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <span style={{ color: tokens.colors.slate700 }}>
                    {type === '4g' ? '4G' : type === '3g' ? '3G' : type === '2g' ? '2G' : type.toUpperCase()}
                  </span>
                  <span style={{
                    fontWeight: Number(tokens.typography.weightMedium),
                    color: tokens.colors.slate900,
                  }}>
                    {count} ({((count as number / analysis.summary.totalSessions) * 100).toFixed(1)}%)
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tamanhos de Viewport */}
          <div style={{
            backgroundColor: 'white',
            border: `1px solid ${tokens.colors.slate200}`,
            borderRadius: tokens.borderRadius.lg,
            padding: tokens.spacing.lg,
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          }}>
            <h3 style={{
              fontSize: tokens.typography.sizeLG,
              fontWeight: Number(tokens.typography.weightSemibold),
              color: tokens.colors.slate900,
              marginBottom: tokens.spacing.md,
            }}>
              📱 Tamanhos de Tela
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: tokens.spacing.sm,
              maxHeight: '200px',
              overflowY: 'auto',
            }}>
              {Object.entries(analysis.technical.viewportSizes)
                .sort(([,a], [,b]) => (b as number) - (a as number))
                .slice(0, 10)
                .map(([size, count]) => (
                <div key={size} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <span style={{ color: tokens.colors.slate700, fontSize: tokens.typography.sizeSM }}>
                    {size}
                  </span>
                  <span style={{
                    fontWeight: Number(tokens.typography.weightMedium),
                    color: tokens.colors.slate900,
                    fontSize: tokens.typography.sizeSM,
                  }}>
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sessões Recentes */}
      <div style={{ marginTop: tokens.spacing.xl }}>
        <h2 style={{
          fontSize: tokens.typography.sizeXL,
          fontWeight: Number(tokens.typography.weightSemibold),
          color: tokens.colors.slate900,
          marginBottom: tokens.spacing.lg,
        }}>
          🕐 Sessões Recentes
        </h2>

        <div style={{
          backgroundColor: 'white',
          border: `1px solid ${tokens.colors.slate200}`,
          borderRadius: tokens.borderRadius.lg,
          overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        }}>
          {sessions.slice(0, 10).map((session) => (
            <div
              key={session.sessionId}
              style={{
                padding: tokens.spacing.md,
                borderBottom: `1px solid ${tokens.colors.slate100}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <div style={{
                  fontSize: tokens.typography.sizeSM,
                  fontWeight: Number(tokens.typography.weightMedium),
                  color: tokens.colors.slate900,
                  marginBottom: tokens.spacing.xs,
                }}>
                  {new Date(session.startTime).toLocaleString()}
                </div>
                <div style={{
                  fontSize: tokens.typography.sizeSM,
                  color: tokens.colors.slate600,
                }}>
                  {session.pageViews.length} páginas • {session.metrics.length} métricas
                  {session.connection.effectiveType && ` • ${session.connection.effectiveType.toUpperCase()}`}
                </div>
              </div>
              <div style={{
                fontSize: tokens.typography.sizeSM,
                color: session.endTime ? tokens.colors.success600 : tokens.colors.warning600,
                fontWeight: Number(tokens.typography.weightMedium),
              }}>
                {session.endTime ?
                  `Finalizada (${Math.round((session.duration || 0) / 1000)}s)` :
                  'Ativa'
                }
              </div>
            </div>
          ))}

          {sessions.length === 0 && (
            <div style={{
              padding: tokens.spacing.xl,
              textAlign: 'center',
              color: tokens.colors.slate500,
            }}>
              Nenhuma sessão RUM coletada ainda.
              <br />
              <small>As sessões aparecerão aqui conforme usuários interagirem com a aplicação.</small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Componente auxiliar para cards de métricas
const MetricCard: React.FC<{
  title: string;
  value: string | number;
  subtitle: string;
  icon: string;
}> = ({ title, value, subtitle, icon }) => (
  <div style={{
    backgroundColor: 'white',
    border: `1px solid ${tokens.colors.slate200}`,
    borderRadius: tokens.borderRadius.lg,
    padding: tokens.spacing.lg,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  }}>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      marginBottom: tokens.spacing.sm,
    }}>
      <span style={{ fontSize: '24px', marginRight: tokens.spacing.sm }}>{icon}</span>
      <h3 style={{
        fontSize: tokens.typography.sizeLG,
        fontWeight: Number(tokens.typography.weightSemibold),
        color: tokens.colors.slate900,
        margin: 0,
      }}>
        {title}
      </h3>
    </div>
    <div style={{
      fontSize: tokens.typography.size2XL,
      fontWeight: Number(tokens.typography.weightBold),
      color: tokens.colors.primary600,
      marginBottom: tokens.spacing.xs,
    }}>
      {value}
    </div>
    <div style={{
      fontSize: tokens.typography.sizeSM,
      color: tokens.colors.slate600,
    }}>
      {subtitle}
    </div>
  </div>
);