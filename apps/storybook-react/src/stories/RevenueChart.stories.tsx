import type { Meta, StoryObj } from "@storybook/react";
import { RevenueChart } from "../../../dashboard-react/src/components/RevenueChart";

const meta: Meta<typeof RevenueChart> = {
  title: "Componentes/Graficos/RevenueChart",
  component: RevenueChart,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: "Gráfico de pizza mostrando receita atingida vs restante da meta."
      }
    }
  }
};

export default meta;

type Story = StoryObj<typeof RevenueChart>;

const sampleData = [
  { name: 'Atingido', value: 82, color: '#2563eb' },
  { name: 'Restante', value: 18, color: '#10b981' },
];

export const Default: Story = {
  args: {
    data: sampleData
  }
};

export const HighAchievement: Story = {
  args: {
    data: [
      { name: 'Atingido', value: 95, color: '#2563eb' },
      { name: 'Restante', value: 5, color: '#10b981' },
    ]
  }
};

export const LowAchievement: Story = {
  args: {
    data: [
      { name: 'Atingido', value: 45, color: '#2563eb' },
      { name: 'Restante', value: 55, color: '#10b981' },
    ]
  }
};