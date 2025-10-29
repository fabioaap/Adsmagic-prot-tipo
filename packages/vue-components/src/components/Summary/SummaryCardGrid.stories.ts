import type { Meta, StoryObj } from "@storybook/vue3";
import SummaryCardGrid from "./SummaryCardGrid.vue";

const meta = {
  title: "Components/SummaryCardGrid",
  component: SummaryCardGrid,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SummaryCardGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    cards: [
      { label: "Receita gerada", value: "R$ 482k", delta: "+24%", tone: "positive" },
      { label: "Leads qualificados", value: "1.284", delta: "+9%", tone: "positive" },
      { label: "CPL médio", value: "R$ 32,10", delta: "-5%", tone: "positive" },
      { label: "Ticket de vendas", value: "R$ 1.120", delta: "+3%", tone: "neutral" },
    ],
  },
};

export const TwoCards: Story = {
  args: {
    cards: [
      { label: "Total de vendas", value: "R$ 128k", delta: "+12%", tone: "positive" },
      { label: "Conversões", value: "342", delta: "-3%", tone: "negative" },
    ],
  },
};

export const MixedTones: Story = {
  args: {
    cards: [
      { label: "ROI", value: "4.8x", delta: "+18%", tone: "positive" },
      { label: "CAC", value: "R$ 245", delta: "+8%", tone: "negative" },
      { label: "LTV", value: "R$ 1.8k", delta: "0%", tone: "neutral" },
    ],
  },
};

export const SixCards: Story = {
  args: {
    cards: [
      { label: "Impressões", value: "2.4M", delta: "+15%", tone: "positive" },
      { label: "Cliques", value: "48k", delta: "+12%", tone: "positive" },
      { label: "CTR", value: "2.8%", delta: "+0.3pp", tone: "positive" },
      { label: "Conversões", value: "1.2k", delta: "+8%", tone: "positive" },
      { label: "Taxa de conversão", value: "2.5%", delta: "-0.2pp", tone: "negative" },
      { label: "CPC", value: "R$ 1.24", delta: "-5%", tone: "positive" },
    ],
  },
};
