import React from 'react';

interface FunnelStage {
  label: string;
  value: number;
  width: number;
  bgColor: string;
}

interface FunnelChartProps {
  stages: FunnelStage[];
}

export const FunnelChart: React.FC<FunnelChartProps> = ({ stages }) => (
  <div className="card-shadow rounded-3xl border border-slate-200 bg-white p-6">
    <div className="mb-6 flex items-start justify-between">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Funil de vendas</h2>
        <p className="text-xs text-slate-500">Etapas do processo de vendas.</p>
      </div>
    </div>
    <div className="funnel-chart">
      {stages.map((stage, index) => (
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
);