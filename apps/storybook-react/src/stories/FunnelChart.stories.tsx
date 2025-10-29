import type { Meta, StoryObj } from "@storybook/react";
import { FunnelChart } from "../../../dashboard-react/src/components/FunnelChart";

const meta: Meta<typeof FunnelChart> = {
  title: "Componentes/Graficos/FunnelChart",
  component: FunnelChart,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: "Funil de vendas mostrando etapas do processo com barras progressivas."
      }
    }
  }
};

export default meta;

type Story = StoryObj<typeof FunnelChart>;

const sampleStages = [
  { label: 'Contatos', value: 68, width: 100, bgColor: '#2563eb' },
  { label: 'Qualificados', value: 45, width: 66, bgColor: '#10b981' },
  { label: 'Oportunidades', value: 22, width: 33, bgColor: '#f59e0b' },
  { label: 'Fechados', value: 11, width: 17, bgColor: '#ef4444' },
];

export const Default: Story = {
  args: {
    stages: sampleStages
  }
};

export const HighConversion: Story = {
  args: {
    stages: [
      { label: 'Contatos', value: 100, width: 100, bgColor: '#2563eb' },
      { label: 'Qualificados', value: 80, width: 80, bgColor: '#10b981' },
      { label: 'Oportunidades', value: 60, width: 60, bgColor: '#f59e0b' },
      { label: 'Fechados', value: 45, width: 45, bgColor: '#ef4444' },
    ]
  }
};

export const LowConversion: Story = {
  args: {
    stages: [
      { label: 'Contatos', value: 200, width: 100, bgColor: '#2563eb' },
      { label: 'Qualificados', value: 50, width: 25, bgColor: '#10b981' },
      { label: 'Oportunidades', value: 15, width: 8, bgColor: '#f59e0b' },
      { label: 'Fechados', value: 3, width: 2, bgColor: '#ef4444' },
    ]
  }
};