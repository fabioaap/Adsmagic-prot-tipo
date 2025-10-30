import type { Meta, StoryObj } from "@storybook/vue3";
import { DsStatusDropdown } from "@adsmagic/vue";

const meta: Meta<typeof DsStatusDropdown> = {
  title: "Componentes/Form/StatusDropdown",
  component: DsStatusDropdown,
  tags: ["autodocs"],
  args: {
    modelValue: "active",
    options: [
      { value: "active", label: "Ativo", color: "success" },
      { value: "inactive", label: "Inativo", color: "neutral" },
      { value: "pending", label: "Pendente", color: "warning" },
      { value: "blocked", label: "Bloqueado", color: "error" }
    ]
  },
  argTypes: {
    "update:modelValue": { action: "update:modelValue" }
  }
};

export default meta;

type Story = StoryObj<typeof DsStatusDropdown>;

export const Padrao: Story = {
  render: (args) => ({
    components: { DsStatusDropdown },
    setup() {
      return { args };
    },
    template: `
      <DsStatusDropdown
        v-model="args.modelValue"
        :options="args.options"
        @update:modelValue="args['update:modelValue']"
      />
    `
  })
};

export const ComDescricao: Story = {
  args: {
    modelValue: "active",
    options: [
      { value: "active", label: "Ativo", description: "Cliente ativo e engajado", color: "success" },
      { value: "inactive", label: "Inativo", description: "Cliente sem atividade recente", color: "neutral" },
      { value: "pending", label: "Pendente", description: "Aguardando aprovação", color: "warning" },
      { value: "blocked", label: "Bloqueado", description: "Cliente bloqueado por inadimplência", color: "error" }
    ]
  },
  render: (args) => ({
    components: { DsStatusDropdown },
    setup() {
      return { args };
    },
    template: `
      <DsStatusDropdown
        v-model="args.modelValue"
        :options="args.options"
        @update:modelValue="args['update:modelValue']"
      />
    `
  })
};

export const EstadosVendas: Story = {
  args: {
    modelValue: "qualified",
    options: [
      { value: "new", label: "Novo Lead", color: "info" },
      { value: "contacted", label: "Contatado", color: "warning" },
      { value: "qualified", label: "Qualificado", color: "success" },
      { value: "proposal", label: "Proposta Enviada", color: "primary" },
      { value: "negotiation", label: "Em Negociação", color: "warning" },
      { value: "closed-won", label: "Ganho", color: "success" },
      { value: "closed-lost", label: "Perdido", color: "error" }
    ]
  },
  render: (args) => ({
    components: { DsStatusDropdown },
    setup() {
      return { args };
    },
    template: `
      <DsStatusDropdown
        v-model="args.modelValue"
        :options="args.options"
        @update:modelValue="args['update:modelValue']"
      />
    `
  })
};

export const EstadosProjeto: Story = {
  args: {
    modelValue: "in-progress",
    options: [
      { value: "planning", label: "Planejamento", color: "info" },
      { value: "in-progress", label: "Em Andamento", color: "primary" },
      { value: "review", label: "Em Revisão", color: "warning" },
      { value: "completed", label: "Concluído", color: "success" },
      { value: "on-hold", label: "Pausado", color: "neutral" },
      { value: "cancelled", label: "Cancelado", color: "error" }
    ]
  },
  render: (args) => ({
    components: { DsStatusDropdown },
    setup() {
      return { args };
    },
    template: `
      <DsStatusDropdown
        v-model="args.modelValue"
        :options="args.options"
        @update:modelValue="args['update:modelValue']"
      />
    `
  })
};

export const EstadosSuporte: Story = {
  args: {
    modelValue: "open",
    options: [
      { value: "open", label: "Aberto", color: "error" },
      { value: "in-progress", label: "Em Atendimento", color: "warning" },
      { value: "waiting-customer", label: "Aguardando Cliente", color: "info" },
      { value: "resolved", label: "Resolvido", color: "success" },
      { value: "closed", label: "Fechado", color: "neutral" }
    ]
  },
  render: (args) => ({
    components: { DsStatusDropdown },
    setup() {
      return { args };
    },
    template: `
      <DsStatusDropdown
        v-model="args.modelValue"
        :options="args.options"
        @update:modelValue="args['update:modelValue']"
      />
    `
  })
};