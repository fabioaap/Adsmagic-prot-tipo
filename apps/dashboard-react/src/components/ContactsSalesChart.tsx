import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface ContactsSalesData {
  week: string;
  contacts: number;
  sales: number;
}

interface ContactsSalesChartProps {
  data: ContactsSalesData[];
}

export const ContactsSalesChart: React.FC<ContactsSalesChartProps> = ({ data }) => (
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
          <LineChart data={data} width={500} height={200} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
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
);