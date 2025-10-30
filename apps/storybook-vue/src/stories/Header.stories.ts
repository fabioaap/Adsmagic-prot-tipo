import type { Meta, StoryObj } from "@storybook/vue3";
import { DsHeader } from "@adsmagic/vue";

const meta: Meta<typeof DsHeader> = {
  title: "Componentes/Layout/Header",
  component: DsHeader,
  tags: ["autodocs"],
  args: {
    title: "Dashboard",
    subtitle: "Visão geral das suas vendas",
    metrics: [
      { label: "Total de Vendas", value: "R$ 45.230", change: "+12%" },
      { label: "Novos Contatos", value: "1.234", change: "+8%" },
      { label: "Taxa de Conversão", value: "23%", change: "+3%" }
    ]
  }
};

export default meta;

type Story = StoryObj<typeof DsHeader>;

export const Padrao: Story = {
  render: (args) => ({
    components: { DsHeader },
    setup() {
      return { args };
    },
    template: '<DsHeader :metrics="args.metrics" :title="args.title" :subtitle="args.subtitle" />'
  })
};

export const SemMetricas: Story = {
  args: {
    title: "Configurações",
    subtitle: "Gerencie suas preferências"
  },
  render: (args) => ({
    components: { DsHeader },
    setup() {
      return { args };
    },
    template: '<DsHeader :title="args.title" :subtitle="args.subtitle" />'
  })
};

export const ApenasTitulo: Story = {
  args: {
    title: "Página Simples"
  },
  render: (args) => ({
    components: { DsHeader },
    setup() {
      return { args };
    },
    template: '<DsHeader :title="args.title" />'
  })
};

export const ComMetricasNegativas: Story = {
  args: {
    title: "Relatório Mensal",
    subtitle: "Análise de performance",
    metrics: [
      { label: "Receita", value: "R$ 32.100", change: "-5%" },
      { label: "Clientes", value: "892", change: "-2%" },
      { label: "Satisfação", value: "94%", change: "+1%" }
    ]
  },
  render: (args) => ({
    components: { DsHeader },
    setup() {
      return { args };
    },
    template: '<DsHeader :metrics="args.metrics" :title="args.title" :subtitle="args.subtitle" />'
  })
};

export const ComMuitasMetricas: Story = {
  args: {
    title: "Dashboard Completo",
    subtitle: "Todas as métricas importantes",
    metrics: [
      { label: "Vendas", value: "R$ 125.430", change: "+15%" },
      { label: "Clientes", value: "2.341", change: "+22%" },
      { label: "Conversão", value: "34%", change: "+5%" },
      { label: "Satisfação", value: "96%", change: "+2%" },
      { label: "Retenção", value: "78%", change: "-1%" }
    ]
  },
  render: (args) => ({
    components: { DsHeader },
    setup() {
      return { args };
    },
    template: '<DsHeader :metrics="args.metrics" :title="args.title" :subtitle="args.subtitle" />'
  })
};