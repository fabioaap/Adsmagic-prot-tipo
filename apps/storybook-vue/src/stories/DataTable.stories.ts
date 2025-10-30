import type { Meta, StoryObj } from "@storybook/vue3";
import { DsDataTable } from "@adsmagic/vue";

const meta: Meta<typeof DsDataTable> = {
  title: "Componentes/Data Display/DataTable",
  component: DsDataTable,
  tags: ["autodocs"],
  args: {
    rows: [
      { id: 1, name: "João Silva", email: "joao@email.com", status: "active", value: 15420 },
      { id: 2, name: "Maria Santos", email: "maria@email.com", status: "inactive", value: 8750 },
      { id: 3, name: "Carlos Mendes", email: "carlos@email.com", status: "active", value: 22300 },
      { id: 4, name: "Ana Costa", email: "ana@email.com", status: "pending", value: 12900 }
    ]
  }
};

export default meta;

type Story = StoryObj<typeof DsDataTable>;

export const Padrao: Story = {
  render: (args) => ({
    components: { DsDataTable },
    setup() {
      return { args };
    },
    template: '<DsDataTable :rows="args.rows" />'
  })
};

export const ComStatusColoridos: Story = {
  args: {
    rows: [
      { id: 1, name: "João Silva", email: "joao@email.com", status: "Ativo", value: "R$ 15.420" },
      { id: 2, name: "Maria Santos", email: "maria@email.com", status: "Inativo", value: "R$ 8.750" },
      { id: 3, name: "Carlos Mendes", email: "carlos@email.com", status: "Ativo", value: "R$ 22.300" },
      { id: 4, name: "Ana Costa", email: "ana@email.com", status: "Pendente", value: "R$ 12.900" }
    ]
  },
  render: (args) => ({
    components: { DsDataTable },
    setup() {
      return { args };
    },
    template: '<DsDataTable :rows="args.rows" />'
  })
};

export const TabelaVazia: Story = {
  args: {
    rows: []
  },
  render: (args) => ({
    components: { DsDataTable },
    setup() {
      return { args };
    },
    template: '<DsDataTable :rows="args.rows" />'
  })
};

export const ComMuitosDados: Story = {
  args: {
    rows: Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `Usuário ${i + 1}`,
      email: `usuario${i + 1}@email.com`,
      status: i % 3 === 0 ? "Ativo" : i % 3 === 1 ? "Inativo" : "Pendente",
      value: `R$ ${(Math.random() * 30000).toFixed(2)}`
    }))
  },
  render: (args) => ({
    components: { DsDataTable },
    setup() {
      return { args };
    },
    template: '<DsDataTable :rows="args.rows" />'
  })
};