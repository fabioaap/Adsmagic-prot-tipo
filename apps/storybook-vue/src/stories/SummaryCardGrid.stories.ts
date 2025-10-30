import type { Meta, StoryObj } from "@storybook/vue3";
import { DsSummaryCardGrid } from "@adsmagic/vue";

const meta: Meta<typeof DsSummaryCardGrid> = {
  title: "Componentes/Layout/SummaryCardGrid",
  component: DsSummaryCardGrid,
  tags: ["autodocs"],
  args: {
    cards: [
      {
        title: "Total de Vendas",
        value: "R$ 45.230",
        change: "+12%",
        changeType: "positive",
        icon: "trending-up"
      },
      {
        title: "Novos Contatos",
        value: "1.234",
        change: "+8%",
        changeType: "positive",
        icon: "users"
      },
      {
        title: "Taxa de Conversão",
        value: "23%",
        change: "+3%",
        changeType: "positive",
        icon: "target"
      },
      {
        title: "Ticket Médio",
        value: "R$ 185",
        change: "-2%",
        changeType: "negative",
        icon: "dollar-sign"
      }
    ]
  }
};

export default meta;

type Story = StoryObj<typeof DsSummaryCardGrid>;

export const Padrao: Story = {
  render: (args) => ({
    components: { DsSummaryCardGrid },
    setup() {
      return { args };
    },
    template: '<DsSummaryCardGrid :cards="args.cards" />'
  })
};

export const TresColunas: Story = {
  args: {
    columns: 3,
    cards: [
      {
        title: "Receita",
        value: "R$ 125.430",
        change: "+15%",
        changeType: "positive",
        icon: "dollar-sign"
      },
      {
        title: "Clientes",
        value: "2.341",
        change: "+22%",
        changeType: "positive",
        icon: "users"
      },
      {
        title: "Conversão",
        value: "34%",
        change: "+5%",
        changeType: "positive",
        icon: "target"
      }
    ]
  },
  render: (args) => ({
    components: { DsSummaryCardGrid },
    setup() {
      return { args };
    },
    template: '<DsSummaryCardGrid :cards="args.cards" :columns="args.columns" />'
  })
};

export const ComVariacoesNegativas: Story = {
  args: {
    cards: [
      {
        title: "Vendas Mensais",
        value: "R$ 32.100",
        change: "-5%",
        changeType: "negative",
        icon: "trending-down"
      },
      {
        title: "Clientes Ativos",
        value: "892",
        change: "-2%",
        changeType: "negative",
        icon: "user-minus"
      },
      {
        title: "Taxa de Retenção",
        value: "78%",
        change: "-1%",
        changeType: "negative",
        icon: "user-x"
      },
      {
        title: "Satisfação",
        value: "94%",
        change: "+1%",
        changeType: "positive",
        icon: "smile"
      }
    ]
  },
  render: (args) => ({
    components: { DsSummaryCardGrid },
    setup() {
      return { args };
    },
    template: '<DsSummaryCardGrid :cards="args.cards" />'
  })
};

export const SemIcones: Story = {
  args: {
    cards: [
      {
        title: "Total de Pedidos",
        value: "1.567",
        change: "+18%",
        changeType: "positive"
      },
      {
        title: "Valor Médio",
        value: "R$ 89,90",
        change: "+7%",
        changeType: "positive"
      },
      {
        title: "Tempo Médio",
        value: "2,3 min",
        change: "-12%",
        changeType: "positive"
      }
    ]
  },
  render: (args) => ({
    components: { DsSummaryCardGrid },
    setup() {
      return { args };
    },
    template: '<DsSummaryCardGrid :cards="args.cards" />'
  })
};

export const DashboardCompleto: Story = {
  args: {
    columns: 4,
    cards: [
      {
        title: "Receita Total",
        value: "R$ 1.234.567",
        change: "+23%",
        changeType: "positive",
        icon: "dollar-sign"
      },
      {
        title: "Novos Clientes",
        value: "456",
        change: "+31%",
        changeType: "positive",
        icon: "user-plus"
      },
      {
        title: "Taxa de Conversão",
        value: "12,5%",
        change: "+8%",
        changeType: "positive",
        icon: "target"
      },
      {
        title: "Satisfação",
        value: "4,8/5",
        change: "+0,2",
        changeType: "positive",
        icon: "star"
      },
      {
        title: "Tempo de Resposta",
        value: "1,2h",
        change: "-15%",
        changeType: "positive",
        icon: "clock"
      },
      {
        title: "Taxa de Retenção",
        value: "87%",
        change: "+3%",
        changeType: "positive",
        icon: "repeat"
      },
      {
        title: "Custos Operacionais",
        value: "R$ 45.230",
        change: "-8%",
        changeType: "positive",
        icon: "trending-down"
      },
      {
        title: "ROI",
        value: "340%",
        change: "+12%",
        changeType: "positive",
        icon: "bar-chart"
      }
    ]
  },
  render: (args) => ({
    components: { DsSummaryCardGrid },
    setup() {
      return { args };
    },
    template: '<DsSummaryCardGrid :cards="args.cards" :columns="args.columns" />'
  })
};