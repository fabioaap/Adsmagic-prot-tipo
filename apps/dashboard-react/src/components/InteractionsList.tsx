import React from 'react';

interface Interaction {
  name: string;
  message: string;
  time: string;
  type: string;
  isRecent?: boolean;
}

interface InteractionsListProps {
  interactions: Interaction[];
}

export const InteractionsList: React.FC<InteractionsListProps> = ({ interactions }) => (
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
      {interactions.map((interaction, index) => (
        <li key={index} className={`flex items-start justify-between rounded-2xl border border-slate-100 ${interaction.isRecent ? 'bg-slate-50' : 'bg-white'} px-4 py-3`}>
          <div>
            <p className="font-medium text-slate-900">{interaction.name}</p>
            <p className="text-xs text-slate-500">{interaction.message}</p>
          </div>
          <div className="text-right text-xs text-slate-400">
            <p>{interaction.time}</p>
            <p>{interaction.type}</p>
          </div>
        </li>
      ))}
    </ul>
  </div>
);