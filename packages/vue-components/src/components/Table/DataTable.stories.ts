import type { Meta, StoryObj } from "@storybook/vue3";
import DataTable from "./DataTable.vue";

const meta = {
  title: "Components/DataTable",
  component: DataTable,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    rows: [
      { campaign: "Always-on Leads Latam", status: "Ativa", budget: "R$ 32.000", cpa: "R$ 28,50", updatedAt: "há 2h" },
      { campaign: "Black Friday Awareness", status: "Pausada", budget: "R$ 18.500", cpa: "R$ 35,20", updatedAt: "há 1d" },
      { campaign: "Retenção base CRM", status: "Ativa", budget: "R$ 12.000", cpa: "R$ 18,70", updatedAt: "há 4h" },
      { campaign: "Teste criativos short", status: "Rascunho", budget: "-", cpa: "-", updatedAt: "há 15min" },
    ],
  },
};

export const Empty: Story = {
  args: {
    rows: [],
  },
};

export const SingleRow: Story = {
  args: {
    rows: [
      { campaign: "Campanha Principal", status: "Ativa", budget: "R$ 50.000", cpa: "R$ 22,00", updatedAt: "há 1h" },
    ],
  },
};

export const ManyRows: Story = {
  args: {
    rows: [
      { campaign: "Campanha A", status: "Ativa", budget: "R$ 10.000", cpa: "R$ 15,00", updatedAt: "há 30min" },
      { campaign: "Campanha B", status: "Pausada", budget: "R$ 8.500", cpa: "R$ 20,50", updatedAt: "há 2h" },
      { campaign: "Campanha C", status: "Ativa", budget: "R$ 12.000", cpa: "R$ 18,00", updatedAt: "há 1d" },
      { campaign: "Campanha D", status: "Rascunho", budget: "-", cpa: "-", updatedAt: "há 5min" },
      { campaign: "Campanha E", status: "Ativa", budget: "R$ 25.000", cpa: "R$ 30,00", updatedAt: "há 3h" },
      { campaign: "Campanha F", status: "Pausada", budget: "R$ 5.000", cpa: "R$ 12,00", updatedAt: "há 2d" },
      { campaign: "Campanha G", status: "Ativa", budget: "R$ 15.000", cpa: "R$ 25,00", updatedAt: "há 4h" },
    ],
  },
};
