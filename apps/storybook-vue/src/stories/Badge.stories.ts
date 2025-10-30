import type { Meta, StoryObj } from "@storybook/vue3";
import { DsBadge } from "@adsmagic/vue";

const meta: Meta<typeof DsBadge> = {
  title: "Componentes/Data Display/Badge",
  component: DsBadge,
  tags: ["autodocs"],
  args: {
    variant: "default",
    children: "Ativo"
  }
};

export default meta;

type Story = StoryObj<typeof DsBadge>;

export const Padrao: Story = {
  render: (args) => ({
    components: { DsBadge },
    setup() {
      return { args };
    },
    template: '<DsBadge v-bind="args">{{ args.children }}</DsBadge>'
  })
};

export const Sucesso: Story = {
  args: {
    variant: "success",
    children: "Aprovado"
  },
  render: (args) => ({
    components: { DsBadge },
    setup() {
      return { args };
    },
    template: '<DsBadge v-bind="args">{{ args.children }}</DsBadge>'
  })
};

export const Aviso: Story = {
  args: {
    variant: "warning",
    children: "Pendente"
  },
  render: (args) => ({
    components: { DsBadge },
    setup() {
      return { args };
    },
    template: '<DsBadge v-bind="args">{{ args.children }}</DsBadge>'
  })
};

export const Erro: Story = {
  args: {
    variant: "danger",
    children: "Rejeitado"
  },
  render: (args) => ({
    components: { DsBadge },
    setup() {
      return { args };
    },
    template: '<DsBadge v-bind="args">{{ args.children }}</DsBadge>'
  })
};

export const Info: Story = {
  args: {
    variant: "info",
    children: "Novo"
  },
  render: (args) => ({
    components: { DsBadge },
    setup() {
      return { args };
    },
    template: '<DsBadge v-bind="args">{{ args.children }}</DsBadge>'
  })
};

export const TextoLongo: Story = {
  args: {
    variant: "default",
    children: "Status muito longo para teste"
  },
  render: (args) => ({
    components: { DsBadge },
    setup() {
      return { args };
    },
    template: '<DsBadge v-bind="args">{{ args.children }}</DsBadge>'
  })
};