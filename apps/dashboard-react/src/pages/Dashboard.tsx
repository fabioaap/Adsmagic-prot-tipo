import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { Layout } from '../components/Layout';

interface SummaryCardProps {
  label: string;
  value: string;
  caption: string;
  badge: string;
  badgeType: 'positive' | 'negative';
}

interface ChannelData {
  name: string;
  percentage: number;
  color: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ label, value, caption, badge, badgeType }) => (
  <article className="summary-card card-shadow">
    <header className="summary-card-header">
      <p className="summary-card-label">{label}</p>
      <span className={`summary-card-badge summary-card-badge--${badgeType === 'positive' ? 'positive' : 'negative'}`}>
        {badge}
      </span>
    </header>
    <p className="summary-card-value">{value}</p>
    <p className="summary-card-caption">{caption}</p>
  </article>
);

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

  const channelsData: ChannelData[] = [
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

  return (
    <Layout>
      <main className="app-main" style={{ paddingTop: '140px' }}>
        {/* Summary Cards Grid */}
        <section className="summary-grid">
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
          <SummaryCard label="Clientes ativos" value="206" caption="Renovações previstas: 14" badge="+3,8%" badgeType="positive" />
        </section>

        {/* Charts Section 1 - Contacts/Sales + Revenue */}
        <section className="grid gap-4 lg:grid-cols-[2fr_1fr]">
          {/* Contatos e Vendas */}
          <div className="card-shadow rounded-3xl border border-slate-200 bg-white p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Contatos e Vendas</h2>
                <p className="text-xs text-slate-500">Volume por semana</p>
              </div>
              <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50">
                Exportar CSV
              </button>
            </div>
            <div className="mt-6 flex items-end gap-6">
              <div className="flex-1">
                <div className="h-56 overflow-auto">
                  <LineChart data={contactsSalesData} width={500} height={200} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="contacts" stroke="#2563eb" strokeWidth={2} />
                    <Line type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" />
                  </LineChart>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                  <span>Fev</span>
                  <span>Mar</span>
                  <span>Abr</span>
                  <span>Mai</span>
                </div>
              </div>
              <div className="flex w-36 flex-col gap-4 text-xs text-slate-500">
                <div>
                  <p className="font-semibold text-slate-900">Contatos</p>
                  <p>Semana atual</p>
                  <p className="text-base font-semibold text-indigo-600">273</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Vendas</p>
                  <p>Semana atual</p>
                  <p className="text-base font-semibold text-emerald-500">78</p>
                </div>
              </div>
            </div>
          </div>

          {/* Receita */}
          <div className="card-shadow flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Receita</h2>
                <p className="text-xs text-slate-500">Comparativo com meta</p>
              </div>
              <span className="summary-card-badge summary-card-badge--positive">+5,3%</span>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center">
              <PieChart width={200} height={200}>
                <Pie
                  data={revenueData}
                  cx="100"
                  cy="100"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {revenueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
              <p className="mt-4 text-sm text-slate-500">Meta mensal atingida em</p>
              <p className="text-2xl font-semibold text-slate-900">82%</p>
            </div>
          </div>
        </section>

        {/* Charts Section 2 - Channels and Funnel */}
        <section className="grid gap-4 lg:grid-cols-2">
          {/* Vendas por Canal */}
          <div className="card-shadow rounded-3xl border border-slate-200 bg-white p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Vendas por canal</h2>
                <p className="text-xs text-slate-500">Distribuição de vendas por canal.</p>
              </div>
              <span className="badge-soft">Total de vendas R$</span>
            </div>
            <div className="flex items-center gap-8">
              {/* Donut Chart */}
              <div className="flex-shrink-0">
                <svg viewBox="0 0 200 200" style={{ height: '180px', width: '180px' }}>
                  {channelsData.map((channel, index) => {
                    const circumference = 2 * Math.PI * 70;
                    let offset = 0;
                    for (let i = 0; i < index; i++) {
                      offset += (channelsData[i].percentage / 100) * circumference;
                    }
                    const strokeDasharray = (channel.percentage / 100) * circumference;
                    return (
                      <circle
                        key={channel.name}
                        cx="100"
                        cy="100"
                        r="70"
                        fill="none"
                        stroke={channel.color}
                        strokeWidth="20"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={-offset}
                      />
                    );
                  })}
                </svg>
              </div>
              {/* Legend */}
              <div className="flex flex-col gap-2 text-xs">
                {channelsData.map((channel) => (
                  <div key={channel.name} className="flex items-center gap-2">
                    <div 
                      className="h-2 w-2 rounded-full" 
                      style={{ backgroundColor: channel.color, flexShrink: 0 }}
                    ></div>
                    <span className="text-slate-600">{channel.name}</span>
                    <span className="ml-auto font-semibold text-slate-900">{channel.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Funil de Vendas */}
          <div className="card-shadow rounded-3xl border border-slate-200 bg-white p-6">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Funil de vendas</h2>
                <p className="text-xs text-slate-500">Etapas do processo de vendas.</p>
              </div>
            </div>
            <div className="funnel-chart">
              {funnelStages.map((stage, index) => (
                <div key={index} className="funnel-stage">
                  <div 
                    className="funnel-stage-bar"
                    style={{
                      '--stage-width': `${stage.width}%`,
                      '--stage-color': stage.bgColor,
                      '--stage-color-soft': stage.bgColor + '99',
                    } as React.CSSProperties}
                  >
                    <div>
                      <p className="funnel-stage-name">{stage.label}</p>
                      <p className="funnel-stage-caption">Contatos: 68 leads</p>
                    </div>
                    <div className="funnel-stage-values">
                      <p className="funnel-stage-count">{stage.value}</p>
                      <p className="funnel-stage-percentage">{Math.round((stage.value / 68) * 100)}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Interactions & Sales Section */}
        <section className="grid gap-4 lg:grid-cols-2">
          {/* Últimas Interações */}
          <div className="card-shadow rounded-3xl border border-slate-200 bg-white p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Últimas interações</h2>
                <p className="text-xs text-slate-500">Comunicações mais recentes com prospects.</p>
              </div>
              <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50">
                Ver histórico
              </button>
            </div>
            <ul className="mt-6 space-y-4 text-sm text-slate-600">
              <li className="flex items-start justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                <div>
                  <p className="font-medium text-slate-900">Gabriel Torres</p>
                  <p className="text-xs text-slate-500">Solicitou proposta atualizada</p>
                </div>
                <div className="text-right text-xs text-slate-400">
                  <p>12:45</p>
                  <p>Chat</p>
                </div>
              </li>
              <li className="flex items-start justify-between rounded-2xl border border-slate-100 bg-white px-4 py-3">
                <div>
                  <p className="font-medium text-slate-900">Ana Carvalho</p>
                  <p className="text-xs text-slate-500">E-mail sobre onboarding</p>
                </div>
                <div className="text-right text-xs text-slate-400">
                  <p>Ontem</p>
                  <p>Email</p>
                </div>
              </li>
              <li className="flex items-start justify-between rounded-2xl border border-slate-100 bg-white px-4 py-3">
                <div>
                  <p className="font-medium text-slate-900">Estúdio Pluma</p>
                  <p className="text-xs text-slate-500">Solicitou demonstração</p>
                </div>
                <div className="text-right text-xs text-slate-400">
                  <p>Ontem</p>
                  <p>Ligação</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Últimas Vendas */}
          <div className="card-shadow rounded-3xl border border-slate-200 bg-white p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Últimas vendas</h2>
                <p className="text-xs text-slate-500">Negócios fechados recentemente.</p>
              </div>
              <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50">
                Exportar
              </button>
            </div>
            <ul className="mt-6 space-y-3 text-sm text-slate-600">
              <li className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-4 py-3">
                <div>
                  <p className="font-medium text-slate-900">Adset Terra</p>
                  <p className="text-xs text-slate-500">Plano Enterprise</p>
                </div>
                <p className="text-sm font-semibold text-slate-900">R$ 19.200</p>
              </li>
              <li className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-4 py-3">
                <div>
                  <p className="font-medium text-slate-900">Nexo Labs</p>
                  <p className="text-xs text-slate-500">Plano Growth</p>
                </div>
                <p className="text-sm font-semibold text-slate-900">R$ 9.680</p>
              </li>
              <li className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-4 py-3">
                <div>
                  <p className="font-medium text-slate-900">Studio Dobra</p>
                  <p className="text-xs text-slate-500">Plano Starter</p>
                </div>
                <p className="text-sm font-semibold text-slate-900">R$ 6.250</p>
              </li>
              <li className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-4 py-3">
                <div>
                  <p className="font-medium text-slate-900">Orion Fit</p>
                  <p className="text-xs text-slate-500">Plano Growth</p>
                </div>
                <p className="text-sm font-semibold text-slate-900">R$ 7.950</p>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </Layout>
  );
};
