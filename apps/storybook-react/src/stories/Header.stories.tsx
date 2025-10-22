import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "@adsmagic/react";

const meta: Meta<typeof Header> = {
  title: "Componentes/Layout/Header",
  component: Header,
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Padrao: Story = {
  render: () => <Header />,
};

