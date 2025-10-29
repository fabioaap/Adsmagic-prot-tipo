import type { Meta, StoryObj } from "@storybook/vue3";
import StatusDropdown from "./StatusDropdown.vue";

const meta = {
  title: "Components/StatusDropdown",
  component: StatusDropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    initialValue: { control: "text", description: "ID da opção inicial" },
  },
} satisfies Meta<typeof StatusDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initialValue: "ready",
  },
};

export const ReviewSelected: Story = {
  args: {
    initialValue: "review",
  },
};

export const BlockedSelected: Story = {
  args: {
    initialValue: "blocked",
  },
};

export const CustomOptions: Story = {
  args: {
    options: [
      { id: "draft", label: "Rascunho", description: "Ainda em elaboração" },
      { id: "pending", label: "Pendente", description: "Aguardando aprovação" },
      { id: "approved", label: "Aprovado", description: "Pronto para publicação" },
      { id: "published", label: "Publicado", description: "Conteúdo no ar" },
    ],
    initialValue: "pending",
  },
};
