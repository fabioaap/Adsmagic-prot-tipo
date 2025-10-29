import type { Meta, StoryObj } from "@storybook/vue3";
import { DsContactsSalesChart } from "@adsmagic/vue";

const meta: Meta<typeof DsContactsSalesChart> = {
  title: "Componentes/Graficos/ContactsSalesChart",
  component: DsContactsSalesChart,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: "Gráfico de linha mostrando contatos e vendas por semana."
      }
    }
  }
};

export default meta;

type Story = StoryObj<typeof DsContactsSalesChart>;

const sampleData = [
  { week: 'Fev', contacts: 200, sales: 50 },
  { week: 'Mar', contacts: 250, sales: 65 },
  { week: 'Abr', contacts: 220, sales: 55 },
  { week: 'Mai', contacts: 273, sales: 78 },
];

export const Default: Story = {
  render: (args) => ({
    components: { DsContactsSalesChart },
    setup() {
      return { args };
    },
    template: '<DsContactsSalesChart :data="args.data" />'
  }),
  args: {
    data: sampleData
  }
};

export const HighVolume: Story = {
  render: (args) => ({
    components: { DsContactsSalesChart },
    setup() {
      return { args };
    },
    template: '<DsContactsSalesChart :data="args.data" />'
  }),
  args: {
    data: [
      { week: 'Fev', contacts: 500, sales: 120 },
      { week: 'Mar', contacts: 600, sales: 150 },
      { week: 'Abr', contacts: 550, sales: 130 },
      { week: 'Mai', contacts: 700, sales: 180 },
    ]
  }
};

export const LowVolume: Story = {
  render: (args) => ({
    components: { DsContactsSalesChart },
    setup() {
      return { args };
    },
    template: '<DsContactsSalesChart :data="args.data" />'
  }),
  args: {
    data: [
      { week: 'Fev', contacts: 50, sales: 10 },
      { week: 'Mar', contacts: 75, sales: 15 },
      { week: 'Abr', contacts: 60, sales: 12 },
      { week: 'Mai', contacts: 80, sales: 18 },
    ]
  }
};