import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@adsmagic/react";
import { Rocket, Send } from "lucide-react";

const meta: Meta<typeof Button> = {
  title: "Componentes/Inputs/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Criar campanha",
  },
  argTypes: {
    leadingIcon: { control: false },
    trailingIcon: { control: false },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primario: Story = {
  args: {
    variant: "primary",
  },
};

export const Secundario: Story = {
  args: {
    variant: "secondary",
  },
};

export const Fantasma: Story = {
  args: {
    variant: "ghost",
  },
};

export const ComIcones: Story = {
  args: {
    leadingIcon: <Rocket size={16} />,
    trailingIcon: <Send size={16} />,
  },
};
