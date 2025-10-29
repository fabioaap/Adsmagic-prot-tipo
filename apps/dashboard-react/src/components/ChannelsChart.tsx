import React from 'react';

interface ChannelData {
  name: string;
  percentage: number;
  color: string;
}

interface ChannelsChartProps {
  data: ChannelData[];
}

export const ChannelsChart: React.FC<ChannelsChartProps> = ({ data }) => (
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
          {data.map((channel, index) => {
            const circumference = 2 * Math.PI * 70;
            let offset = 0;
            for (let i = 0; i < index; i++) {
              offset += (data[i].percentage / 100) * circumference;
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
        {data.map((channel) => (
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
);