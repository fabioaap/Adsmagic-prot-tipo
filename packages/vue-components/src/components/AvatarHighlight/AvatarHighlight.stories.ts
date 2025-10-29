import type { Meta, StoryObj } from "@storybook/vue3";
import AvatarHighlight from "./AvatarHighlight.vue";

const meta = {
  title: "Components/AvatarHighlight",
  component: AvatarHighlight,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    name: { control: "text", description: "Nome completo da pessoa" },
    role: { control: "text", description: "Cargo ou função" },
    email: { control: "text", description: "Email de contato" },
    badge: { control: "text", description: "Badge de destaque" },
    stats: { control: "text", description: "Estatística relevante" },
    avatarUrl: { control: "text", description: "URL da imagem do avatar" },
  },
} satisfies Meta<typeof AvatarHighlight>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "Dra. Letícia Lopes",
    role: "Marketing Consultant",
    email: "leticia.lopes@adsmagic.com",
    badge: "Parceria Premium",
    stats: "45 campanhas entregues",
    avatarUrl: "https://i.pravatar.cc/150?u=leticia",
  },
};

export const WithoutImage: Story = {
  args: {
    name: "André Gomes",
    role: "Developer",
    email: "andre.gomes@adsmagic.com",
    badge: "Colaborador Destaque",
    stats: "128 commits esta semana",
    avatarUrl: "",
  },
};

export const Minimal: Story = {
  args: {
    name: "Carlos Silva",
    role: "Product Manager",
    avatarUrl: "",
  },
};

export const WithPhoto: Story = {
  args: {
    name: "Mariana Costa",
    role: "UX Designer",
    email: "mariana@adsmagic.com",
    badge: "Top Designer 2025",
    stats: "67 projetos concluídos",
    avatarUrl: "https://i.pravatar.cc/150?u=mariana",
  },
};
