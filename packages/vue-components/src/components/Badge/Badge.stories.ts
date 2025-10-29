import type { Meta, StoryObj } from "@storybook/vue3";
import Badge from "./Badge.vue";

const meta = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "success", "neutral", "danger"],
      description: "Variante visual do badge",
    },
    label: {
      control: "text",
      description: "Texto exibido no badge",
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    label: "Campanha ativa",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    label: "Conversão +12%",
  },
};

export const Neutral: Story = {
  args: {
    variant: "neutral",
    label: "Em moderação",
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
    label: "Pendência SLA",
  },
};

export const AllVariants: Story = {
  args: {
    variant: "primary",
    label: "Todas as variantes",
  },
  render: () => ({
    components: { Badge },
    template: `
      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        <Badge variant="primary" label="Campanha ativa" />
        <Badge variant="success" label="Conversão +12%" />
        <Badge variant="neutral" label="Em moderação" />
        <Badge variant="danger" label="Pendência SLA" />
      </div>
    `,
  }),
};
