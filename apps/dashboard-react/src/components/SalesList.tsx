import React from 'react';

interface Sale {
  name: string;
  plan: string;
  amount: string;
}

interface SalesListProps {
  sales: Sale[];
}

export const SalesList: React.FC<SalesListProps> = ({ sales }) => (
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
      {sales.map((sale, index) => (
        <li key={index} className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-4 py-3">
          <div>
            <p className="font-medium text-slate-900">{sale.name}</p>
            <p className="text-xs text-slate-500">{sale.plan}</p>
          </div>
          <p className="text-sm font-semibold text-slate-900">{sale.amount}</p>
        </li>
      ))}
    </ul>
  </div>
);