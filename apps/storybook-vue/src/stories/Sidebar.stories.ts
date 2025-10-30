import type { Meta, StoryObj } from "@storybook/vue3";
import { DsSidebar } from "@adsmagic/vue";

const meta: Meta<typeof DsSidebar> = {
  title: "Componentes/Layout/Sidebar",
  component: DsSidebar,
  tags: ["autodocs"],
  args: {
    items: [
      { label: "Dashboard", icon: "dashboard", href: "/dashboard", active: true },
      { label: "Vendas", icon: "sales", href: "/vendas" },
      { label: "Contatos", icon: "contacts", href: "/contatos" },
      { label: "Relatórios", icon: "reports", href: "/relatorios" },
      { label: "Configurações", icon: "settings", href: "/configuracoes" }
    ]
  }
};

export default meta;

type Story = StoryObj<typeof DsSidebar>;

export const Padrao: Story = {
  render: (args) => ({
    components: { DsSidebar },
    setup() {
      return { args };
    },
    template: '<DsSidebar :items="args.items" />'
  })
};

export const ComSubmenus: Story = {
  args: {
    items: [
      { label: "Dashboard", icon: "dashboard", href: "/dashboard" },
      {
        label: "Vendas",
        icon: "sales",
        href: "/vendas",
        children: [
          { label: "Funil", href: "/vendas/funil" },
          { label: "Oportunidades", href: "/vendas/oportunidades" },
          { label: "Negociações", href: "/vendas/negociacoes" }
        ]
      },
      { label: "Contatos", icon: "contacts", href: "/contatos" },
      {
        label: "Relatórios",
        icon: "reports",
        href: "/relatorios",
        children: [
          { label: "Vendas", href: "/relatorios/vendas" },
          { label: "Performance", href: "/relatorios/performance" }
        ]
      },
      { label: "Configurações", icon: "settings", href: "/configuracoes" }
    ]
  },
  render: (args) => ({
    components: { DsSidebar },
    setup() {
      return { args };
    },
    template: '<DsSidebar :items="args.items" />'
  })
};

export const Compacto: Story = {
  args: {
    compact: true,
    items: [
      { label: "Dashboard", icon: "dashboard", href: "/dashboard", active: true },
      { label: "Vendas", icon: "sales", href: "/vendas" },
      { label: "Contatos", icon: "contacts", href: "/contatos" },
      { label: "Relatórios", icon: "reports", href: "/relatorios" },
      { label: "Configurações", icon: "settings", href: "/configuracoes" }
    ]
  },
  render: (args) => ({
    components: { DsSidebar },
    setup() {
      return { args };
    },
    template: '<DsSidebar :items="args.items" :compact="args.compact" />'
  })
};

export const ComBadge: Story = {
  args: {
    items: [
      { label: "Dashboard", icon: "dashboard", href: "/dashboard" },
      { label: "Vendas", icon: "sales", href: "/vendas", badge: "12" },
      { label: "Contatos", icon: "contacts", href: "/contatos", badge: "3" },
      { label: "Mensagens", icon: "messages", href: "/mensagens", badge: "!" },
      { label: "Relatórios", icon: "reports", href: "/relatorios" },
      { label: "Configurações", icon: "settings", href: "/configuracoes" }
    ]
  },
  render: (args) => ({
    components: { DsSidebar },
    setup() {
      return { args };
    },
    template: '<DsSidebar :items="args.items" />'
  })
};

export const TemaEscuro: Story = {
  args: {
    theme: "dark",
    items: [
      { label: "Dashboard", icon: "dashboard", href: "/dashboard", active: true },
      { label: "Vendas", icon: "sales", href: "/vendas" },
      { label: "Contatos", icon: "contacts", href: "/contatos" },
      { label: "Relatórios", icon: "reports", href: "/relatorios" },
      { label: "Configurações", icon: "settings", href: "/configuracoes" }
    ]
  },
  render: (args) => ({
    components: { DsSidebar },
    setup() {
      return { args };
    },
    template: '<DsSidebar :items="args.items" :theme="args.theme" />'
  })
};