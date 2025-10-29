import type { Meta, StoryObj } from "@storybook/vue3";
import Sidebar from "./Sidebar.vue";

const meta = {
  title: "Components/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    brandName: { control: "text" },
    brandInitials: { control: "text" },
    footNote: { control: "text" },
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    brandName: "Adsmagic Platform",
    brandInitials: "AG",
    footNote: "Workspace premium com sincronizacao ativa e monitoramento de eventos em tempo real.",
  },
};

export const CustomBrand: Story = {
  args: {
    brandName: "Marketing Hub",
    brandInitials: "MH",
    footNote: "Plano gratuito. Faça upgrade para desbloquear recursos avançados.",
    navGroups: [
      {
        title: "Dashboard",
        items: [
          { label: "Início", active: true },
          { label: "Análises" },
        ],
      },
      {
        title: "Gestão",
        items: [
          { label: "Campanhas" },
          { label: "Clientes" },
          { label: "Relatórios" },
        ],
      },
    ],
  },
};

export const Minimal: Story = {
  args: {
    brandName: "App",
    brandInitials: "A",
    footNote: "",
    navGroups: [
      {
        title: "Menu",
        items: [
          { label: "Home", active: true },
          { label: "Settings" },
        ],
      },
    ],
  },
};
