import type { Meta, StoryObj } from "@storybook/react";
import { StatusDropdown } from "@adsmagic/react";

const meta: Meta<typeof StatusDropdown> = {
  title: "Componentes/Feedback/Dropdown de status",
  component: StatusDropdown,
};

export default meta;

type Story = StoryObj<typeof StatusDropdown>;

export const Interativo: Story = {
  render: () => <StatusDropdown />,
};
