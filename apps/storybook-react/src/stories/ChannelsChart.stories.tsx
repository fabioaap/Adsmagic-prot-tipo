import type { Meta, StoryObj } from "@storybook/react";
import { ChannelsChart } from "../../../dashboard-react/src/components/ChannelsChart";

const meta: Meta<typeof ChannelsChart> = {
  title: "Componentes/Graficos/ChannelsChart",
  component: ChannelsChart,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: "Gráfico donut personalizado mostrando distribuição de vendas por canal."
      }
    }
  }
};

export default meta;

type Story = StoryObj<typeof ChannelsChart>;

const sampleData = [
  { name: 'Google Ads', percentage: 55, color: '#4f46e5' },
  { name: 'Meta Ads', percentage: 18, color: '#f97316' },
  { name: 'TikTok Ads', percentage: 12, color: '#10b981' },
  { name: 'Orgânico', percentage: 8, color: '#f59e0b' },
  { name: 'Direto', percentage: 5, color: '#a855f7' },
  { name: 'Outros', percentage: 2, color: '#6b7280' },
];

export const Default: Story = {
  args: {
    data: sampleData
  }
};

export const GoogleDominant: Story = {
  args: {
    data: [
      { name: 'Google Ads', percentage: 70, color: '#4f46e5' },
      { name: 'Meta Ads', percentage: 15, color: '#f97316' },
      { name: 'Orgânico', percentage: 10, color: '#f59e0b' },
      { name: 'Direto', percentage: 5, color: '#a855f7' },
    ]
  }
};

export const BalancedChannels: Story = {
  args: {
    data: [
      { name: 'Google Ads', percentage: 25, color: '#4f46e5' },
      { name: 'Meta Ads', percentage: 25, color: '#f97316' },
      { name: 'TikTok Ads', percentage: 20, color: '#10b981' },
      { name: 'Orgânico', percentage: 15, color: '#f59e0b' },
      { name: 'Direto', percentage: 10, color: '#a855f7' },
      { name: 'Outros', percentage: 5, color: '#6b7280' },
    ]
  }
};