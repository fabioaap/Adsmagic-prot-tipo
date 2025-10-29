import type { Meta, StoryObj } from "@storybook/vue3";
import Header from "./Header.vue";

const meta = {
  title: "Components/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    workspaceName: { control: "text" },
    workspaceDescription: { control: "text" },
    avatarInitials: { control: "text" },
    statusLabel: { control: "text" },
    campaignsCount: { control: "text" },
    conversionsRate: { control: "text" },
    integrationsCount: { control: "text" },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    workspaceName: "Central de operações Adsmagic",
    workspaceDescription: "Orquestre campanhas, integracoes e automatizacoes em um unico painel.",
    avatarInitials: "AG",
    statusLabel: "Workspace ativo",
    campaignsCount: "128 ativas",
    conversionsRate: "+18% semana",
    integrationsCount: "9 conectadas",
  },
};

export const CustomWorkspace: Story = {
  args: {
    workspaceName: "Dashboard de Marketing",
    workspaceDescription: "Acompanhe métricas e resultados das suas campanhas em tempo real.",
    avatarInitials: "DM",
    statusLabel: "Online",
    campaignsCount: "42 ativas",
    conversionsRate: "+24% mês",
    integrationsCount: "5 conectadas",
  },
};

export const Minimal: Story = {
  args: {
    workspaceName: "Workspace Simples",
    workspaceDescription: "Descrição do workspace",
    avatarInitials: "WS",
    statusLabel: "Ativo",
    campaignsCount: "0",
    conversionsRate: "0%",
    integrationsCount: "0",
  },
};
