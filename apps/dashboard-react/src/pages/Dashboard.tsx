import {
  Layout,
  SummaryCard,
  ContactsSalesChart,
  RevenueChart,
  ChannelsChart,
  FunnelChart,
  InteractionsList,
  SalesList
} from '../components';

export const Dashboard = () => {
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

        {/* Charts Section 1 - Contacts/Sales + Revenue */}
        <section className="grid gap-4 lg:grid-cols-[2fr_1fr]">
          <ContactsSalesChart data={contactsSalesData} />
          <RevenueChart data={revenueData} />
        </section>

        {/* Charts Section 2 - Channels and Funnel */}
        <section className="grid gap-4 lg:grid-cols-2">
          <ChannelsChart data={channelsData} />
          <FunnelChart stages={funnelStages} />
        </section>

        {/* Latest Interactions & Sales Section */}
        <section className="grid gap-4 lg:grid-cols-2">
          <InteractionsList interactions={interactions} />
          <SalesList sales={sales} />
        </section>
      </main>
    </Layout>
  );
};
