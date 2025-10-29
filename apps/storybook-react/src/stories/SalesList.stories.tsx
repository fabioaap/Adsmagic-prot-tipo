import type { Meta, StoryObj } from "@storybook/react";
import { SalesList } from "../../../dashboard-react/src/components/SalesList";

const meta: Meta<typeof SalesList> = {
  title: "Componentes/Listas/SalesList",
  component: SalesList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: "Lista das últimas vendas fechadas, mostrando nome do cliente, plano e valor."
      }
    }
  }
};

export default meta;

type Story = StoryObj<typeof SalesList>;

const sampleSales = [
  { name: 'Adset Terra', plan: 'Plano Enterprise', amount: 'R$ 19.200' },
  { name: 'Nexo Labs', plan: 'Plano Growth', amount: 'R$ 9.680' },
  { name: 'Studio Dobra', plan: 'Plano Starter', amount: 'R$ 6.250' },
  { name: 'Orion Fit', plan: 'Plano Growth', amount: 'R$ 7.950' },
];

export const Default: Story = {
  args: {
    sales: sampleSales
  }
};

export const HighValueSales: Story = {
  args: {
    sales: [
      { name: 'TechCorp Solutions', plan: 'Plano Enterprise Plus', amount: 'R$ 45.000' },
      { name: 'Digital Innovations', plan: 'Plano Enterprise', amount: 'R$ 32.500' },
      { name: 'Future Systems', plan: 'Plano Growth Premium', amount: 'R$ 28.900' },
    ]
  }
};

export const MixedPlans: Story = {
  args: {
    sales: [
      { name: 'Startup A', plan: 'Plano Starter', amount: 'R$ 3.500' },
      { name: 'Empresa B', plan: 'Plano Growth', amount: 'R$ 12.800' },
      { name: 'Corporação C', plan: 'Plano Enterprise', amount: 'R$ 25.600' },
      { name: 'Agência D', plan: 'Plano Starter', amount: 'R$ 4.200' },
      { name: 'Consultoria E', plan: 'Plano Growth', amount: 'R$ 9.400' },
    ]
  }
};