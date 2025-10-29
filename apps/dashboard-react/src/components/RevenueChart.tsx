import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

interface RevenueData {
  name: string;
  value: number;
  color: string;
  [key: string]: any; // Para compatibilidade com Recharts
}

interface RevenueChartProps {
  data: RevenueData[];
}

export const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => (
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
          data={data}
          cx="100"
          cy="100"
          innerRadius={40}
          outerRadius={80}
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
      <p className="mt-4 text-sm text-slate-500">Meta mensal atingida em</p>
      <p className="text-2xl font-semibold text-slate-900">82%</p>
    </div>
  </div>
);