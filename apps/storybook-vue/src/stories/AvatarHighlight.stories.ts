import type { Meta, StoryObj } from "@storybook/vue3";
import { DsAvatarHighlight } from "@adsmagic/vue";

const meta: Meta<typeof DsAvatarHighlight> = {
  title: "Componentes/Data Display/AvatarHighlight",
  component: DsAvatarHighlight,
  tags: ["autodocs"],
  args: {
    name: "João Silva",
    email: "joao.silva@empresa.com",
    stats: "R$ 45.230",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
  }
};

export default meta;

type Story = StoryObj<typeof DsAvatarHighlight>;

export const Padrao: Story = {
  render: (args) => ({
    components: { DsAvatarHighlight },
    setup() {
      return { args };
    },
    template: '<DsAvatarHighlight v-bind="args" />'
  })
};

export const SemAvatar: Story = {
  args: {
    name: "Maria Santos",
    email: "maria.santos@empresa.com",
    stats: "150 contatos"
  },
  render: (args) => ({
    components: { DsAvatarHighlight },
    setup() {
      return { args };
    },
    template: '<DsAvatarHighlight v-bind="args" />'
  })
};

export const LiderDeVendas: Story = {
  args: {
    name: "Carlos Mendes",
    email: "carlos.mendes@empresa.com",
    stats: "R$ 89.450",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face"
  },
  render: (args) => ({
    components: { DsAvatarHighlight },
    setup() {
      return { args };
    },
    template: '<DsAvatarHighlight v-bind="args" />'
  })
};

export const ComNomeLongo: Story = {
  args: {
    name: "Ana Carolina Ferreira da Silva Santos",
    email: "ana.carolina.ferreira.silva.santos@empresa.com",
    stats: "75 oportunidades",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face"
  },
  render: (args) => ({
    components: { DsAvatarHighlight },
    setup() {
      return { args };
    },
    template: '<DsAvatarHighlight v-bind="args" />'
  })
};