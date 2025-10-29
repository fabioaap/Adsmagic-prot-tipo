import type { Meta, StoryObj } from "@storybook/react";
import { ContactsSalesChart } from "../../../dashboard-react/src/components/ContactsSalesChart";

const meta: Meta<typeof ContactsSalesChart> = {
  title: "Componentes/Graficos/ContactsSalesChart",
  component: ContactsSalesChart,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: "Gráfico de linha mostrando contatos e vendas por semana com estatísticas laterais."
      }
    }
  }
};

export default meta;

type Story = StoryObj<typeof ContactsSalesChart>;

const sampleData = [
  { week: 'Fev', contacts: 200, sales: 50 },
  { week: 'Mar', contacts: 250, sales: 65 },
  { week: 'Abr', contacts: 220, sales: 55 },
  { week: 'Mai', contacts: 273, sales: 78 },
];

export const Default: Story = {
  args: {
    data: sampleData
  }
};

export const IncreasingTrend: Story = {
  args: {
    data: [
      { week: 'Sem1', contacts: 150, sales: 30 },
      { week: 'Sem2', contacts: 180, sales: 45 },
      { week: 'Sem3', contacts: 220, sales: 60 },
      { week: 'Sem4', contacts: 280, sales: 85 },
    ]
  }
};

export const DecliningTrend: Story = {
  args: {
    data: [
      { week: 'Sem1', contacts: 300, sales: 90 },
      { week: 'Sem2', contacts: 250, sales: 70 },
      { week: 'Sem3', contacts: 200, sales: 50 },
      { week: 'Sem4', contacts: 150, sales: 30 },
    ]
  }
};