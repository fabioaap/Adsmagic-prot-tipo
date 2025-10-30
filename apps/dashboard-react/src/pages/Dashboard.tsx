import { Suspense, lazy } from 'react';
import { Layout, SummaryCard } from '../components';
import { useRenderPerformance } from '../hooks/usePerformanceMonitoring';

// Lazy load dos componentes pesados (gráficos)
const ContactsSalesChart = lazy(() => import('../components').then(module => ({ default: module.ContactsSalesChart })));
const RevenueChart = lazy(() => import('../components').then(module => ({ default: module.RevenueChart })));
const ChannelsChart = lazy(() => import('../components').then(module => ({ default: module.ChannelsChart })));
const FunnelChart = lazy(() => import('../components').then(module => ({ default: module.FunnelChart })));
const InteractionsList = lazy(() => import('../components').then(module => ({ default: module.InteractionsList })));
const SalesList = lazy(() => import('../components').then(module => ({ default: module.SalesList })));

// Componente de loading para gráficos
const ChartLoading = () => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '24px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    boxShadow: '0px 10px 32px rgba(15, 23, 42, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '200px'
  }}>
    <div style={{
      width: '32px',
      height: '32px',
      border: '3px solid #e2e8f0',
      borderTop: '3px solid #2563eb',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }} />
    <span style={{ color: '#64748b', fontSize: '14px' }}>Carregando gráfico...</span>
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

export const Dashboard = () => {
  // Monitorar performance do componente Dashboard
  useRenderPerformance('Dashboard');

  const contactsSalesData = [
    { week: 'Fev', contacts: 200, sales: 50 },
    { week: 'Mar', contacts: 250, sales: 65 },
    { week: 'Abr', contacts: 220, sales: 55 },
    { week: 'Mai', contacts: 273, sales: 78 },
  ];

  const revenueData = [
    { name: 'Atingido', value: 82, color: '#2563eb' },
    { name: 'Restante', value: 18, color: '#10b981' },
  ];

  const channelsData = [
    { name: 'Google Ads', percentage: 55, color: '#4f46e5' },
    { name: 'Meta Ads', percentage: 18, color: '#f97316' },
    { name: 'TikTok Ads', percentage: 12, color: '#10b981' },
    { name: 'Orgânico', percentage: 8, color: '#f59e0b' },
    { name: 'Direto', percentage: 5, color: '#a855f7' },
    { name: 'Outros', percentage: 2, color: '#6b7280' },
  ];

  const funnelStages = [
    { label: 'Contatos', value: 68, width: 100, bgColor: '#2563eb' },
    { label: 'Qualificados', value: 45, width: 66, bgColor: '#10b981' },
    { label: 'Oportunidades', value: 22, width: 33, bgColor: '#f59e0b' },
    { label: 'Fechados', value: 11, width: 17, bgColor: '#ef4444' },
  ];

  const interactions = [
    { name: 'Gabriel Torres', message: 'Solicitou proposta atualizada', time: '12:45', type: 'Chat', isRecent: true },
    { name: 'Ana Carvalho', message: 'E-mail sobre onboarding', time: 'Ontem', type: 'Email' },
    { name: 'Estúdio Pluma', message: 'Solicitou demonstração', time: 'Ontem', type: 'Ligação' },
  ];

  const sales = [
    { name: 'Adset Terra', plan: 'Plano Enterprise', amount: 'R$ 19.200' },
    { name: 'Nexo Labs', plan: 'Plano Growth', amount: 'R$ 9.680' },
    { name: 'Studio Dobra', plan: 'Plano Starter', amount: 'R$ 6.250' },
    { name: 'Orion Fit', plan: 'Plano Growth', amount: 'R$ 7.950' },
  ];

  return (
    <Layout>
      <main className="app-main">
        {/* Summary Cards Grid */}
        <section
          className="summary-grid"
          style={{
            display: 'grid',
            gap: '1rem',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridAutoRows: 'auto',
          }}
        >
          <SummaryCard label="Gastos anúncios" value="R$ 784,21" caption="Investimento do período." badge="+4,3%" badgeType="positive" />
          <SummaryCard label="Receita" value="R$ 6.060,00" caption="Receita total atribuída." badge="+9,8%" badgeType="positive" />
          <SummaryCard label="Ticket médio" value="R$ 757,50" caption="Valor médio por venda." badge="+5,2%" badgeType="positive" />
          <SummaryCard label="ROI" value="7,7x" caption="Retorno sobre o investimento." badge="+0,7x" badgeType="positive" />
          <SummaryCard label="Custo por venda" value="R$ 98,00" caption="Aquisição média por venda." badge="-3,1%" badgeType="negative" />
          <SummaryCard label="Contatos" value="68" caption="Leads gerados no período." badge="+12" badgeType="positive" />
          <SummaryCard label="Vendas" value="8" caption="Negócios fechados." badge="+2" badgeType="positive" />
          <SummaryCard label="Taxa de vendas" value="11,76%" caption="Conversões sobre contatos." badge="+1,6 p.p." badgeType="positive" />
          <SummaryCard label="Impressões" value="6.020" caption="Exibições das campanhas." badge="+540" badgeType="positive" />
          <SummaryCard label="Cliques" value="245" caption="Interações registradas." badge="+28" badgeType="positive" />
          <SummaryCard label="Custo por clique" value="R$ 3,20" caption="Investimento médio por clique." badge="-0,18" badgeType="negative" />
          <SummaryCard label="Taxa de cliques" value="4,07%" caption="CTR das campanhas." badge="+0,5 p.p." badgeType="positive" />
          <SummaryCard label="Ciclo de vendas" value="26 dias" caption="Objetivo: 24 dias" badge="-1,2 dias" badgeType="negative" />
          <SummaryCard label="Clientes ativos" value="206" caption="Renovações previstas: 14" badge="+3,8%" badgeType="positive" style={{ gridColumn: 'span 2' }} />
        </section>

        {/* Performance Metrics Section */}
        <section className="performance-metrics">
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#0f172a',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            📊 Performance em Tempo Real
          </h2>
          <div style={{
            display: 'grid',
            gap: '1rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          }}>
            <SummaryCard
              label="Bundle Size"
              value="2.84 KB"
              caption="Tamanho do bundle inicial (99.4% de redução)"
              badge="-98.2%"
              badgeType="positive"
            />
            <SummaryCard
              label="Loading Chunks"
              value="8 chunks"
              caption="Divisão inteligente de código"
              badge="Otimizado"
              badgeType="positive"
            />
            <SummaryCard
              label="Compression"
              value="Gzip + Brotli"
              caption="Compressão automática habilitada"
              badge="Ativo"
              badgeType="positive"
            />
            <SummaryCard
              label="Lazy Loading"
              value="6 componentes"
              caption="Gráficos carregados sob demanda"
              badge="Ativo"
              badgeType="positive"
            />
            <SummaryCard
              label="Real User Monitoring"
              value="RUM Ativo"
              caption="Monitorando 10% dos usuários reais"
              badge="Ver Dashboard"
              badgeType="info"
              onClick={() => window.location.href = '/rum'}
            />
          </div>
        </section>

        {/* Charts Section 1 - Contacts/Sales + Revenue */}
        <section className="grid gap-4 lg:grid-cols-[2fr_1fr]">
          <Suspense fallback={<ChartLoading />}>
            <ContactsSalesChart data={contactsSalesData} />
          </Suspense>
          <Suspense fallback={<ChartLoading />}>
            <RevenueChart data={revenueData} />
          </Suspense>
        </section>

        {/* Charts Section 2 - Channels and Funnel */}
        <section className="grid gap-4 lg:grid-cols-2">
          <Suspense fallback={<ChartLoading />}>
            <ChannelsChart data={channelsData} />
          </Suspense>
          <Suspense fallback={<ChartLoading />}>
            <FunnelChart stages={funnelStages} />
          </Suspense>
        </section>

        {/* Latest Interactions & Sales Section */}
        <section className="grid gap-4 lg:grid-cols-2">
          <Suspense fallback={<ChartLoading />}>
            <InteractionsList interactions={interactions} />
          </Suspense>
          <Suspense fallback={<ChartLoading />}>
            <SalesList sales={sales} />
          </Suspense>
        </section>
      </main>
    </Layout>
  );
};
