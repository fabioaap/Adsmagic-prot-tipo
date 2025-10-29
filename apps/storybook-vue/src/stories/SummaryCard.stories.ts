import type { Meta, StoryObj } from "@storybook/vue3";
import { DsSummaryCard } from "@adsmagic/vue";

const meta: Meta<typeof DsSummaryCard> = {
  title: "Componentes/Conteudo/SummaryCard",
  component: DsSummaryCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: "Card de resumo usado para exibir métricas com valor, legenda e badge de variação."
      }
    }
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Título da métrica'
    },
    value: {
      control: 'text',
      description: 'Valor principal da métrica'
    },
    caption: {
      control: 'text',
      description: 'Descrição adicional da métrica'
    },
    badge: {
      control: 'text',
      description: 'Texto do badge de variação'
    },
    badgeType: {
      control: { type: 'select' },
      options: ['positive', 'negative'],
      description: 'Tipo do badge (positivo ou negativo)'
    }
  }
};

export default meta;

type Story = StoryObj<typeof DsSummaryCard>;

export const Default: Story = {
  render: (args) => ({
    components: { DsSummaryCard },
    setup() {
      return { args };
    },
    template: '<DsSummaryCard v-bind="args" />'
  }),
  args: {
    label: "Receita",
    value: "R$ 6.060,00",
    caption: "Receita total atribuída.",
    badge: "+9,8%",
    badgeType: "positive"
  }
};

export const Positive: Story = {
  render: (args) => ({
    components: { DsSummaryCard },
    setup() {
      return { args };
    },
    template: '<DsSummaryCard v-bind="args" />'
  }),
  args: {
    label: "Gastos anúncios",
    value: "R$ 784,21",
    caption: "Investimento do período.",
    badge: "+4,3%",
    badgeType: "positive"
  }
};

export const Negative: Story = {
  render: (args) => ({
    components: { DsSummaryCard },
    setup() {
      return { args };
    },
    template: '<DsSummaryCard v-bind="args" />'
  }),
  args: {
    label: "Custo por venda",
    value: "R$ 98,00",
    caption: "Aquisição média por venda.",
    badge: "-3,1%",
    badgeType: "negative"
  }
};

export const LargeValue: Story = {
  render: (args) => ({
    components: { DsSummaryCard },
    setup() {
      return { args };
    },
    template: '<DsSummaryCard v-bind="args" />'
  }),
  args: {
    label: "Clientes ativos",
    value: "206",
    caption: "Renovações previstas: 14",
    badge: "+3,8%",
    badgeType: "positive"
  }
};